describe('Slider', () => {
  test.each([
    ['standard'],
    ['slider-track-small'],
    ['slider-thumb-large'],
    ['slider-with-custom-color'],
    ['disabled-slider'],
  ])('%p', async (variant) => {
    await global.page.goto(
      `http://host.docker.internal:3123/iframe.html?id=components-slider--${variant}&viewMode=story`
    );
    await page.waitForSelector('html.hydrated');
    const previewHtml = await page.$('body');
    expect(await previewHtml.screenshot()).toMatchImageSnapshot();
  });
  // hover, active, focus
  test.each([['standard']])('%p', async (variant) => {
    await global.page.goto(
      `http://host.docker.internal:3123/iframe.html?id=components-slider--${variant}&viewMode=story`
    );

    await page.waitForSelector('html.hydrated');
    const previewHtml = await page.$('body');

    const slider = await page.evaluateHandle(
      `document.querySelector("#root > scale-slider").shadowRoot.querySelector("#slider-0")`
    );
    const sliderTrack = await page.evaluateHandle(
      `document.querySelector("#root > scale-slider").shadowRoot.querySelector("div > div > div.slider__track")`
    );
    slider.hover();
    expect(await previewHtml.screenshot()).toMatchImageSnapshot();
    await sliderTrack.click();
    await slider.focus();
    expect(await previewHtml.screenshot()).toMatchImageSnapshot();
    await page.mouse.move(80, 60);
    await page.mouse.down();
    expect(await previewHtml.screenshot()).toMatchImageSnapshot();
  });
});
