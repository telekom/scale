describe('Footer', () => {
  test.each([['standard'], ['minimal'], ['angular']])('%p', async variant => {
    await global.page.goto(
      `http://host.docker.internal:3123/iframe.html?id=components-footer--${variant}&viewMode=story`
    );
    await page.waitForSelector('html.hydrated');
    const previewHtml = await page.$('body');
    expect(await previewHtml.screenshot()).toMatchImageSnapshot();
  });
});
