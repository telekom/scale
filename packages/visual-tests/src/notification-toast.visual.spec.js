describe('NotificationToast', () => {
  describe.each(['light', 'dark'])('%p', (mode) => {
    beforeAll(async () => {
      await global.runColorSetup(
        'components-notification-toast--standard',
        mode
      );
    });
    test.each([
      ['standard'],
      ['warning'],
      ['error'],
      ['success'],
      ['with-text'],
      ['with-link'],
    ])('%p', async (variant) => {
      await global.runSetup(`beta-components-notification-toast--${variant}`);
      await global.page.waitFor(3000);
      await global.visualCheck();
    });
  });
});
