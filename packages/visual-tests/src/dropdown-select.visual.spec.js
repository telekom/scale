const { test } = require('./test-fixtures');
test.describe.skip('DropdownSelect', () => {
  for (const [variant] of [['standard'], ['disabled'], ['error']]) {
    test(`${variant} open`, async ({ page, story }) => {
      await story.open(`components-dropdown-select--${variant}`);
      const select = page
        .locator(':is(#root, #storybook-root) > div > scale-dropdown-select')
        .locator('#combobox');
      await story.screenshot('default.png');
      await select.click();
      await story.screenshot('selected.png');
    });
  }
  for (const [variant] of [['standard']]) {
    test(`${variant} states`, async ({ page, story }) => {
      await story.open(`components-dropdown-select--${variant}`);
      const select = page
        .locator(':is(#root, #storybook-root) > div > scale-dropdown-select')
        .locator('#combobox');
      await select.hover();
      await story.screenshot('hover.png');
      await select.focus();
      await story.screenshot('focus.png');
    });
  }
});
