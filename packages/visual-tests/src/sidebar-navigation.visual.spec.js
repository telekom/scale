const { test } = require('./test-fixtures');
test.describe.skip('SidebarNavigation', () => {
  for (const [variant] of [
    ['standard'],
    ['active-on-level-1'],
    ['active-on-level-2'],
    ['custom-media-query'],
  ]) {
    test(`${variant}`, async ({ story }) => {
      await story.open(`components-sidebar-navigation--${variant}`);
      await story.screenshot('default.png');
    });
  }
  for (const [variant] of [['standard']]) {
    test(`${variant} selected`, async ({ page, story }) => {
      await story.open(`components-sidebar-navigation--${variant}`);
      const collabsibleButton = page
        .locator(
          ':is(#root, #storybook-root) > div > scale-sidebar-nav > scale-sidebar-nav-collapsible:nth-child(2) > scale-sidebar-nav-collapsible:nth-child(1)'
        )
        .locator('li > div > a');
      const secondItem = page
        .locator(
          ':is(#root, #storybook-root) > div > scale-sidebar-nav > scale-sidebar-nav-collapsible:nth-child(2)'
        )
        .locator('li > div > a');
      await collabsibleButton.click();
      await story.screenshot('selected.png');
      await secondItem.click();
      await story.screenshot('selected-2.png');
    });
  }
  test.describe('SidebarNavItem', () => {
    for (const [variant] of [['standard']]) {
      test(`${variant} states`, async ({ page, story }) => {
        await story.open(`components-sidebar-navigation--${variant}`);
        const sidebarNavItem = page.locator(
          ':is(#root, #storybook-root) > div > scale-sidebar-nav > scale-sidebar-nav-item:nth-child(1) > a'
        );
        const base = page.locator(':is(#root, #storybook-root)');
        await sidebarNavItem.focus();
        await story.screenshot('focus.png');
        await base.click();
        await sidebarNavItem.hover();
        await story.screenshot('hover.png');
        await page.mouse.move(20, 50);
        await page.mouse.down();
        await story.screenshot('active.png');
      });
    }
  });
  test.describe('SidebarNavCollapsible', () => {
    for (const [variant] of [['standard']]) {
      test(`${variant} states`, async ({ page, story }) => {
        await story.open(`components-sidebar-navigation--${variant}`);
        const sidebarNavCollapsible = page
          .locator(
            ':is(#root, #storybook-root) > div > scale-sidebar-nav > scale-sidebar-nav-collapsible:nth-child(2)'
          )
          .locator('li > div > a');
        const base = page.locator(':is(#root, #storybook-root)');
        await sidebarNavCollapsible.focus();
        await story.screenshot('focus.png');
        await base.click();
        await sidebarNavCollapsible.hover();
        await story.screenshot('hover.png');
        await page.mouse.move(20, 100);
        await page.mouse.down();
        await story.screenshot('active.png');
      });
    }
  });
});
