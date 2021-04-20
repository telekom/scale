describe('Slider', () => {
  test.each([
    ['standard'],
    ['slider-track-small'],
    ['slider-thumb-large'],
    ['slider-with-custom-color'],
    ['disabled-slider'],
  ])('%p', async variant => {
    await global.page.goto(
      `http://host.docker.internal:3123/iframe.html?id=components-slider--${variant}&viewMode=story`
    );
    await page.waitForSelector('html.hydrated');
    const previewHtml = await page.$('body');
    expect(await previewHtml.screenshot()).toMatchImageSnapshot();
  });
});
