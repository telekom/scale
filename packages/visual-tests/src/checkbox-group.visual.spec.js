describe('CheckboxGroup', () => {
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
      ['checkbox-disabled'],
      ['group-error'],
      ['helper-text'],
    ])('%p', async (variant) => {
      await page.goto(
        `http://host.docker.internal:3123/iframe.html?id=components-checkbox-group--${variant}&viewMode=story`
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
    test.each([['standard']])('%p', async (variant) => {
      await page.goto(
        `http://host.docker.internal:3123/iframe.html?id=components-checkbox-group--${variant}&viewMode=story`
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

      const firstCheckbox = await page.evaluateHandle(
        `document.querySelector("#root > scale-checkbox-group > scale-checkbox:nth-child(1) > input[type=checkbox]")`
      );
      const secondCheckbox = await page.evaluateHandle(
        `document.querySelector("#root > scale-checkbox-group > scale-checkbox:nth-child(2) > input[type=checkbox]")`
      );
      const label = await page.evaluateHandle(
        `document.querySelector("#root > scale-checkbox-group > scale-checkbox:nth-child(1) > label")`
      );

      await label.hover();
      expect(await previewHtml.screenshot()).toMatchImageSnapshot();
      await firstCheckbox.focus();
      expect(await previewHtml.screenshot()).toMatchImageSnapshot();
      await page.mouse.move(20, 40);
      await page.mouse.down();
      expect(await previewHtml.screenshot()).toMatchImageSnapshot();
    });
  });
});
