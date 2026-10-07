const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const repository = path.resolve(__dirname, '../../..');
const visual = path.resolve(__dirname, '..');

function run(workspace, script, environment = {}) {
  const result = spawnSync('yarn', ['workspace', workspace, script], {
    cwd: repository,
    stdio: 'inherit',
    shell: process.platform === 'win32',
    env: { ...process.env, ...environment },
  });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status || 1);
}

if (!process.argv.includes('--copy')) {
  run('@telekom/scale-components', 'generate');
  run('@telekom/scale-components', 'build');
  run('@telekom/scale-storybook-vue', 'build', {
    NODE_OPTIONS:
      `${process.env.NODE_OPTIONS || ''} --openssl-legacy-provider`.trim(),
  });
}

const source = path.join(repository, 'packages/storybook-vue/storybook-static');
if (!fs.existsSync(path.join(source, 'iframe.html'))) {
  throw new Error('Build Storybook before copying it for browser tests.');
}
const destination = path.join(visual, 'storybook-static');
fs.rmSync(destination, { recursive: true, force: true });
fs.cpSync(source, destination, { recursive: true });
