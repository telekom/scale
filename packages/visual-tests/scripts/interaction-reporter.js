const fs = require('fs');
const path = require('path');
const { createHash } = require('crypto');

const exclusions = {
  callout:
    'Presentation-only; existing visual cases remain skipped coverage debt.',
  divider: 'Presentation-only; no input handlers or activation contract.',
  icon: 'Presentation-only; focusability does not define activation.',
  list: 'Semantic list structure; nested controls own their interactions.',
  progressbar:
    'Progress display; story controls and timers are application-owned.',
  table:
    'Table presentation; story sorting is application-owned. DataGrid is covered separately.',
  'toggle-group':
    'Deprecated; existing visual cases remain skipped. SegmentedButton is covered separately.',
};

class InteractionReporter {
  constructor(options) {
    this.options = options;
    this.errors = [];
  }

  onBegin(config, suite) {
    this.config = config;
    this.suite = suite;
  }

  onError(error) {
    this.errors.push(error.message || String(error));
  }

  onEnd(result) {
    const source = this.config.projects[0].testDir;
    const output = this.config.projects[0].outputDir;
    const components = fs
      .readdirSync(source)
      .filter((file) => file.endsWith('.visual.spec.js'))
      .map((file) => file.replace('.visual.spec.js', ''))
      .sort();
    const reports = [];
    const issues = [...this.errors];
    for (const component of components) {
      const directory = path.join(output, 'components', component);
      fs.mkdirSync(directory, { recursive: true });
      const contract = path.join(this.options.contracts, `${component}.md`);
      if (fs.existsSync(contract))
        fs.copyFileSync(contract, path.join(directory, 'contract.md'));
      else issues.push(`${component}: missing component contract`);

      const tests = this.suite
        .allTests()
        .filter(
          (test) =>
            path.basename(test.location.file) ===
            `${component}.interaction.spec.js`
        );
      const evidence = tests.map((test, index) => ({
        title: test.title,
        project: test.parent.project().name,
        outcome: test.outcome(),
        expectedStatus: test.expectedStatus,
        location: {
          file: path.basename(test.location.file),
          line: test.location.line,
        },
        results: test.results.map((run, attempt) => ({
          status: run.status,
          duration: run.duration,
          errors: run.errors.map((error) => error.message),
          attachments: run.attachments.map((attachment, attachmentIndex) => {
            const record = {
              name: attachment.name,
              contentType: attachment.contentType,
            };
            if (attachment.path && fs.existsSync(attachment.path)) {
              const filename = `${index}-${attempt}-${attachmentIndex}-${path.basename(attachment.path)}`;
              fs.copyFileSync(attachment.path, path.join(directory, filename));
              record.path = filename;
            } else if (attachment.body) {
              const filename = `${index}-${attempt}-${attachmentIndex}.txt`;
              fs.writeFileSync(path.join(directory, filename), attachment.body);
              record.path = filename;
            }
            return record;
          }),
        })),
      }));
      const passed =
        tests.length > 0 &&
        tests.every(
          (test) =>
            test.expectedStatus === 'passed' &&
            test.results.length > 0 &&
            test.results.every((run) => run.status === 'passed')
        );
      if (tests.length > 0 && exclusions[component])
        issues.push(
          `${component}: remove the exclusion before adding interaction tests`
        );
      const status = exclusions[component]
        ? 'not-applicable'
        : tests.length === 0
          ? 'not-run'
          : passed
            ? 'passed'
            : 'failed';
      if (tests.length > 0 && !passed)
        issues.push(
          `${component}: interaction tests did not all pass without skips`
        );
      if (this.options.requireFullCoverage && !exclusions[component]) {
        for (const project of this.config.projects) {
          if (!evidence.some((test) => test.project === project.name))
            issues.push(`${component}: missing ${project.name} execution`);
        }
      }
      const testFile = path.join(source, `${component}.interaction.spec.js`);
      const report = {
        component,
        status,
        reason: exclusions[component] || null,
        visualSuite: `${component}.visual.spec.js`,
        sourceHash: fs.existsSync(testFile)
          ? createHash('sha256').update(fs.readFileSync(testFile)).digest('hex')
          : null,
        tests: evidence,
      };
      fs.writeFileSync(
        path.join(directory, 'report.json'),
        `${JSON.stringify(report, null, 2)}\n`
      );
      reports.push({
        component,
        status,
        executions: tests.length,
        report: `components/${component}/report.json`,
      });
    }
    const unknown = this.suite
      .allTests()
      .filter(
        (test) =>
          !components.includes(
            path
              .basename(test.location.file)
              .replace('.interaction.spec.js', '')
          )
      );
    if (unknown.length)
      issues.push(
        'Interaction tests have no matching component inventory entry'
      );
    const summary = {
      status: issues.length ? 'failed' : result.status,
      components: reports,
      errors: issues,
    };
    fs.writeFileSync(
      path.join(output, 'components.json'),
      `${JSON.stringify(summary, null, 2)}\n`
    );
    for (const issue of issues) console.error(issue);
    return { status: summary.status };
  }
}

module.exports = InteractionReporter;
