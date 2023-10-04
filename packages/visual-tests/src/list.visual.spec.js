describe('List', () => {
  describe.each(['light', 'dark'])('%p', mode => {
    beforeAll(async () => {
      await global.runColorSetup('components-list--standard', mode);
    });
    test.each([['ordered'], ['unordered'], ['unordered-with-custom-icon']])(
      '%p',
      async variant => {
        await global.runSetup(`components-list--${variant}`);

        await global.page.waitFor(1000);

        await global.visualCheck();
      }
    );
  });
});
