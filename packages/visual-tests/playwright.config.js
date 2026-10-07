const path = require('path');
const { defineConfig } = require('@playwright/test');

const port = Number(process.env.SCALE_VISUAL_PORT || 4173);
const baseURL = `http://127.0.0.1:${port}`;

module.exports = defineConfig({
  testDir: './src',
  testMatch: ['**/*.visual.spec.js', '**/*.interaction.spec.js'],
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  workers: process.env.CI ? 1 : 2,
  retries: 0,
  timeout: 30000,
  updateSnapshots: 'none',
  expect: {
    timeout: 10000,
    toHaveScreenshot: {
      animations: 'disabled',
      caret: 'hide',
      scale: 'css',
      threshold: 0,
      maxDiffPixels: 0,
    },
  },
  snapshotPathTemplate: path.join(
    __dirname,
    'src/__image_snapshots__/{projectName}/{testFileName}/{testName}/{arg}{ext}'
  ),
  outputDir: './test-results',
  reporter: [
    ['list'],
    ['html', { outputFolder: 'report', open: 'never' }],
    ['junit', { outputFile: 'test-results/results.xml' }],
    ['json', { outputFile: 'test-results/results.json' }],
  ],
  use: {
    baseURL,
    browserName: 'chromium',
    launchOptions: {
      args: ['--disable-gpu', '--font-render-hinting=none'],
    },
    viewport: { width: 1040, height: 768 },
    deviceScaleFactor: 1,
    locale: 'en-US',
    timezoneId: 'UTC',
    reducedMotion: 'reduce',
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'chromium-light', use: { colorScheme: 'light' } },
    { name: 'chromium-dark', use: { colorScheme: 'dark' } },
  ],
  webServer: {
    command: `node "${require.resolve('http-server/bin/http-server')}" "${path.join(__dirname, 'storybook-static')}" -a 127.0.0.1 -p ${port} -c-1 --silent`,
    url: `${baseURL}/iframe.html`,
    reuseExistingServer: false,
    timeout: 15000,
  },
});
