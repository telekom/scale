describe('NotificationBadge', () => {
  describe.each(['light', 'dark'])('%p', (mode) => {
    beforeAll(async () => {
      await global.runColorSetup(
        'components-notification-badge--standard',
        mode
      );
    });
    test.each([
      ['label-text'],
      ['label-icon'],
      ['text'],
      ['icon'],
      ['standard'],
    ])('%p', async (variant) => {
      await global.runSetup(`components-notification-badge--${variant}`);
      await global.visualCheck();
    });
  });
});
