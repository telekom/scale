describe('RadioButtonGroup', () => {
  describe.each(['light', 'dark'])('%p', (mode) => {
    beforeAll(async () => {
      await page.goto(
        `http://host.docker.internal:3123/iframe.html?id=components-radio-button-group--standard&viewMode=story`
      );
      await page.evaluate((mode) => {
        localStorage.setItem('persistedColorMode', JSON.stringify(mode));
      }, mode);
    });
    test.each([['standard'], ['error'], ['helper-text']])(
      '%p',
      async (variant) => {
        await page.goto(
          `http://host.docker.internal:3123/iframe.html?id=components-radio-button-group--${variant}&viewMode=story`
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
      }
    );
    // focus, hover, active, click
    test.each([['standard']])('%p', async (variant) => {
      await page.goto(
        `http://host.docker.internal:3123/iframe.html?id=components-radio-button-group--${variant}&viewMode=story`
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
      const firstRadioButton = await page.evaluateHandle(
        `document.querySelector("#root > div > scale-radio-button-group > scale-radio-button:nth-child(1) input[type=radio]")`
      );
      const label = await page.evaluateHandle(
        `document.querySelector("#root scale-radio-button-group > scale-radio-button:nth-child(1) > div > label")`
      );
      const base = await page.evaluateHandle(`document.querySelector("#root")`);

      await firstRadioButton.focus();
      expect(await previewHtml.screenshot()).toMatchImageSnapshot();
      await base.click();
      await label.hover();
      expect(await previewHtml.screenshot()).toMatchImageSnapshot();
      await base.click();
      await page.mouse.move(40, 70);
      await page.mouse.down();
      expect(await previewHtml.screenshot()).toMatchImageSnapshot();
      await firstRadioButton.click();
      expect(await previewHtml.screenshot()).toMatchImageSnapshot();
    });
  });
});
