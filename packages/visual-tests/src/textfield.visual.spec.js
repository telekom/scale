describe('Textfield', () => {
  describe.each(['light', 'dark'])('%p', (mode) => {
    beforeAll(async () => {
      await page.goto(
        `http://host.docker.internal:3123/iframe.html?id=components-text-field--standard&viewMode=story`
      );
      await page.evaluate((mode) => {
        localStorage.setItem('persistedColorMode', JSON.stringify(mode));
      }, mode);
    });
    test.each([
      ['standard'],
      ['placeholder'],
      ['helper-text'],
      ['with-error'],
      ['disabled'],
      ['read-only'],
      ['small'],
      ['max-length-with-counter'],
    ])('%p', async (variant) => {
      await page.goto(
        `http://host.docker.internal:3123/iframe.html?id=components-text-field--${variant}&viewMode=story`
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
    // hover, focus, active
    test.each([['standard']])('%p', async (variant) => {
      await page.goto(
        `http://host.docker.internal:3123/iframe.html?id=components-text-field--${variant}&viewMode=story`
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

      const textfield = await page.evaluateHandle(
        'document.querySelector("#input-text-field0")'
      );
      await page.mouse.move(60, 40);
      await page.mouse.down();
      expect(await previewHtml.screenshot()).toMatchImageSnapshot();
      await page.keyboard.press('Tab');
      await textfield.hover();
      expect(await previewHtml.screenshot()).toMatchImageSnapshot();
      await textfield.focus();
      expect(await previewHtml.screenshot()).toMatchImageSnapshot();
    });
  });
});
