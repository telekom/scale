const fs = require('fs');
const { spawnSync } = require('child_process');

fs.copyFileSync('/tests/package.json', '/dependencies/package.json');
fs.copyFileSync('/source.lock', '/dependencies/yarn.lock');
const install = spawnSync(
  'yarn',
  ['install', '--frozen-lockfile', '--ignore-scripts', '--non-interactive'],
  { cwd: '/dependencies', stdio: 'inherit' }
);
if (install.error) throw install.error;
if (install.status !== 0) process.exit(install.status || 1);

fs.mkdirSync('/work', { recursive: true });
for (const filename of [
  'src',
  'scripts',
  'storybook-static',
  'playwright.config.js',
]) {
  fs.cpSync(`/tests/${filename}`, `/work/${filename}`, { recursive: true });
}
const arguments = process.argv.slice(2);
const policy = arguments.includes('--verify-policy');
const updating = arguments.some(
  (argument) =>
    argument.startsWith('--update-snapshots=') &&
    argument !== '--update-snapshots=none'
);
const result = spawnSync(
  process.execPath,
  policy
    ? ['/work/scripts/check-snapshot-policy.js']
    : [
        '/dependencies/node_modules/@playwright/test/cli.js',
        'test',
        ...arguments,
      ],
  {
    cwd: '/work',
    stdio: 'inherit',
    env: { ...process.env, NODE_PATH: '/dependencies/node_modules' },
  }
);
if (!policy) {
  for (const directory of ['report', 'test-results']) {
    fs.rmSync(`/tests/${directory}`, { recursive: true, force: true });
    if (fs.existsSync(`/work/${directory}`)) {
      fs.cpSync(`/work/${directory}`, `/tests/${directory}`, {
        recursive: true,
      });
    }
  }
}
if (updating) {
  fs.cpSync('/work/src/__image_snapshots__', '/tests/src/__image_snapshots__', {
    recursive: true,
  });
}
if (result.error) throw result.error;
process.exitCode = result.status || (result.signal ? 1 : 0);
