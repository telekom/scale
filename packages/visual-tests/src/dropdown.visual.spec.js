describe('Dropdown', () => {
  test.each([
    ['standard'],
    ['small'],
    ['disabled'],
    ['error'],
    ['with-custom-icon'],
  ])('%p', async (variant) => {
    await global.page.goto(
      `http://host.docker.internal:3123/iframe.html?id=components-dropdown--${variant}&viewMode=story`
    );
    await page.waitForSelector('html.hydrated');
    const previewHtml = await page.$('body');
    await page.waitFor(1000);
    expect(await previewHtml.screenshot()).toMatchImageSnapshot();
  });
});
