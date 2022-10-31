describe('NotificationMessage', () => {
  describe.each(['light', 'dark'])('%p', (mode) => {
    beforeAll(async () => {
      await global.runColorSetup(
        'components-notification-message--standard',
        mode
      );
    });
    test.each([
      ['standard'],
      ['warning'],
      ['error'],
      ['success'],
      ['informational'],
      ['dismissible'],
      ['timeout'],
      ['with-text'],
    ])('%p', async (variant) => {
      await global.runSetup(`beta-components-notification-message--${variant}`);
      await global.visualCheck();
    });
  });
});
