const { defineConfig } = require('@playwright/test');
const visual = require('./playwright.config');

module.exports = defineConfig(visual, {
  testMatch: '**/*.interaction.spec.js',
  grep: /@interaction/,
  outputDir: './interaction-results',
  reporter: [
    ['list'],
    ['html', { outputFolder: 'interaction-report', open: 'never' }],
    ['junit', { outputFile: 'interaction-results/results.xml' }],
    ['json', { outputFile: 'interaction-results/results.json' }],
    [
      './scripts/interaction-reporter.js',
      {
        requireFullCoverage: Boolean(process.env.CI),
      },
    ],
  ],
  use: { ...visual.use, trace: 'on', screenshot: 'on' },
});
