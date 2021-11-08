describe('NotificationBadge', () => {
  test.each([
    ['brand-header-user-menu-icon-navigation'],
    ['brand-header-custom-icon-navigation'],
    ['label-text'],
    ['label-icon'],
    ['text'],
    ['icon'],
    ['standard'],
  ])('%p', async (variant) => {
    await global.page.goto(
      `http://host.docker.internal:3123/iframe.html?id=beta-components-notification-badge--${variant}&viewMode=story`
    );
    await page.waitForSelector('html.hydrated');
    const previewHtml = await page.$('body');
    expect(await previewHtml.screenshot()).toMatchImageSnapshot();
  });
});
