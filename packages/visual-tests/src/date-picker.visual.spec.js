describe('DatePicker', () => {
  // open date-picker
  test.each([['standard']])('%p', async (variant) => {
    await global.page.goto(
      `http://host.docker.internal:3123/iframe.html?id=components-date-picker--${variant}&viewMode=story`
    );
    await page.waitForSelector('html.hydrated');

    const openButton = await page.evaluateHandle(
      `document.querySelector("#root > div > scale-date-picker > div > duet-date-picker > div > div.duet-date__input-wrapper > button")`
    );
    await openButton.click();

    const previewHtml = await page.$('body');
    await page.waitFor(3000);

    expect(await previewHtml.screenshot()).toMatchImageSnapshot();
  });
  // screenshots of stories
  test.each([
    ['standard'],
    ['helper-text'],
    ['with-error'],
    ['disabled'],
    ['small'],
    ['date-range-picker'],
  ])('%p', async (variant) => {
    await global.page.goto(
      `http://host.docker.internal:3123/iframe.html?id=components-date-picker--${variant}&viewMode=story`
    );
    await page.waitForSelector('html.hydrated');
    const previewHtml = await page.$('body');

    expect(await previewHtml.screenshot()).toMatchImageSnapshot();
  });
// hover, active, focus
  test.each([['standard']])('%p', async (variant) => {
    await global.page.goto(
      `http://host.docker.internal:3123/iframe.html?id=components-date-picker--${variant}&viewMode=story`
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

    const datePicker = await page.evaluateHandle(
      `document.querySelector("#root > div > scale-date-picker > div > duet-date-picker > div > div.duet-date__input-wrapper > .duet-date__input")`
    );
    datePicker.hover();
    expect(await previewHtml.screenshot()).toMatchImageSnapshot();
    datePicker.focus();
    expect(await previewHtml.screenshot()).toMatchImageSnapshot();
    await page.mouse.move(20, 60);
    await page.mouse.down();
    expect(await previewHtml.screenshot()).toMatchImageSnapshot();
  });
});
