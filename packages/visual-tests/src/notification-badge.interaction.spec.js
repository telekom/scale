const { test, expect } = require('./test-fixtures');

test('notification badge forwards a trusted pointer click to its callback @interaction', async ({
  page,
  story,
}) => {
  await story.open('components-notification-badge--text');
  const component = page.locator('scale-notification-badge');
  const calls = [];
  await page.exposeFunction('recordBadgeClick', (event) => calls.push(event));
  await component.evaluate((element) => {
    element.clickHandler = (event) =>
      window.recordBadgeClick({ type: event.type, trusted: event.isTrusted });
  });

  await component.locator('.notification-badge__wrapper').click();
  await expect.poll(() => calls).toEqual([{ type: 'click', trusted: true }]);
});

test('nav-icon badge leaves click handling to its surrounding control @interaction', async ({
  page,
  story,
}) => {
  await story.open('components-notification-badge--standard');
  const component = page.locator('scale-notification-badge');
  const calls = [];
  await page.exposeFunction('recordBadgeClick', () => calls.push('called'));
  await component.evaluate((element) => {
    element.type = 'nav-icon';
    element.clickHandler = () => window.recordBadgeClick();
  });
  await expect(component.locator('.notification-badge-border')).toHaveCount(0);
  await component.locator('.notification-badge__wrapper').click();
  await expect.poll(() => calls).toEqual([]);
});
