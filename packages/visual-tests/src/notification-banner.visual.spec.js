describe('NotificationBanner', () => {
  describe.each(['light', 'dark'])('%p', (mode) => {
    beforeAll(async () => {
      await global.runColorSetup(
        'components-notification-banner--standard',
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
      ['with-link'],
      ['with-link-and-text'],
    ])('%p', async (variant) => {
      await global.runSetup(`beta-components-notification-banner--${variant}`);
      await global.visualCheck();
    });
  });
});
