describe('DropdownSelect', () => {
  describe.each(['light', 'dark'])('%p', (mode) => {
    beforeAll(async () => {
      await page.goto(
        `http://host.docker.internal:3123/iframe.html?id=beta-components-dropdown-select--standard&viewMode=story`
      );
      await page.evaluate((mode) => {
        localStorage.setItem('persistedColorMode', JSON.stringify(mode));
      }, mode);
    });
    // screenshots of stories
    test.each([['standard'], ['small'], ['disabled'], ['error']])(
      '%p',
      async (variant) => {
        await page.goto(
          `http://host.docker.internal:3123/iframe.html?id=beta-components-dropdown-select--${variant}&viewMode=story`
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
        const select = await page.evaluateHandle(
          `document.querySelector("#root > div > scale-dropdown-select").shadowRoot.querySelector("#combobox")`
        );
        expect(await previewHtml.screenshot()).toMatchImageSnapshot();
        await select.click();
        expect(await previewHtml.screenshot()).toMatchImageSnapshot();
      }
    );
    // hover, active, focus
    test.each([['standard']])('%p', async (variant) => {
      await page.goto(
        `http://host.docker.internal:3123/iframe.html?id=beta-components-dropdown-select--${variant}&viewMode=story`
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
      const select = await page.evaluateHandle(
        `document.querySelector("#root > div > scale-dropdown-select").shadowRoot.querySelector("#combobox")`
      );
      await page.waitFor(300);
      await select.hover();
      expect(await previewHtml.screenshot()).toMatchImageSnapshot();
      await select.focus();
      expect(await previewHtml.screenshot()).toMatchImageSnapshot();
    });
  });
});
