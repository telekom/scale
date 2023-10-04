describe('Slider', () => {
  describe.each(['light', 'dark'])('%p', mode => {
    beforeAll(async () => {
      await global.runColorSetup('components-slider--standard', mode);
    });
    test.each([
      ['standard'],
      ['range'],
      ['step-marks'],
      ['helper-text'],
      ['disabled'],
      ['platform-i-os'],
      ['platform-android'],
    ])('story %p', async variant => {
      await global.runSetup(`components-slider--${variant}`);
      await global.visualCheck();
    });
    test.each([['standard']])('hover %p', async variant => {
      await global.runSetup(`components-slider--${variant}`);

      const slider = await global.page.evaluateHandle(
        `document.querySelector("#root > scale-slider").shadowRoot.querySelector("#slider-0")`
      );

      slider.hover();
      await global.visualCheck();
    });
    test.each([['standard']])('focus %p', async variant => {
      await global.runSetup(`components-slider--${variant}`);

      const slider = await global.page.evaluateHandle(
        `document.querySelector("#root > scale-slider").shadowRoot.querySelector("#slider-0")`
      );

      await slider.focus();
      await global.visualCheck();
    });
  });
});
