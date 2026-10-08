const { test, expect } = require('./test-fixtures');

const dropdownSelector =
  ':is(#root, #storybook-root) > div > scale-dropdown-select';

test('dropdown-select commits a keyboard selection and emits its value @interaction', async ({
  page,
  story,
}) => {
  await story.open('components-dropdown-select--standard');
  const dropdown = page.locator(dropdownSelector);
  const select = dropdown.getByRole('combobox');
  const value = select.locator('[part="combobox-value"]');
  await expect(value).toHaveText('Caspar');

  const emittedValue = dropdown.evaluate(
    (element) =>
      new Promise((resolve) => {
        element.addEventListener(
          'scale-change',
          (event) => resolve(event.detail.value),
          { once: true }
        );
      })
  );

  await select.press('ArrowDown');
  await expect(select).toHaveAttribute('aria-expanded', 'true');
  await select.press('Home');
  await select.press('ArrowDown');
  await select.press('Enter');

  await expect(select).toHaveAttribute('aria-expanded', 'false');
  await expect(value).toHaveText('Cedric');
  await expect(dropdown).toHaveAttribute('value', 'cedric');
  expect(await emittedValue).toBe('cedric');
});

test('dropdown-select Escape cancels navigation and preserves selection @interaction', async ({
  page,
  story,
}) => {
  await story.open('components-dropdown-select--standard');
  const dropdown = page.locator(dropdownSelector);
  const select = dropdown.getByRole('combobox');
  const listbox = dropdown.getByRole('listbox', { includeHidden: true });
  const value = select.locator('[part="combobox-value"]');
  const cedric = listbox.getByRole('option', { name: 'Cedric' });

  await select.press('ArrowDown');
  await expect(listbox).toBeVisible();
  await select.press('Home');
  await select.press('ArrowDown');
  await expect(select).toHaveAttribute(
    'aria-activedescendant',
    await cedric.getAttribute('id')
  );
  await expect(value).toHaveText('Caspar');
  await select.press('Escape');

  await expect(select).toHaveAttribute('aria-expanded', 'false');
  await expect(listbox).toBeHidden();
  await expect(value).toHaveText('Caspar');
  await expect(dropdown).toHaveAttribute('value', 'caspar');
});

test('disabled dropdown-select ignores a real pointer click @interaction', async ({
  page,
  story,
}) => {
  await story.open('components-dropdown-select--disabled');
  const dropdown = page.locator(dropdownSelector);
  const select = dropdown.getByRole('combobox');
  const listbox = dropdown.getByRole('listbox', { includeHidden: true });

  await expect(select).toHaveAttribute('tabindex', '-1');
  await expect(select).toHaveAttribute('aria-expanded', 'false');
  const bounds = await select.boundingBox();
  expect(bounds).not.toBeNull();
  await page.mouse.click(
    bounds.x + bounds.width / 2,
    bounds.y + bounds.height / 2
  );

  await expect(select).toHaveAttribute('aria-expanded', 'false');
  await expect(listbox).toBeHidden();
});
