describe('ToggleGroup', () => {
  describe.each(['light', 'dark'])('%p', (mode) => {
    beforeAll(async () => {
      await page.goto(
        `http://host.docker.internal:3123/iframe.html?id=components-toggle-group--standard&viewMode=story`
      );
      await page.evaluate((mode) => {
        localStorage.setItem('persistedColorMode', JSON.stringify(mode));
      }, mode);
    });
    test.each([
      ['standard'],
      ['monochrome-variant'],
      ['grey-background'],
      ['no-border'],
      ['small-size'],
      ['full-width'],
      ['single-select'],
      ['disabled'],
      ['icon-before'],
      ['icon-only'],
    ])('%p', async (variant) => {
      await page.goto(
        `http://host.docker.internal:3123/iframe.html?id=beta-components-toggle-group--${variant}&viewMode=story`
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
      await page.waitFor(500);

      expect(await previewHtml.screenshot()).toMatchImageSnapshot();
    });
    // hover, active, focus
    test.each([['standard'], ['monochrome-variant']])('%p', async (variant) => {
      await page.goto(
        `http://host.docker.internal:3123/iframe.html?id=beta-components-toggle-group--${variant}&viewMode=story`
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

      const buttonOne = await page.evaluateHandle(
        `document.querySelector("#root scale-toggle-group > scale-toggle-button[radius='left']").shadowRoot.querySelector("button")`
      );
      const buttonThree = await page.evaluateHandle(
        `document.querySelector("#root scale-toggle-group > scale-toggle-button[radius='right']").shadowRoot.querySelector("button")`
      );
      buttonThree.hover();
      expect(await previewHtml.screenshot()).toMatchImageSnapshot();
      buttonOne.hover();
      expect(await previewHtml.screenshot()).toMatchImageSnapshot();
      buttonOne.focus();
      expect(await previewHtml.screenshot()).toMatchImageSnapshot();
      await page.mouse.move(30, 30);
      await page.mouse.down();
      expect(await previewHtml.screenshot()).toMatchImageSnapshot();
      await page.mouse.up();
      await page.mouse.down();
      expect(await previewHtml.screenshot()).toMatchImageSnapshot();
    });
  });
});
