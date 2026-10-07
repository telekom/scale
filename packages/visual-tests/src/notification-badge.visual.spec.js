const { test } = require('./test-fixtures');
test.describe('NotificationBadge', () => {
  for (const [variant] of [
    ['label-text'],
    ['label-icon'],
    ['text'],
    ['icon'],
    ['standard'],
  ]) {
    test(`${variant}`, async ({ story }) => {
      await story.open(`components-notification-badge--${variant}`);
      await story.screenshot('default.png');
    });
  }
});
