const { test } = require('./test-fixtures');
test.describe('Notification', () => {
  for (const [variant] of [
    ['standard'],
    ['inline'],
    ['banner'],
    ['toast'],
    ['success'],
    ['informational'],
    ['danger'],
    ['warning'],
  ]) {
    test(`${variant}`, async ({ story }) => {
      await story.open(`components-notification--${variant}`);
      await story.screenshot('default.png');
    });
  }
});
