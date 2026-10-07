const { test } = require('./test-fixtures');
test.describe.skip('Deprecated Brand Header', () => {
  test('default mega menu states', async ({ page, story }) => {
    await story.open(`deprecated-components-brand-header-navigation--standard`);
    const firstLink = page
      .locator(':is(#root, #storybook-root) > div > scale-app-shell')
      .locator(
        'scale-app-header nav.header__nav > div > div.header__nav-menu-wrapper > div.header__nav-menu-main > ul > scale-nav-main:nth-child(1) > li > a'
      );
    await firstLink.hover();
    await story.screenshot('hover.png');
    await firstLink.focus();
    await story.screenshot('focus.png');
  });
  test('custom mega menu states', async ({ page, story }) => {
    await story.open(
      `deprecated-components-brand-header-navigation--custom-main-navigation`
    );
    const firstLink = page.locator('#nav-main-with-mega-menu > li > a');
    await firstLink.hover();
    await story.screenshot('hover.png');
    await firstLink.focus();
    await story.screenshot('focus.png');
  });
  for (const [variant] of [
    ['standard'],
    ['custom-main-navigation'],
    ['custom-icon-navigation'],
    ['custom-sector-navigation'],
    ['custom-addon-navigation'],
    ['custom-logo'],
  ]) {
    test(`${variant}`, async ({ page, story }) => {
      await story.open(
        `deprecated-components-brand-header-navigation--${variant}`
      );
      await story.screenshot('default.png');
    });
  }
});
