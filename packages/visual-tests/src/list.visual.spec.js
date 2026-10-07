const { test } = require('./test-fixtures');
test.describe('List', () => {
  for (const [variant] of [
    ['ordered'],
    ['unordered'],
    ['unordered-with-custom-icon'],
  ]) {
    test(`${variant}`, async ({ story }) => {
      await story.open(`components-list--${variant}`);
      await story.screenshot('default.png');
    });
  }
});
