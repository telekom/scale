describe('ToggleGroup', () => {
  test.each([
    ['standard'],
    ['monochrome-color-scheme'],
    ['grey-background'],
    ['no-border'],
    ['small-size'],
    ['full-width'],
    ['single-select'],
    ['disabled'],
    ['icon-before'],
    ['icon-only'],
  ])('%p', async (variant) => {
    await global.page.goto(
      `http://host.docker.internal:3123/iframe.html?id=beta-components-toggle-group--${variant}&viewMode=story`
    );
    await page.waitForSelector('html.hydrated');
    const previewHtml = await page.$('body');

    await page.waitFor(500);

    expect(await previewHtml.screenshot()).toMatchImageSnapshot();
  });
  // hover, active, focus
  test.each([['standard'], ['monochrome-color-scheme']])(
    '%p',
    async (variant) => {
      await global.page.goto(
        `http://host.docker.internal:3123/iframe.html?id=beta-components-toggle-group--${variant}&viewMode=story`
      );

      await page.waitForSelector('html.hydrated');
      const previewHtml = await page.$('body');

      await page.evaluate(() => {
        const transitions = [
          '--scl-motion-duration-immediate',
          '--scl-motion-duration-fast',
          '--scl-motion-duration-slower',
          '--scl-motion-duration-deliberate',
        ];

        transitions.forEach((transitionSpeed) => {
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
    }
  );
});
