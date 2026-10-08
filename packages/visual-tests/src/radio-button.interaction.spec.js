const { test, expect } = require('./test-fixtures');

const watchScaleChange = async (page) => {
  await page.evaluate(() => {
    window.radioButtonChangeValues = [];
    document.querySelectorAll('scale-radio-button').forEach((radio) => {
      radio.addEventListener('scale-change', (event) => {
        window.radioButtonChangeValues.push(event.detail.value);
      });
    });
  });
};

test('radio label selects one option and emits its value @interaction', async ({
  page,
  story,
}) => {
  await story.open('components-radio-button-group--standard');
  const hosts = page.locator('scale-radio-button');
  const radios = page.getByRole('radio', { name: 'Radio Label' });
  await watchScaleChange(page);

  await expect(radios).toHaveCount(3);
  await expect(radios.nth(0)).not.toBeChecked();
  await page.getByLabel('Radio Label').nth(1).click();

  await expect(radios.nth(1)).toBeChecked();
  await expect(hosts.nth(1)).toHaveJSProperty('checked', true);
  await expect(radios.nth(0)).not.toBeChecked();
  await expect(hosts.nth(0)).toHaveJSProperty('checked', false);
  await expect
    .poll(() => page.evaluate(() => window.radioButtonChangeValues))
    .toEqual(['1']);

  await page.getByLabel('Radio Label').nth(2).click();
  await expect(radios.nth(2)).toBeChecked();
  await expect(hosts.nth(2)).toHaveJSProperty('checked', true);
  await expect(radios.nth(1)).not.toBeChecked();
  await expect(hosts.nth(1)).toHaveJSProperty('checked', false);
  await expect
    .poll(() => page.evaluate(() => window.radioButtonChangeValues))
    .toEqual(['1', '2']);
});

test('radio selection moves with arrow keys and emits the selected value @interaction', async ({
  page,
  story,
}) => {
  await story.open('components-radio-button-group--standard');
  const hosts = page.locator('scale-radio-button');
  const radios = page.getByRole('radio', { name: 'Radio Label' });
  await watchScaleChange(page);

  await radios.nth(0).focus();
  await page.keyboard.press('Space');
  await expect(radios.nth(0)).toBeChecked();
  await expect(hosts.nth(0)).toHaveJSProperty('checked', true);

  await page.keyboard.press('ArrowDown');
  await expect(radios.nth(1)).toBeFocused();
  await expect(radios.nth(1)).toBeChecked();
  await expect(hosts.nth(1)).toHaveJSProperty('checked', true);
  await expect(radios.nth(0)).not.toBeChecked();
  await expect(hosts.nth(0)).toHaveJSProperty('checked', false);
  await expect
    .poll(() => page.evaluate(() => window.radioButtonChangeValues))
    .toEqual(['0', '1']);
});

test('disabled radio ignores a physical label click @interaction', async ({
  page,
  story,
}) => {
  await story.open('components-radio-button-group--disabled');
  const host = page.locator('scale-radio-button').first();
  const radio = page.getByRole('radio', { name: 'Radio Label' }).first();
  const label = host.locator('label');
  await watchScaleChange(page);

  await expect(radio).toBeDisabled();
  await expect(host).toHaveJSProperty('disabled', true);
  await expect(radio).not.toBeChecked();
  await expect(host).toHaveJSProperty('checked', false);
  const bounds = await label.boundingBox();
  expect(bounds).not.toBeNull();
  await page.mouse.click(
    bounds.x + bounds.width / 2,
    bounds.y + bounds.height / 2
  );

  await expect(radio).not.toBeChecked();
  await expect(host).toHaveJSProperty('checked', false);
  await expect
    .poll(() => page.evaluate(() => window.radioButtonChangeValues))
    .toEqual([]);
});
