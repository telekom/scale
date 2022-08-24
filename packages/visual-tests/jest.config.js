module.exports = {
  preset: 'jest-puppeteer-docker',
  setupFilesAfterEnv: ['./test-environment-setup.js'],
  globalSetup: './setup.js',
  globalTeardown: './teardown.js',
  testMatch: ['**/?(*.)+(visual.spec).[tj]s?(x)'],
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  reporters: [
    'default',
    [
      'jest-html-reporter',
      {
        outputPath: './report/summary.html',
        pageTitle: 'Component test results',
        includeFailureMsg: true,
        customScriptPath: './inject-fail-images.js',
      },
    ],
  ],
};
