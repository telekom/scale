describe('Dropdown', () => {
  describe.each(['light', 'dark'])('%p', mode => {
    beforeAll(async () => {
      await global.runColorSetup(
        'deprecated-components-dropdown--standard',
        mode
      );
    });
    // screenshots of stories
    test.each([
      ['standard'],
      ['disabled'],
      ['error'],
      ['success'],
      ['warning'],
      ['with-custom-icon'],
    ])('%p', async variant => {
      await page.goto(
        `http://host.docker.internal:3123/iframe.html?id=deprecated-components-dropdown--${variant}&viewMode=story`
      );
      await page.waitForSelector('html.hydrated');
      const previewHtml = await page.$('body');
      await page.evaluate(() => {
        [
          '--telekom-motion-duration-immediate',
          '--telekom-motion-duration-transition',
          '--telekom-motion-duration-animation',
          '--telekom-motion-duration-animation-deliberate',
        ].forEach(transitionSpeed => {
          document.body.style.setProperty(transitionSpeed, '0s');
        });
      });
      await page.waitFor(1000);
      expect(await previewHtml.screenshot()).toMatchImageSnapshot();
    });
    // hover, active, focus
    test.each([['standard']])('%p', async variant => {
      await global.runSetup(`deprecated-components-dropdown--${variant}`);

      const dropdown = await global.page.evaluateHandle(
        `document.querySelector("#root > scale-dropdown .input__dropdown")`
      );
      await global.page.waitFor(300);
      await dropdown.hover();
      await global.visualCheck();
      await dropdown.focus();
      await global.visualCheck();
      await global.page.mouse.move(60, 60);
      await global.page.mouse.down();
      await global.visualCheck();
    });
  });
});
