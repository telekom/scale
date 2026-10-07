const { test } = require('./test-fixtures');
test.describe('Breadcrumb', () => {
  for (const [variant] of [['standard']]) {
    test(`${variant} states`, async ({ page, story }) => {
      await story.open(`components-breadcrumb--${variant}`);
      const firstLink = page
        .locator(':is(#root, #storybook-root) > scale-breadcrumb')
        .locator('nav > ol > li:nth-child(1) > a');
      await story.screenshot('default.png');
      await firstLink.hover();
      await story.screenshot('hover.png');
      await page.mouse.move(40, 30);
      await page.mouse.down();
      await story.screenshot('active.png');
    });
  }
});
