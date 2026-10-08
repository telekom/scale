const { test, expect } = require('./test-fixtures');

test('switch toggles in both pointer directions and emits scale-change values @interaction', async ({
  page,
  story,
}) => {
  await story.open('components-switch--standard');
  const component = page.locator('scale-switch');
  const checkbox = component.getByRole('checkbox', { name: 'Standard' });
  await component.evaluate((element) => {
    element.__scaleChangeValues = [];
    element.addEventListener('scale-change', (event) => {
      element.__scaleChangeValues.push(event.detail.value);
    });
  });

  await expect(checkbox).not.toBeChecked();
  await component.getByText('Standard', { exact: true }).click();
  await expect(checkbox).toBeChecked();
  await expect
    .poll(() => component.evaluate((element) => element.__scaleChangeValues))
    .toEqual([true]);

  await component.getByText('Standard', { exact: true }).click();
  await expect(checkbox).not.toBeChecked();
  await expect
    .poll(() => component.evaluate((element) => element.__scaleChangeValues))
    .toEqual([true, false]);
});

test('switch toggles with Space @interaction', async ({ page, story }) => {
  await story.open('components-switch--standard');
  const component = page.locator('scale-switch');
  await component.evaluate((element) => {
    element.__scaleChangeValues = [];
    element.addEventListener('scale-change', (event) =>
      element.__scaleChangeValues.push(event.detail.value)
    );
  });
  const checkbox = page
    .locator('scale-switch')
    .getByRole('checkbox', { name: 'Standard' });

  await expect(checkbox).not.toBeChecked();
  await checkbox.focus();
  await expect(checkbox).toBeFocused();
  await page.keyboard.press('Space');
  await expect(checkbox).toBeChecked();
  await expect(component).toHaveJSProperty('checked', true);
  await expect
    .poll(() => component.evaluate((element) => element.__scaleChangeValues))
    .toEqual([true]);
});

test('disabled switch ignores pointer activation @interaction', async ({
  page,
  story,
}) => {
  await story.open('components-switch--standard-disabled');
  const component = page.locator('scale-switch');
  const checkbox = component.getByRole('checkbox', {
    name: 'Standard disabled',
  });

  await expect(checkbox).toBeDisabled();
  await expect(checkbox).not.toBeChecked();
  const bounds = await checkbox.boundingBox();
  expect(bounds).not.toBeNull();
  await page.mouse.click(
    bounds.x + bounds.width / 2,
    bounds.y + bounds.height / 2
  );
  await expect(checkbox).not.toBeChecked();
});
