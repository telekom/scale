describe('Notification', () => {
  describe.each(['light', 'dark'])('%p', mode => {
    beforeAll(async () => {
      await global.runColorSetup('components-notification--standard', mode);
    });
    test.each([
      ['standard'],
      ['inline'],
      ['banner'],
      ['toast'],
      ['success'],
      ['informational'],
      ['danger'],
      ['warning'],
    ])('%p', async variant => {
      await global.runSetup(`components-notification--${variant}`);
      await global.visualCheck();
    });
  });
});
