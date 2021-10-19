describe('Dropdown', () => {
  // screenshots of stories
  test.each([
    ['standard'],
    ['small'],
    ['disabled'],
    ['error'],
    ['with-custom-icon'],
  ])('%p', async (variant) => {
    await global.page.goto(
      `http://host.docker.internal:3123/iframe.html?id=components-dropdown--${variant}&viewMode=story`
    );
    await page.waitForSelector('html.hydrated');
    const previewHtml = await page.$('body');
    await page.waitFor(1000);
    expect(await previewHtml.screenshot()).toMatchImageSnapshot();
  });
  // hover, active, focus
  test.each([['standard']])('%p', async (variant) => {
    await global.page.goto(
      `http://host.docker.internal:3123/iframe.html?id=components-dropdown--${variant}&viewMode=story`
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

    const dropdown = await page.evaluateHandle(
      `document.querySelector("#root > scale-dropdown .input__dropdown")`
    );
    await dropdown.hover();
    expect(await previewHtml.screenshot()).toMatchImageSnapshot();
    await dropdown.focus();
    expect(await previewHtml.screenshot()).toMatchImageSnapshot();
    await page.mouse.move(60, 60);
    await page.mouse.down();
    expect(await previewHtml.screenshot()).toMatchImageSnapshot();
  });
});
