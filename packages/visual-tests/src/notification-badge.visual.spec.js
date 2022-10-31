describe('NotificationBadge', () => {
  describe.each(['light', 'dark'])('%p', (mode) => {
    beforeAll(async () => {
      await global.runColorSetup(
        'components-notification-badge--standard',
        mode
      );
    });
    test.each([
      ['brand-header-user-menu-icon-navigation'],
      ['brand-header-custom-icon-navigation'],
      ['label-text'],
      ['label-icon'],
      ['text'],
      ['icon'],
      ['standard'],
    ])('%p', async (variant) => {
      await global.runSetup(`beta-components-notification-badge--${variant}`);
      await global.visualCheck();
    });
  });
});
