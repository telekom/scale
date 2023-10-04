// FIXME unskip
describe.skip('RadioButton', () => {
  describe.each(['light', 'dark'])('%p', (mode) => {
    beforeAll(async () => {
      await global.runColorSetup('components-radio-button--standard', mode);
    });
    test([
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
  test([['standard'], ['selected']])('%p', async (variant) => {
    await global.runSetup(`components-radio-button--${variant}`);

    const radioButtonWrapper = await global.page.evaluateHandle(
      `document.querySelector("#root > scale-radio-button > div")`
    );
    const radioButton = await global.page.evaluateHandle(
      `document.querySelector("#root > scale-radio-button > div > input")`
    );

    radioButton.focus();
    await global.visualCheck();
    radioButtonWrapper.hover();
    await global.visualCheck();
    await global.page.mouse.move(20, 20);
    await global.page.mouse.down();
    await global.visualCheck();
  });
});
