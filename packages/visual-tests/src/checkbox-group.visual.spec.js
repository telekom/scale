describe('CheckboxGroup', () => {
  test.each([
    ['standard'],
    ['checkbox-disabled'],
    ['group-disabled'],
    ['helper-text'],
  ])('%p', async (variant) => {
    await global.page.goto(
      `http://host.docker.internal:3123/iframe.html?id=beta-components-checkbox-group--${variant}&viewMode=story`
    );
    await page.waitForSelector('html.hydrated');
    const previewHtml = await page.$('body');
    expect(await previewHtml.screenshot()).toMatchImageSnapshot();
  });
  test.each([
    ['standard'],
  ])('%p', async (variant) => {
    await global.page.goto(
      `http://host.docker.internal:3123/iframe.html?id=beta-components-checkbox-group--${variant}&viewMode=story`
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
