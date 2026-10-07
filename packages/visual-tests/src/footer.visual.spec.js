const { test } = require('./test-fixtures');
test.describe('Footer', () => {
  for (const [variant] of [['standard'], ['minimal']]) {
    test(`${variant}`, async ({ story }) => {
      await story.open(`deprecated-components-footer--${variant}`);
      await story.screenshot('default.png');
    });
  }
});
