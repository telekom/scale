const { test, expect } = require('./test-fixtures');

async function listenForChange(page, component) {
  let resolveChange;
  const change = new Promise((resolve) => {
    resolveChange = resolve;
  });

  await page.exposeFunction('captureSegmentedButtonChange', (segments) => {
    resolveChange(segments);
  });
  await component.evaluate((element) => {
    element.addEventListener(
      'scale-change',
      (event) => {
        window.captureSegmentedButtonChange(
          event.detail.segments.map((segment) => ({
            label: segment.textContent.trim(),
            selected: segment.selected,
          }))
        );
      },
      { once: true }
    );
  });

  return { change };
}

test('enabling a slotted segment lets it select and emit its detail @interaction', async ({
  page,
  story,
}) => {
  await story.open('components-segmented-button--standard');
  const component = page.locator('scale-segmented-button');
  const group = component.getByRole('group', { name: 'segment button with 4' });
  const segments = component.locator('scale-segment');
  const samsung = segments.nth(2);
  const samsungButton = samsung.getByRole('button');
  await expect(group).toBeVisible();
  const { change } = await listenForChange(page, component);

  await samsung.evaluate((segment) => {
    segment.disabled = true;
  });
  await expect(samsungButton).toBeDisabled();
  await samsung.evaluate((segment) => {
    segment.disabled = false;
  });
  await expect(samsungButton).toBeEnabled();
  await samsungButton.click();

  await expect(samsung).toHaveJSProperty('selected', true);
  await expect(segments.nth(0)).toHaveJSProperty('selected', false);
  await expect
    .poll(() => change)
    .toEqual([
      { label: 'Apple', selected: false },
      { label: 'One+', selected: false },
      { label: 'Samsung', selected: true },
      { label: 'Huawei', selected: false },
    ]);
});
