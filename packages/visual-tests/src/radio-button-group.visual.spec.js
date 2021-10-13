describe('RadioButtonGroup', () => {
  test.each([
    ['standard'],
    ['error'],
    ['helper-text'],
  ])('%p', async (variant) => {
    await global.page.goto(
      `http://host.docker.internal:3123/iframe.html?id=beta-components-radio-button-group--${variant}&viewMode=story`
    );
    await page.waitForSelector('html.hydrated');
    const previewHtml = await page.$('body');
    expect(await previewHtml.screenshot()).toMatchImageSnapshot();
  });
  // focus, hover, active, click
 test.each([
    ['standard'],
  ])('%p', async (variant) => {
    await global.page.goto(
      `http://host.docker.internal:3123/iframe.html?id=beta-components-radio-button-group--${variant}&viewMode=story`
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

    const firstRadioButton = await page.evaluateHandle(
      `document.querySelector("#root > div > scale-radio-button-group > scale-radio-button:nth-child(1) input[type=radio]")`
    ); 
    const label = await page.evaluateHandle(
      `document.querySelector("#root scale-radio-button-group > scale-radio-button:nth-child(1) > div > label")`
    ); 
    const base = await page.evaluateHandle(
      `document.querySelector("#root")`
    ); 

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
