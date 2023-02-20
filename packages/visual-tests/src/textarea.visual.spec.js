describe('Textarea', () => {
  describe.each(['light', 'dark'])('%p', (mode) => {
    beforeAll(async () => {
      await global.runColorSetup('components-text-area--standard', mode);
    });
    test.each([
      ['standard'],
      ['placeholder'],
      ['helper-text'],
      ['with-error'],
      ['disabled'],
      ['max-length-with-counter'],
      ['more-rows'],
    ])('%p', async (variant) => {
      await global.runSetup(`components-text-area--${variant}`);
      await global.visualCheck();
    });
    // hover, focus, active
    test.each([['standard']])('%p', async (variant) => {
      await global.runSetup(`components-text-area--${variant}`);
      const textarea = await global.page.evaluateHandle(
        'document.querySelector("#input-textarea-0")'
      );
      await global.page.mouse.move(60, 40);
      await global.page.mouse.down();
      await global.visualCheck();
      await global.page.keyboard.press('Tab');
      await textarea.hover();
      await global.visualCheck();
      await textarea.focus();
      await global.visualCheck();
    });
  });
});
