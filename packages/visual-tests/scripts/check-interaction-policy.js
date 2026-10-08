const assert = require('assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');
const Reporter = require('./interaction-reporter');

const temporary = fs.mkdtempSync(
  path.join(os.tmpdir(), 'scale-interaction-policy-')
);
const source = path.join(temporary, 'src');
const output = path.join(temporary, 'results');
const contracts = path.join(temporary, 'contracts');
for (const directory of [source, output, contracts]) fs.mkdirSync(directory);
fs.writeFileSync(path.join(source, 'button.visual.spec.js'), 'visual fixture');
fs.writeFileSync(
  path.join(source, 'button.interaction.spec.js'),
  'interaction fixture'
);
fs.writeFileSync(
  path.join(contracts, 'button.md'),
  'Button interaction contract'
);
const attachment = path.join(temporary, 'state.txt');
fs.writeFileSync(attachment, 'observed browser state');

function testCase(
  project,
  status = 'passed',
  expectedStatus = 'passed',
  file = 'button.interaction.spec.js'
) {
  return {
    title: 'button activates @interaction',
    location: { file: path.join(source, file), line: 1 },
    parent: { project: () => ({ name: project }) },
    expectedStatus,
    outcome: () => (status === 'passed' ? 'expected' : 'unexpected'),
    results: [
      {
        status,
        duration: 1,
        errors: [],
        attachments: [
          { name: 'state', path: attachment, contentType: 'text/plain' },
        ],
      },
    ],
  };
}

function run(tests, projects = ['chromium-light', 'chromium-dark']) {
  const reporter = new Reporter({ contracts, requireFullCoverage: true });
  reporter.onBegin(
    {
      projects: projects.map((name) => ({
        name,
        testDir: source,
        outputDir: output,
      })),
    },
    { allTests: () => tests }
  );
  return reporter.onEnd({ status: 'passed' }).status;
}

try {
  const passing = [testCase('chromium-light'), testCase('chromium-dark')];
  assert.equal(run(passing), 'passed');
  const report = JSON.parse(
    fs.readFileSync(path.join(output, 'components/button/report.json'))
  );
  assert.equal(report.status, 'passed');
  assert.equal(report.tests.length, 2);
  assert.equal(
    fs.readFileSync(
      path.join(
        output,
        'components/button',
        report.tests[0].results[0].attachments[0].path
      ),
      'utf8'
    ),
    'observed browser state'
  );
  assert.equal(
    run([testCase('chromium-light', 'failed'), passing[1]]),
    'failed'
  );
  assert.equal(
    run([testCase('chromium-light', 'skipped', 'skipped'), passing[1]]),
    'failed'
  );
  assert.equal(
    run([testCase('chromium-light', 'failed', 'failed'), passing[1]]),
    'failed'
  );
  assert.equal(run([passing[0]]), 'failed');
  assert.equal(run([passing[0]], ['chromium-light']), 'failed');
  assert.equal(run([passing[1]], ['chromium-dark']), 'failed');
  assert.equal(
    run([
      testCase(
        'chromium-light',
        'passed',
        'passed',
        'unknown.interaction.spec.js'
      ),
      passing[1],
    ]),
    'failed'
  );
  fs.unlinkSync(path.join(contracts, 'button.md'));
  assert.equal(run(passing), 'failed');
  console.log(
    'Interaction evidence policy passed: passing evidence plus eight rejection checks.'
  );
} finally {
  fs.rmSync(temporary, { recursive: true, force: true });
}
