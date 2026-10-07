const { test } = require('./test-fixtures');
test.describe('Chip', () => {
  for (const [variant] of [
    ['persistent-standard'],
    ['persistent-standard-selected'],
    ['persistent-standard-disabled'],
    ['persistent-standard-selected-disabled'],
    ['persistent-outline'],
    ['persistent-outline-selected'],
    ['persistent-outline-disabled'],
    ['persistent-outline-selected-disabled'],
    ['dynamic-suggestion'],
    ['dynamic-selection-standard'],
    ['dynamic-selection-outline'],
  ]) {
    test(`${variant}`, async ({ story }) => {
      await story.open(`components-chip--${variant}`);
      await story.screenshot('default.png');
    });
  }
});
