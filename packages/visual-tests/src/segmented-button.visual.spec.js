const { test } = require('./test-fixtures');
test.describe.skip('SegmentedButton', () => {
  for (const [variant] of [
    ['standard'],
    ['multi-select'],
    ['disabled-segment'],
    ['disabled-button'],
    ['icon-only'],
    ['icon-and-text'],
    ['invalid'],
  ]) {
    test(`${variant}`, async ({ story }) => {
      await story.open(`components-segmented-button--${variant}`);
      await story.screenshot('default.png');
    });
  }
});
