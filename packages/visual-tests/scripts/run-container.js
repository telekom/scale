const fs = require('fs');
const path = require('path');
const { createHash } = require('crypto');
const { spawnSync } = require('child_process');

const visual = path.resolve(__dirname, '..');
const repository = path.resolve(visual, '../..');
const image =
  'mcr.microsoft.com/playwright:v1.63.0-noble@sha256:eff16c30e6f3f4af0a03fa4b706120d5e9b0891c344a27d64559aff5900a4a27';
const manifest = fs.readFileSync(path.join(visual, 'package.json'));
const lock = path.join(repository, 'yarn.lock');
const cache = createHash('sha256')
  .update(manifest)
  .update(fs.readFileSync(lock))
  .update(image)
  .digest('hex')
  .slice(0, 16);

if (!fs.existsSync(path.join(visual, 'storybook-static/iframe.html'))) {
  throw new Error(
    'Run yarn workspace @telekom/scale-visual-tests test:prepare first.'
  );
}

const result = spawnSync(
  'docker',
  [
    'run',
    '--rm',
    '--init',
    '--ipc=host',
    '--platform=linux/amd64',
    '--mount',
    `type=bind,source=${visual},target=/tests`,
    '--mount',
    `type=bind,source=${lock},target=/source.lock,readonly`,
    '--mount',
    `type=volume,source=scale-visual-${cache},target=/dependencies`,
    image,
    'node',
    '/tests/scripts/container-entry.js',
    ...process.argv.slice(2),
  ],
  {
    cwd: repository,
    stdio: 'inherit',
    env: { ...process.env, MSYS_NO_PATHCONV: '1' },
  }
);
if (result.error) throw result.error;
process.exitCode = result.status || (result.signal ? 1 : 0);
