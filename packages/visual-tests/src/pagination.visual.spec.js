describe('Pagination', () => {
  test.each([
    ['standard'],
    ['small'],
    ['hidden-borders'],
    ['embedded-hidden-borders'],
  ])('%p', async (variant) => {
    await global.page.goto(
      `http://host.docker.internal:3123/iframe.html?id=beta-components-pagination--${variant}&viewMode=story`
    );
    await page.waitForSelector('html.hydrated');
    const previewHtml = await page.$('body');
    expect(await previewHtml.screenshot()).toMatchImageSnapshot();
  });
});
