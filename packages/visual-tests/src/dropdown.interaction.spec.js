const { test, expect } = require('./test-fixtures');

test('dropdown selects the previous option with ArrowUp @interaction', async ({
  page,
  story,
}) => {
  await story.open('deprecated-components-dropdown--standard');
  const component = page.locator('scale-dropdown');
  const select = page.getByRole('combobox', { name: 'Select' });
  const changes = [];

  await page.exposeFunction('recordDropdownChange', (detail) =>
    changes.push(detail)
  );
  await component.evaluate((element) => {
    element.addEventListener('scale-change', (event) =>
      window.recordDropdownChange(event.detail)
    );
  });

  await expect(select).toHaveValue('3');
  await select.focus();
  await page.keyboard.press('ArrowUp');

  await expect(select).toHaveValue('2');
  await expect
    .poll(() => component.evaluate((element) => element.value))
    .toBe('2');
  await expect.poll(() => changes).toEqual([{ value: '2' }]);
});

test('dropdown selects the last option with End @interaction', async ({
  page,
  story,
}) => {
  await story.open('deprecated-components-dropdown--standard');
  const component = page.locator('scale-dropdown');
  const select = page.getByRole('combobox', { name: 'Select' });

  await select.focus();
  await page.keyboard.press('Home');
  await expect(select).toHaveValue('1');
  await page.keyboard.press('End');

  await expect(select).toHaveValue('3');
  await expect
    .poll(() => component.evaluate((element) => element.value))
    .toBe('3');
  await expect(
    page.getByRole('option', { name: 'Category 3' })
  ).toHaveJSProperty('selected', true);
});

test('disabled dropdown blocks keyboard and pointer selection @interaction', async ({
  page,
  story,
}) => {
  await story.open('deprecated-components-dropdown--disabled');
  const component = page.locator('scale-dropdown');
  const select = page.getByRole('combobox', { name: 'Disabled' });
  await component.evaluate((element) => {
    element.__changes = [];
    element.addEventListener('scale-change', (event) =>
      element.__changes.push(event.detail)
    );
  });

  await expect(select).toBeDisabled();
  await expect(select).toHaveValue('3');
  await select.focus();
  await page.keyboard.press('ArrowUp');
  await expect(select).not.toBeFocused();
  await expect(select).toHaveValue('3');

  const bounds = await select.boundingBox();
  expect(bounds).not.toBeNull();
  await page.mouse.click(
    bounds.x + bounds.width / 2,
    bounds.y + bounds.height / 2
  );
  await expect(select).toHaveValue('3');
  expect(await component.evaluate((element) => element.__changes)).toEqual([]);
});
