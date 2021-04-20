describe('Icon', () => {
  test.each([
    ['standard'],
    ['with-path-attribute'],
    ['with-name-attribute'],
    ['icon-library'],
  ])('%p', async variant => {
    await global.page.goto(
      `http://host.docker.internal:3123/iframe.html?id=components-icon--${variant}&viewMode=story`
    );
    await page.waitForSelector('html.hydrated');
    const previewHtml = await page.$('body');
    expect(await previewHtml.screenshot()).toMatchImageSnapshot();
  });
});
