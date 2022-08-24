describe('RadioButton', () => {
  describe.each(['light', 'dark'])('%p', (mode) => {
    beforeAll(async () => {
      await global.runColorSetup('components-radio-button--standard', mode);
    });
    test.each([
      ['standard'],
      ['standard-disabled'],
      ['selected'],
      ['selected-disabled'],
      ['helper-text'],
      ['error'],
    ])('%p', async (variant) => {
      await global.runSetup(`components-radio-button--${variant}`);
      await global.visualCheck();
    });
  });
  // hover, active, focus
  test.each([['standard'], ['selected']])('%p', async (variant) => {
    await page.goto(
      `http://host.docker.internal:3123/iframe.html?id=components-radio-button--${variant}&viewMode=story`
    );

    const radioButtonWrapper = await page.evaluateHandle(
      `document.querySelector("#root > scale-radio-button > div")`
    );
    const radioButton = await page.evaluateHandle(
      `document.querySelector("#root > scale-radio-button > div > input")`
    );

    radioButton.focus();
    await global.visualCheck();
    radioButtonWrapper.hover();
    await global.visualCheck();
    await page.mouse.move(20, 20);
    await page.mouse.down();
    await global.visualCheck();
  });
});
