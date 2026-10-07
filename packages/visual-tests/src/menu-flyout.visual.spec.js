const { test } = require('./test-fixtures');
test.describe.skip('Menu', () => {
  for (const [variant] of [
    ['standard'],
    ['cascading-menu'],
    ['checked-toggle'],
  ]) {
    test(`${variant}`, async ({ story }) => {
      await story.open(`components-flyout-menu--${variant}`);
      await story.screenshot('default.png');
    });
  }
  for (const [variant] of [['standard'], ['cascading-menu']]) {
    test(`${variant} selected`, async ({ page, story }) => {
      await story.open(`components-flyout-menu--${variant}`);
      const button = page
        .locator(':is(#root, #storybook-root) scale-menu-flyout > scale-button')
        .locator('button');
      await button.click();
      await story.screenshot('selected.png');
    });
  }
  for (const [variant] of [['cascading-menu']]) {
    test(`${variant} states`, async ({ page, story }) => {
      await story.open(`components-flyout-menu--${variant}`);
      const button = page
        .locator(':is(#root, #storybook-root) scale-menu-flyout > scale-button')
        .locator('button');
      const flyoutItemOne = page.locator(
        ':is(#root, #storybook-root) scale-menu-flyout > scale-menu-flyout-list > scale-menu-flyout-item:nth-child(8)'
      );
      const flyoutItemTwo = page.locator(
        ':is(#root, #storybook-root) scale-menu-flyout > scale-menu-flyout-list > scale-menu-flyout-item:nth-child(8) > scale-menu-flyout-list > scale-menu-flyout-item:nth-child(2)'
      );
      const base = page.locator(':is(#root, #storybook-root)');
      await button.click();
      await flyoutItemOne.hover();
      await story.screenshot('hover.png');
      await base.click();
      await button.click();
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await story.screenshot('keyboard.png');
      await flyoutItemOne.click();
      await story.screenshot('selected.png');
      await flyoutItemTwo.focus();
      await story.screenshot('focus.png');
      await flyoutItemTwo.click();
      await story.screenshot('selected-2.png');
    });
  }
});
