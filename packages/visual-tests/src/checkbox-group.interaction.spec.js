const { test, expect } = require('./test-fixtures');

test('checkbox group children keep independent selections and bubble change @interaction', async ({
  page,
  story,
}) => {
  await story.open('components-checkbox-group--standard');

  const group = page.locator('scale-checkbox-group');
  const firstCheckbox = page.getByRole('checkbox', {
    name: 'Checkbox Item 1',
  });
  const secondCheckbox = page.getByRole('checkbox', {
    name: 'Checkbox Item 2',
  });
  const thirdCheckbox = page.getByRole('checkbox', {
    name: 'Checkbox Item 3',
  });
  const changeEvent = group.evaluate(
    (element) =>
      new Promise((resolve) => {
        element.addEventListener(
          'scale-change',
          (event) =>
            resolve({
              bubbles: event.bubbles,
              target: event.target.localName,
              detail: event.detail,
            }),
          { once: true }
        );
      })
  );

  await expect(firstCheckbox).not.toBeChecked();
  await expect(secondCheckbox).toBeChecked();
  await expect(thirdCheckbox).not.toBeChecked();
  await page.getByText('Checkbox Item 1', { exact: true }).click();

  await expect(firstCheckbox).toBeChecked();
  await expect(secondCheckbox).toBeChecked();
  await expect(thirdCheckbox).not.toBeChecked();
  expect(await changeEvent).toEqual({
    bubbles: true,
    target: 'scale-checkbox',
    detail: {
      checked: true,
      indeterminate: false,
      value: '1',
      disabled: false,
    },
  });
});

test('checkbox group children can be selected with the keyboard @interaction', async ({
  page,
  story,
}) => {
  await story.open('components-checkbox-group--standard');

  const firstCheckbox = page.getByRole('checkbox', {
    name: 'Checkbox Item 1',
  });
  const secondCheckbox = page.getByRole('checkbox', {
    name: 'Checkbox Item 2',
  });
  const thirdCheckbox = page.getByRole('checkbox', {
    name: 'Checkbox Item 3',
  });

  await expect(firstCheckbox).not.toBeChecked();
  await expect(secondCheckbox).toBeChecked();
  await expect(thirdCheckbox).not.toBeChecked();
  await firstCheckbox.focus();
  await expect(firstCheckbox).toBeFocused();
  await page.keyboard.press('Space');

  await expect(firstCheckbox).toBeChecked();
  await expect(secondCheckbox).toBeChecked();
  await expect(thirdCheckbox).not.toBeChecked();
});
