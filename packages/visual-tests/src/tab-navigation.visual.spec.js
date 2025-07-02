describe('TabNavigation', () => {
  describe.each(['light', 'dark'])('%p', (mode) => {
    beforeAll(async () => {
      await global.runColorSetup('components-tab-navigation--standard', mode);
    });
    test.each([
      ['text-icon'],
      ['text-only'],
      ['disabled-tabs'],
      ['large-text-only'],
      ['large-text-icon'],
    ])('%p', async (variant) => {
      await page.goto(
        `http://host.docker.internal:3123/iframe.html?id=components-tab-navigation--${variant}&viewMode=story`
      );
      await global.page.waitForSelector('#root');

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
    // hover, focus, active
    test.each([['text-icon'], ['text-only']])('%p', async (variant) => {
      await global.runSetup(`components-tab-navigation--${variant}`);
      const tabHeader = await global.page.evaluateHandle(
        'document.querySelector("#scale-tab-header-1").shadowRoot.querySelector(".tab-header")'
      );
      await tabHeader.hover();
      await global.visualCheck();
      await tabHeader.click();
      await global.visualCheck();
      await global.page.mouse.move(20, 40);
      await global.page.mouse.down();
      await global.visualCheck();
    });
  });
});
