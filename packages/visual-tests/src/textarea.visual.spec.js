describe('Textarea', () => {
  test.each([
    ['standard'],
    ['placeholder'],
    ['helper-text'],
    ['with-error'],
    ['disabled'],
    ['max-length-with-counter'],
    ['more-rows'],
  ])('%p', async (variant) => {
    await global.page.goto(
      `http://host.docker.internal:3123/iframe.html?id=components-text-area--${variant}&viewMode=story`
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
      `http://host.docker.internal:3123/iframe.html?id=components-text-area--${variant}&viewMode=story`
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

    const textarea = await page.evaluateHandle(
      'document.querySelector("#input-textarea0")'
    );
    await textarea.hover();
    expect(await previewHtml.screenshot()).toMatchImageSnapshot();
    await textarea.focus();
    expect(await previewHtml.screenshot()).toMatchImageSnapshot();
    await page.mouse.move(60, 40);
    await page.mouse.down();
    expect(await previewHtml.screenshot()).toMatchImageSnapshot();
  });
});
