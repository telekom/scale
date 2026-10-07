const { test } = require('./test-fixtures');
test.describe('Tag', () => {
  for (const [variant] of [
    ['standard'],
    ['dismissable-tag'],
    ['small-tag'],
    ['small-dismissable-tag'],
    ['disabled-dismissable-tag'],
    ['colors'],
    ['color-standard-tag'],
    ['color-strong-tag'],
  ]) {
    test(`${variant}`, async ({ story }) => {
      await story.open(`components-tag--${variant}`);
      await story.screenshot('default.png');
    });
  }
});
