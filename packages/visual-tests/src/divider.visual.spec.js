const { test } = require('./test-fixtures');
test.describe('Divider', () => {
  for (const [variant] of [['standard'], ['vertical']]) {
    test(`${variant}`, async ({ story }) => {
      await story.open(`components-divider--${variant}`);
      await story.screenshot('default.png');
    });
  }
});
