const { test, expect } = require('./test-fixtures');

test('date picker selects a calendar date and emits scale-change @interaction', async ({
  page,
  story,
}) => {
  await story.open('components-date-picker--standard');
  const datePicker = page.locator('scale-date-picker');
  const input = datePicker.getByRole('textbox', { name: 'Standard' });
  const toggle = datePicker.getByRole('button', { name: /Choose date/ });

  await datePicker.evaluate((element) => {
    window.datePickerChanges = [];
    element.addEventListener('scale-change', (event) => {
      window.datePickerChanges.push(event.detail.value);
    });
  });

  await expect(input).toHaveValue('2020-12-31');
  await toggle.click();
  const calendar = datePicker.getByRole('dialog', { name: 'Pick a date' });
  await expect(calendar).toBeVisible();
  await calendar.getByRole('button', { name: 'Next month' }).click();
  await calendar
    .getByRole('button', { name: '15 January', exact: true })
    .click();

  await expect(input).toHaveValue('2021-01-15');
  await expect
    .poll(() => page.evaluate(() => window.datePickerChanges))
    .toEqual(['2021-01-15']);
});

test('date picker refreshes the toggle label when localization changes @interaction', async ({
  page,
  story,
}) => {
  await story.open('components-date-picker--standard');
  const datePicker = page.locator('scale-date-picker');

  await datePicker.evaluate((element) => {
    element.localization = {
      buttonLabel: 'Select a date',
      calendarHeading: 'Choose a date',
    };
  });

  const toggle = datePicker.getByRole('button', { name: 'Select a date' });
  await expect(toggle).toHaveAttribute('title', 'Select a date');
});

test('date picker navigates months and restores focus after Escape @interaction', async ({
  page,
  story,
}) => {
  await story.open('components-date-picker--standard');
  const datePicker = page.locator('scale-date-picker');
  const toggle = datePicker.getByRole('button', { name: /Choose date/ });
  await toggle.click();

  const calendar = datePicker.getByRole('dialog', { name: 'Pick a date' });
  const januaryFifteenth = calendar.getByRole('button', {
    name: '15 January',
    exact: true,
  });
  await expect(calendar).toBeVisible();
  await calendar.getByRole('button', { name: 'Next month' }).click();
  await expect(januaryFifteenth).toBeVisible();
  await calendar.getByRole('button', { name: 'Previous month' }).click();
  await expect(
    calendar.getByRole('combobox', { name: 'Month', exact: true })
  ).toHaveValue('11');

  await page.keyboard.press('Escape');
  await expect(calendar).toBeHidden();
  await expect(toggle).toBeFocused();
});

test('disabled date picker ignores pointer activation @interaction', async ({
  page,
  story,
}) => {
  await story.open('components-date-picker--disabled');
  const datePicker = page.locator('scale-date-picker');
  const input = datePicker.getByRole('textbox', { name: 'Disabled' });
  const toggle = datePicker.getByRole('button', { name: 'Choose date' });

  await datePicker.evaluate((element) => {
    window.datePickerChanges = [];
    element.addEventListener('scale-change', () => {
      window.datePickerChanges.push('changed');
    });
  });

  await expect(input).toBeDisabled();
  await expect(toggle).toBeDisabled();
  const bounds = await toggle.boundingBox();
  expect(bounds).not.toBeNull();
  await page.mouse.click(
    bounds.x + bounds.width / 2,
    bounds.y + bounds.height / 2
  );

  await expect(input).toHaveValue('');
  await expect(datePicker.getByRole('dialog')).toBeHidden();
  await expect
    .poll(() => page.evaluate(() => window.datePickerChanges))
    .toEqual([]);
});
