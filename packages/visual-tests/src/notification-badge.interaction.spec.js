const { test, expect } = require('./test-fixtures');

test('notification badge preserves its callback after type and slotted action changes @interaction', async ({
  page,
  story,
}) => {
  await story.open('components-notification-badge--text');
  const component = page.locator('scale-notification-badge');
  await component.evaluate((element) => {
    element.__clicks = [];
    element.clickHandler = (event) =>
      element.__clicks.push({ type: event.type, trusted: event.isTrusted });
    element.setAttribute('type', 'nav-icon');
    element.setAttribute('label', '11');
  });
  await expect(component.getByText('11', { exact: true })).toBeVisible();
  await component.evaluate((element) => {
    const action = document.createElement('button');
    action.type = 'button';
    action.textContent = 'Open notifications';
    element.replaceChildren(action);
    element.setAttribute('label', '12');
    element.setAttribute('type', 'text');
  });
  await expect(component.getByText('12', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Open notifications' }).click();
  await expect
    .poll(() => component.evaluate((element) => element.__clicks))
    .toEqual([{ type: 'click', trusted: true }]);
});

test('nav-icon badge leaves click handling to its surrounding control @interaction', async ({
  page,
  story,
}) => {
  await story.open('components-notification-badge--standard');
  const component = page.locator('scale-notification-badge');
  await component.evaluate((element) => {
    element.__clicks = [];
    element.__ownerClicks = [];
    element.clickHandler = () => element.__clicks.push('called');
    const action = document.createElement('button');
    action.type = 'button';
    action.setAttribute('aria-label', 'Open inbox');
    action.addEventListener('click', (event) =>
      element.__ownerClicks.push({ type: event.type, trusted: event.isTrusted })
    );
    element.before(action);
    action.append(element);
    element.setAttribute('type', 'nav-icon');
    element.setAttribute('label', '13');
  });
  await expect(component.getByText('13', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Open inbox' }).click();
  await expect
    .poll(() => component.evaluate((element) => element.__ownerClicks))
    .toEqual([{ type: 'click', trusted: true }]);
  expect(await component.evaluate((element) => element.__clicks)).toEqual([]);
});
