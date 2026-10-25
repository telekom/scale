const { test, expect } = require('./test-fixtures');

function observeCloseEvents(tag) {
  return tag.evaluate(
    (element) =>
      new Promise((resolve) => {
        const events = [];
        element.addEventListener('scale-close', (event) => {
          events.push({
            type: event.detail.type,
            clickCount: event.detail.detail,
            button: event.detail.button,
          });
          queueMicrotask(() => resolve(events));
        });
      })
  );
}

test('dismissable tag emits one close event from pointer activation @interaction', async ({
  page,
  story,
}) => {
  await story.open('components-tag--dismissable-tag');
  const tag = page.locator('scale-tag');
  const dismissButton = tag.getByRole('button', { name: 'dismiss' });
  const closeEvents = observeCloseEvents(tag);

  await dismissButton.click();

  expect(await closeEvents).toEqual([
    { type: 'click', clickCount: 1, button: 0 },
  ]);
});

test('dismissable tag emits one close event from Space activation @interaction', async ({
  page,
  story,
}) => {
  await story.open('components-tag--dismissable-tag');
  const tag = page.locator('scale-tag');
  const dismissButton = tag.getByRole('button', { name: 'dismiss' });
  const closeEvents = observeCloseEvents(tag);

  await dismissButton.focus();
  await expect(dismissButton).toBeFocused();
  await page.keyboard.press('Space');

  expect(await closeEvents).toEqual([
    { type: 'click', clickCount: 0, button: 0 },
  ]);
});
