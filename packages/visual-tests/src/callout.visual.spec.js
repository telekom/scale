const { test } = require('./test-fixtures');
test.describe.skip('Callout', () => {
  for (const [variant] of [
    ['standard'],
    ['primary'],
    ['black'],
    ['white'],
    ['blue'],
    ['medium'],
    ['large-and-small'],
  ]) {
    test(`${variant}`, async ({ story }) => {
      await story.open(`components-callout--${variant}`);
      await story.screenshot('default.png');
    });
  }
});
