describe('NotificationMessage', () => {
  test.each([
    ['standard'],
    ['warning'],
    ['error'],
    ['success'],
    ['informational'],
    ['dismissible'],
    ['timeout'],
    ['with-text'],
  ])('%p', async (variant) => {
    await global.page.goto(
      `http://host.docker.internal:3123/iframe.html?id=beta-components-notification-message--${variant}&viewMode=story`
    );
    await page.waitForSelector('html.hydrated');
    const previewHtml = await page.$('body');
    expect(await previewHtml.screenshot()).toMatchImageSnapshot();
  });
});
