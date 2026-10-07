const fs = require('fs');
const os = require('os');
const path = require('path');
const assert = require('assert/strict');
const { createHash } = require('crypto');
const { spawnSync } = require('child_process');

const visual = path.resolve(__dirname, '..');
const temporary = fs.mkdtempSync(
  path.join(os.tmpdir(), 'scale-snapshot-policy-')
);
const baseline = path.join(temporary, 'baseline/default.png');
const canonical = path.join(
  visual,
  'src/__image_snapshots__/chromium-light/button.visual.spec.js/Button-standard/default.png'
);
const hash = (file) =>
  createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const original = hash(canonical);
fs.mkdirSync(path.dirname(baseline), { recursive: true });
fs.copyFileSync(canonical, baseline);
fs.writeFileSync(
  path.join(temporary, 'playwright.config.js'),
  `
const config = require(${JSON.stringify(path.join(visual, 'playwright.config.js'))});
module.exports = {
  ...config,
  testDir: ${JSON.stringify(temporary)},
  testMatch: 'policy.spec.js',
  projects: [config.projects[0]],
  workers: 1,
  snapshotPathTemplate: ${JSON.stringify(path.join(temporary, 'baseline/{arg}{ext}'))},
  outputDir: ${JSON.stringify(path.join(temporary, 'results'))},
  reporter: 'list',
  expect: { ...config.expect, timeout: 2000 },
};
`
);
fs.writeFileSync(
  path.join(temporary, 'policy.spec.js'),
  `
const { test } = require(${JSON.stringify(path.join(visual, 'src/test-fixtures.js'))});
test('snapshot policy', async ({ page, story }) => {
  await story.open('components-button--standard');
  if (process.env.SCALE_POLICY_MUTATION === '1') {
    await page.addStyleTag({ content: 'scale-button { border: 12px solid red !important; }' });
  }
  await story.screenshot('default.png');
});
`
);

function run(mutated) {
  const result = spawnSync(
    process.execPath,
    [
      require.resolve('@playwright/test/cli'),
      'test',
      '--config',
      path.join(temporary, 'playwright.config.js'),
      '--update-snapshots=none',
    ],
    {
      cwd: visual,
      encoding: 'utf8',
      env: { ...process.env, SCALE_POLICY_MUTATION: mutated ? '1' : '0' },
    }
  );
  if (result.error) throw result.error;
  return { status: result.status, output: result.stdout + result.stderr };
}

try {
  const comparison = run(false);
  assert.equal(comparison.status, 0, comparison.output);
  const mismatch = run(true);
  assert.equal(mismatch.status, 1, mismatch.output);
  assert.match(
    mismatch.output,
    /pixels.*different|does not match/,
    mismatch.output
  );
  assert.equal(hash(baseline), original, 'Comparison rewrote its baseline');
  fs.rmSync(baseline);
  const missing = run(false);
  assert.equal(missing.status, 1, missing.output);
  assert.match(missing.output, /snapshot doesn't exist/, missing.output);
  assert.equal(
    fs.existsSync(baseline),
    false,
    'Comparison created a missing baseline'
  );
  assert.equal(
    hash(canonical),
    original,
    'Policy checks changed the canonical baseline'
  );
  console.log(
    'Snapshot policy passed: matching image accepted, style mismatch rejected, missing baseline rejected, no baseline writes.'
  );
} finally {
  fs.rmSync(temporary, { recursive: true, force: true });
}
