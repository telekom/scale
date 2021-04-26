describe('TabNavigation', () => {
  test.each([
    ['text-icon'],
    ['text-icon-small'],
    ['text-only'],
    ['text-only-small'],
  ])('%p', async (variant) => {
    await global.page.goto(
      `http://host.docker.internal:3123/iframe.html?id=components-tab-navigation--${variant}&viewMode=story`
    );
    await page.waitForSelector('html.hydrated');

    const previewHtml = await page.$('body');

    expect(await previewHtml.screenshot()).toMatchImageSnapshot();
  });
});
