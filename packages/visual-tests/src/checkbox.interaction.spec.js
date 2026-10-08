const { test, expect } = require('./test-fixtures');

async function observeChanges(component) {
  await component.evaluate((element) => {
    element.__changes = [];
    element.addEventListener('scale-change', (event) =>
      element.__changes.push(event.detail.checked)
    );
  });
}

test('checkbox toggles both ways from its label @interaction', async ({
  page,
  story,
}) => {
  await story.open('components-checkbox--standard');
  const checkbox = page.getByRole('checkbox', { name: 'Checkbox' });
  const label = page.locator('scale-checkbox label');
  const component = page.locator('scale-checkbox');
  await observeChanges(component);

  await expect(checkbox).not.toBeChecked();
  await label.click();
  await expect(checkbox).toBeChecked();
  await expect(component).toHaveJSProperty('checked', true);
  await label.click();
  await expect(checkbox).not.toBeChecked();
  await expect(component).toHaveJSProperty('checked', false);
  await expect
    .poll(() => component.evaluate((element) => element.__changes))
    .toEqual([true, false]);
});

test('checkbox toggles with Space @interaction', async ({ page, story }) => {
  await story.open('components-checkbox--standard');
  const checkbox = page.getByRole('checkbox', { name: 'Checkbox' });
  const component = page.locator('scale-checkbox');
  await observeChanges(component);

  await expect(checkbox).not.toBeChecked();
  await checkbox.focus();
  await page.keyboard.press('Space');
  await expect(checkbox).toBeChecked();
  await expect(component).toHaveJSProperty('checked', true);
  await expect
    .poll(() => component.evaluate((element) => element.__changes))
    .toEqual([true]);
});

test('disabled checkbox ignores its label @interaction', async ({
  page,
  story,
}) => {
  await story.open('components-checkbox--standard-disabled');
  const checkbox = page.getByRole('checkbox', { name: 'Standard Disabled' });
  const label = page.locator('scale-checkbox label');
  const component = page.locator('scale-checkbox');
  await observeChanges(component);

  await expect(checkbox).toBeDisabled();
  await expect(checkbox).not.toBeChecked();
  const bounds = await label.boundingBox();
  expect(bounds).not.toBeNull();
  await page.mouse.click(
    bounds.x + bounds.width / 2,
    bounds.y + bounds.height / 2
  );
  await expect(checkbox).not.toBeChecked();
  await expect(component).toHaveJSProperty('checked', false);
  expect(await component.evaluate((element) => element.__changes)).toEqual([]);
});
