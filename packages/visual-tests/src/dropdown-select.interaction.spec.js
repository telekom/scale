const { test, expect } = require('./test-fixtures');

const dropdownSelector =
  ':is(#root, #storybook-root) > div > scale-dropdown-select';

async function listenForChange(page, dropdown) {
  await dropdown.evaluate((element) => {
    element.__changes = [];
    element.addEventListener('scale-change', (event) =>
      element.__changes.push(event.detail.value)
    );
  });
}

test('dropdown-select commits a keyboard selection and emits its value @interaction', async ({
  page,
  story,
}) => {
  await story.open('components-dropdown-select--standard');
  const dropdown = page.locator(dropdownSelector);
  const select = dropdown.getByRole('combobox');
  const value = select.locator('[part="combobox-value"]');
  await expect(value).toHaveText('Caspar');

  await listenForChange(page, dropdown);

  await select.press('ArrowDown');
  await expect(select).toHaveAttribute('aria-expanded', 'true');
  await select.press('Home');
  await select.press('ArrowDown');
  await select.press('Enter');

  await expect(select).toHaveAttribute('aria-expanded', 'false');
  await expect(value).toHaveText('Cedric');
  await expect(dropdown).toHaveAttribute('value', 'cedric');
  await expect
    .poll(() => dropdown.evaluate((element) => element.__changes))
    .toEqual(['cedric']);
});

test('dropdown-select skips a child option disabled at runtime @interaction', async ({
  page,
  story,
}) => {
  await story.open('components-dropdown-select--standard');
  const dropdown = page.locator(dropdownSelector);
  const select = dropdown.getByRole('combobox');
  const value = select.locator('[part="combobox-value"]');
  await dropdown.evaluate((element) => {
    const item = Array.from(element.children).find(
      (child) => child.getAttribute('value') === 'cedric'
    );
    item.setAttribute('disabled', '');
  });
  await listenForChange(page, dropdown);

  await select.press('ArrowDown');
  await select.press('Home');
  await select.press('ArrowDown');
  await select.press('Enter');

  await expect(value).toHaveText('Cem');
  await expect(dropdown).toHaveAttribute('value', 'cem');
  await expect
    .poll(() => dropdown.evaluate((element) => element.__changes))
    .toEqual(['cem']);
});
