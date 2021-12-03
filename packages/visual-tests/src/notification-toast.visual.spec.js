describe('NotificationToast', () => {
  test.each([
    ['standard'],
    ['alignment'],
    ['warning'],
    ['error'],
    ['success'],
    ['with-text'],
    ['with-link'],
  ])('%p', async (variant) => {
    await global.page.goto(
      `http://host.docker.internal:3123/iframe.html?id=beta-components-notification-toast--${variant}&viewMode=story`
    );
    await page.waitForSelector('html.hydrated');
    const previewHtml = await page.$('body');
    expect(await previewHtml.screenshot()).toMatchImageSnapshot();
  });
});
