describe('RadioButton', () => {
  describe.each(['light', 'dark'])('%p', (mode) => {
    beforeAll(async () => {
      await page.goto(
        `http://host.docker.internal:3123/iframe.html?id=components-radio-button--standard&viewMode=story`
      );
      await page.evaluate((mode) => {
        localStorage.setItem('persistedColorMode', JSON.stringify(mode));
      }, mode);
    });
    test.each([
      ['standard'],
      ['standard-disabled'],
      ['selected'],
      ['selected-disabled'],
      ['helper-text'],
      ['error'],
    ])('%p', async (variant) => {
      await page.goto(
        `http://host.docker.internal:3123/iframe.html?id=components-radio-button--${variant}&viewMode=story`
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
      expect(await previewHtml.screenshot()).toMatchImageSnapshot();
    });
  });
  // hover, active, focus
  test.each([['standard'], ['selected']])('%p', async (variant) => {
    await page.goto(
      `http://host.docker.internal:3123/iframe.html?id=components-radio-button--${variant}&viewMode=story`
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
    const radioButtonWrapper = await page.evaluateHandle(
      `document.querySelector("#root > scale-radio-button > div")`
    );
    const radioButton = await page.evaluateHandle(
      `document.querySelector("#root > scale-radio-button > div > input")`
    );

    radioButton.focus();
    expect(await previewHtml.screenshot()).toMatchImageSnapshot();
    radioButtonWrapper.hover();
    expect(await previewHtml.screenshot()).toMatchImageSnapshot();
    await page.mouse.move(20, 20);
    await page.mouse.down();
    expect(await previewHtml.screenshot()).toMatchImageSnapshot();
  });
});
