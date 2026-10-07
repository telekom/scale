const { test } = require('./test-fixtures');
test.describe('Pagination', () => {
  for (const [variant] of [['standard'], ['hidden-borders']]) {
    test(`${variant}`, async ({ page, story }) => {
      await story.open(`components-pagination--${variant}`);
      await story.screenshot('default.png');
    });
  }
  test('buttons disabled', async ({ page, story }) => {
    await story.open(`components-pagination--standard`);
    const firstButton = page
      .locator(':is(#root, #storybook-root) > scale-pagination')
      .locator('div > button.pagination__first-prompt');
    const lastButton = page
      .locator(':is(#root, #storybook-root) > scale-pagination')
      .locator('div > button.pagination__last-prompt');
    await firstButton.click();
    await story.screenshot('selected.png');
    await lastButton.click();
    await story.screenshot('selected-2.png');
  });
  for (const [variant] of [['hidden-borders']]) {
    test(`${variant} states`, async ({ page, story }) => {
      await story.open(`components-pagination--${variant}`);
      const firstButton = page
        .locator(':is(#root, #storybook-root) scale-pagination')
        .locator('div > button.pagination__first-prompt');
      const base = page.locator(':is(#root, #storybook-root)');
      await firstButton.hover();
      await story.screenshot('hover.png');
      await base.hover();
      await firstButton.focus();
      await story.screenshot('focus.png');
      await page.mouse.move(20, 30);
      await page.mouse.down();
      await story.screenshot('active.png');
    });
  }
});
