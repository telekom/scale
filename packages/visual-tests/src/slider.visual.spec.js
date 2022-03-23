describe('Slider', () => {
  describe.each(['light', 'dark'])('%p', (mode) => {
    beforeAll(async () => {
      await page.goto(
        `http://host.docker.internal:3123/iframe.html?id=components-slider--standard&viewMode=story`
      );
      await page.evaluate((mode) => {
        localStorage.setItem('persistedColorMode', JSON.stringify(mode));
      }, mode);
    });
    test.each([
      ['standard'],
      ['slider-track-small'],
      ['slider-thumb-large'],
      ['slider-with-custom-color'],
      ['disabled-slider'],
    ])('%p', async (variant) => {
      await page.goto(
        `http://host.docker.internal:3123/iframe.html?id=components-slider--${variant}&viewMode=story`
      );
      await page.waitForSelector('html.hydrated');
      const previewHtml = await page.$('body');
      await page.evaluate(() => {
        [
          '--telekom-motion-duration-immediate',
          '--telekom-motion-duration-transition',
          '--telekom-motion-duration-animation',
          '--telekom-motion-duration-animation-deliberate',
        ].forEach((transitionSpeed) => {
          document.body.style.setProperty(transitionSpeed, '0s');
        });
      });
      expect(await previewHtml.screenshot()).toMatchImageSnapshot();
    });
    // hover, active, focus
    test.each([['standard']])('%p', async (variant) => {
      await page.goto(
        `http://host.docker.internal:3123/iframe.html?id=components-slider--${variant}&viewMode=story`
      );

      await page.waitForSelector('html.hydrated');
      const previewHtml = await page.$('body');
      await page.evaluate(() => {
        [
          '--telekom-motion-duration-immediate',
          '--telekom-motion-duration-transition',
          '--telekom-motion-duration-animation',
          '--telekom-motion-duration-animation-deliberate',
        ].forEach((transitionSpeed) => {
          document.body.style.setProperty(transitionSpeed, '0s');
        });
      });

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
});
