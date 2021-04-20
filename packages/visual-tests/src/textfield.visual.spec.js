describe('Textfield', () => {
  test.each([
    ['standard'],
    ['placeholder'],
    ['helper-text'],
    ['with-error'],
    ['disabled'],
    ['small'],
    ['max-length-with-counter'],
  ])('%p', async variant => {
    await global.page.goto(
      `http://host.docker.internal:3123/iframe.html?id=components-text-field--${variant}&viewMode=story`
    );
    await page.waitForSelector('html.hydrated');
    const previewHtml = await page.$('body');
    expect(await previewHtml.screenshot()).toMatchImageSnapshot();
  });
});
