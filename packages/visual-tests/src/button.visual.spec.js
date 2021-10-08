describe('Button', () => {
  test.each([
    ['standard'],
    ['secondary'],
    ['secondary-disabled'],
    ['disabled'],
    ['with-icon-before'],
    ['with-icon-after'],
    ['icon-only'],
    ['link'],
    ['small-standard'],
    ['small-secondary'],
    ['small-secondary-disabled'],
    ['small-disabled'],
    ['small-with-icon-before'],
    ['small-with-icon-after'],
    ['small-icon-only'],
    ['small-link'],
  ])('%p', async (variant) => {
    await global.page.goto(
      `http://host.docker.internal:3123/iframe.html?id=components-button--${variant}&viewMode=story`
    );

    await page.waitForSelector('html.hydrated');

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
    
    const previewHtml = await page.$('body');
    const button = await page.evaluateHandle(
      `document.querySelector("#root scale-button").shadowRoot.querySelector(".button")`
    );
    expect(await previewHtml.screenshot()).toMatchImageSnapshot();
  });
});
// hover, active, focus
describe('Button', () => {
  test.each([
    ['standard'],
    ['secondary'],
    ['with-icon-before'],
    ['icon-only'],
  ])('%p', async (variant) => {
    await global.page.goto(
      `http://host.docker.internal:3123/iframe.html?id=components-button--${variant}&viewMode=story`
    );

    await page.waitForSelector('html.hydrated');

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
    
    const previewHtml = await page.$('body');
    const button = await page.evaluateHandle(
      `document.querySelector("#root scale-button").shadowRoot.querySelector(".button")`
    );
    await button.hover();
    expect(await previewHtml.screenshot()).toMatchImageSnapshot();
    await page.mouse.move(20, 20);
    await page.mouse.down();
    expect(await previewHtml.screenshot()).toMatchImageSnapshot();
    await page.mouse.up();
    await page.mouse.move(0, 0);
    await button.focus();
    expect(await previewHtml.screenshot()).toMatchImageSnapshot();
  });
});
