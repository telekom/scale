describe('Textfield', () => {
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
    await global.page.goto(
      `http://host.docker.internal:3123/iframe.html?id=components-text-field--${variant}&viewMode=story`
    );
    await page.waitForSelector('html.hydrated');
    const previewHtml = await page.$('body');
    expect(await previewHtml.screenshot()).toMatchImageSnapshot();
  });
    // hover, focus, active
    test.each([
      ['standard'],
    ])('%p', async (variant) => {
      await global.page.goto(
        `http://host.docker.internal:3123/iframe.html?id=components-text-field--${variant}&viewMode=story`
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
  
      const textfield = await page.evaluateHandle(
        'document.querySelector("#input-text-field0")'
      );
      await textfield.hover();
      expect(await previewHtml.screenshot()).toMatchImageSnapshot();
      await textfield.focus();
      expect(await previewHtml.screenshot()).toMatchImageSnapshot();
      await page.mouse.move(60, 40);
      await page.mouse.down();
      await page.waitFor(100);
      expect(await previewHtml.screenshot()).toMatchImageSnapshot();
    });
});
