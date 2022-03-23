describe('Button', () => {
  describe.each(['light', 'dark'])('%p', (mode) => {
    beforeAll(async () => {
      await page.goto(
        `http://host.docker.internal:3123/iframe.html?id=components-accordion--standard&viewMode=story`
      );
      await page.evaluate((mode) => {
        localStorage.setItem('persistedColorMode', JSON.stringify(mode));
      }, mode);
    });
    test.each([
      ['standard'],
      ['secondary'],
      ['secondary-disabled'],
      ['disabled'],
      ['with-icon-before'],
      ['with-icon-after'],
      ['icon-only'],
      ['link'],
      ['small-standard'],
      ['small-secondary'],
      ['small-secondary-disabled'],
      ['small-disabled'],
      ['small-with-icon-before'],
      ['small-with-icon-after'],
      ['small-icon-only'],
      ['small-link'],
    ])('%p', async (variant) => {
      await page.goto(
        `http://host.docker.internal:3123/iframe.html?id=components-button--${variant}&viewMode=story`
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
      const button = await page.evaluateHandle(
        `document.querySelector("#root scale-button").shadowRoot.querySelector(".button")`
      );
      expect(await previewHtml.screenshot()).toMatchImageSnapshot();
    });
  });
  // hover, active, focus
  describe('Button', () => {
    test.each([
      ['standard'],
      ['secondary'],
      ['with-icon-before'],
      ['icon-only'],
    ])('%p', async (variant) => {
      await page.goto(
        `http://host.docker.internal:3123/iframe.html?id=components-button--${variant}&viewMode=story`
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
      const button = await page.evaluateHandle(
        `document.querySelector("#root scale-button").shadowRoot.querySelector(".button")`
      );
      await button.hover();
      expect(await previewHtml.screenshot()).toMatchImageSnapshot();
      await page.mouse.move(20, 20);
      await page.mouse.down();
      expect(await previewHtml.screenshot()).toMatchImageSnapshot();
      await page.mouse.up();
      await page.mouse.move(0, 0);
      await button.focus();
      expect(await previewHtml.screenshot()).toMatchImageSnapshot();
    });
  });
});
