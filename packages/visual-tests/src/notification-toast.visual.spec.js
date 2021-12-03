describe('NotificationToast', () => {
  test.each([
    ['standard'],
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
    await page.waitFor(3000);
    expect(await previewHtml.screenshot()).toMatchImageSnapshot();
  });
});
