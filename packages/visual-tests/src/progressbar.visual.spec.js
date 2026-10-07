const { test } = require('./test-fixtures');
test.describe('ProgressBar', () => {
  for (const [variant] of [
    ['standard'],
    ['description'],
    ['completed'],
    ['error'],
    ['interactive'],
  ]) {
    test(`${variant}`, async ({ story }) => {
      await story.open(`components-progress-bar--${variant}`);
      await story.screenshot('default.png');
    });
  }
});
