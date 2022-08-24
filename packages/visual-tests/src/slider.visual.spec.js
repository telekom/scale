describe('Slider', () => {
  describe.each(['light', 'dark'])('%p', (mode) => {
    beforeAll(async () => {
      await global.runColorSetup('components-slider--standard', mode);
    });
    test.each([
      ['standard'],
      ['slider-track-small'],
      ['slider-thumb-large'],
      ['slider-with-custom-color'],
      ['disabled-slider'],
    ])('%p', async (variant) => {
      await global.runSetup(`components-slider--${variant}`);
      await global.visualCheck();
    });
    // hover, active, focus
    test.each([['standard']])('%p', async (variant) => {
      await global.runSetup(`components-slider--${variant}`);

      const slider = await page.evaluateHandle(
        `document.querySelector("#root > scale-slider").shadowRoot.querySelector("#slider-0")`
      );
      const sliderTrack = await page.evaluateHandle(
        `document.querySelector("#root > scale-slider").shadowRoot.querySelector("div > div > div.slider__track")`
      );
      slider.hover();
      await global.visualCheck();
      await sliderTrack.click();
      await slider.focus();
      await global.visualCheck();
      await page.mouse.move(80, 60);
      await page.mouse.down();
      await global.visualCheck();
    });
  });
});
