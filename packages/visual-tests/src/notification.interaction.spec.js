const { test, expect } = require('./test-fixtures');

const observeCloseEvents = async (page, notification) => {
  const events = [];
  await page.exposeFunction('recordNotificationCloseEvent', (event) =>
    events.push(event)
  );
  await notification.evaluate((element) => {
    for (const type of ['scale-before-close', 'scale-close']) {
      element.addEventListener(type, (event) => {
        window.recordNotificationCloseEvent({
          source: event.target.localName,
          type: event.type,
          ...(type === 'scale-before-close'
            ? { trigger: event.detail.trigger }
            : {}),
        });
      });
    }
  });
  return events;
};

const expectedCloseEvents = [
  {
    source: 'scale-notification',
    type: 'scale-before-close',
    trigger: 'CLOSE_BUTTON',
  },
  { source: 'scale-notification', type: 'scale-close' },
];

test('notification dismisses with Enter and emits its close events @interaction', async ({
  page,
  story,
}) => {
  await story.open('components-notification--standard');
  const notification = page.locator('scale-notification');
  const alert = page.getByRole('alert');
  const closeButton = page.getByRole('button', { name: 'Close', exact: true });
  const events = await observeCloseEvents(page, notification);

  await expect(alert).toBeVisible();
  await expect(closeButton).toBeVisible();
  await page.keyboard.press('Tab');
  await expect(closeButton).toBeFocused();
  await page.keyboard.press('Enter');

  await expect(alert).toBeHidden();
  await expect.poll(() => events).toEqual(expectedCloseEvents);
});

test('notification dismisses with a pointer and emits its close events @interaction', async ({
  page,
  story,
}) => {
  await story.open('components-notification--standard');
  const notification = page.locator('scale-notification');
  const alert = page.getByRole('alert');
  const closeButton = page.getByRole('button', { name: 'Close', exact: true });
  const events = await observeCloseEvents(page, notification);

  await expect(alert).toBeVisible();
  await expect(closeButton).toBeVisible();
  await closeButton.click();

  await expect(alert).toBeHidden();
  await expect.poll(() => events).toEqual(expectedCloseEvents);
});
