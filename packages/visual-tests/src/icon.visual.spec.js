const { test } = require('./test-fixtures');
test.describe('Icon', () => {
  for (const [variant] of [
    ['standard'],
    ['with-path-attribute'],
    ['with-name-attribute'],
    ['icon-library'],
  ]) {
    test(`${variant}`, async ({ story }) => {
      await story.open(`components-icon--${variant}`);
      await story.screenshot('default.png');
    });
  }
});
