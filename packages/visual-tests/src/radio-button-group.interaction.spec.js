const { test, expect } = require('./test-fixtures');

test('radio button group selects one option and emits its value @interaction', async ({
  page,
  story,
}) => {
  await story.open('components-radio-button-group--standard');
  const group = page.locator('scale-radio-button-group');
  const radios = group.getByRole('radio', { name: 'Radio Label' });
  await group.evaluate((element) => {
    window.radioButtonGroupChangeValues = [];
    element.addEventListener('scale-change', (event) => {
      window.radioButtonGroupChangeValues.push(event.detail.value);
    });
  });

  await expect(radios).toHaveCount(3);
  await group.locator('scale-radio-button').nth(1).locator('label').click();
  await expect(radios.nth(1)).toBeChecked();
  await expect(radios.first()).not.toBeChecked();
  await expect(radios.nth(2)).not.toBeChecked();

  await group.locator('scale-radio-button').nth(2).locator('label').click();
  await expect(radios.nth(2)).toBeChecked();
  await expect(radios.first()).not.toBeChecked();
  await expect(radios.nth(1)).not.toBeChecked();
  await expect
    .poll(() => group.evaluate(() => window.radioButtonGroupChangeValues))
    .toEqual(['1', '2']);
});

test('radio button group navigates and selects with arrow keys @interaction', async ({
  page,
  story,
}) => {
  await story.open('components-radio-button-group--standard');
  const group = page.locator('scale-radio-button-group');
  const radios = group.getByRole('radio', { name: 'Radio Label' });

  await radios.first().focus();
  await expect(radios.first()).toBeFocused();
  await expect(radios.first()).not.toBeChecked();
  await page.keyboard.press('ArrowRight');
  await expect(radios.nth(1)).toBeFocused();
  await expect(radios.nth(1)).toBeChecked();
  await expect(radios.first()).not.toBeChecked();
  await expect(radios.nth(2)).not.toBeChecked();
});

test('disabled radio button ignores pointer activation @interaction', async ({
  page,
  story,
}) => {
  await story.open('components-radio-button-group--disabled');
  const group = page.locator('scale-radio-button-group');
  const radios = group.getByRole('radio', { name: 'Radio Label' });
  const disabledLabel = group
    .locator('scale-radio-button')
    .first()
    .locator('label');

  await expect(radios.first()).toBeDisabled();
  await expect(radios.first()).not.toBeChecked();
  const bounds = await disabledLabel.boundingBox();
  expect(bounds).not.toBeNull();
  await page.mouse.click(
    bounds.x + bounds.width / 2,
    bounds.y + bounds.height / 2
  );
  await expect(radios.first()).not.toBeChecked();
  await expect(radios.nth(1)).not.toBeChecked();
  await expect(radios.nth(2)).not.toBeChecked();
});
