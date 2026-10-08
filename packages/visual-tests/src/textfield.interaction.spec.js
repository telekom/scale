const { test, expect } = require('./test-fixtures');

test('textfield accepts keyboard input and emits scale-change detail @interaction', async ({
  page,
  story,
}) => {
  await story.open('components-text-field--standard');
  const component = page.locator('scale-text-field');
  const input = component.getByRole('textbox', { name: 'An input' });
  const changes = [];
  await page.exposeFunction('recordScaleChange', (detail) =>
    changes.push(detail)
  );
  await component.evaluate((element) =>
    element.addEventListener('scale-change', (event) =>
      window.recordScaleChange(event.detail)
    )
  );

  await input.click();
  await input.pressSequentially('Ada');

  await expect(input).toHaveValue('Ada');
  await expect.poll(() => changes.at(-1)).toEqual({ value: 'Ada' });
});

test('textfield enforces max length and updates counter with scale-change detail @interaction', async ({
  page,
  story,
}) => {
  await story.open('components-text-field--max-length-with-counter');
  const component = page.locator('scale-text-field');
  const input = component.getByRole('textbox', {
    name: 'Max Length With Counter',
  });
  const changes = [];
  await page.exposeFunction('recordScaleChange', (detail) =>
    changes.push(detail)
  );
  await component.evaluate((element) =>
    element.addEventListener('scale-change', (event) =>
      window.recordScaleChange(event.detail)
    )
  );

  await input.click();
  await input.pressSequentially('0123456789XYZ');

  await expect(input).toHaveValue('0123456789');
  await expect(page.getByText('10 / 10')).toBeVisible();
  await expect.poll(() => changes.at(-1)).toEqual({ value: '0123456789' });
});

test('textfield readonly and disabled states prevent edits @interaction', async ({
  page,
  story,
}) => {
  const changes = [];
  await page.exposeFunction('recordScaleChange', (detail) =>
    changes.push(detail)
  );

  await story.open('components-text-field--read-only');
  let component = page.locator('scale-text-field');
  let input = component.getByRole('textbox', { name: 'Read only' });
  await component.evaluate((element) =>
    element.addEventListener('scale-change', (event) =>
      window.recordScaleChange(event.detail)
    )
  );
  await expect(input).toHaveValue('This cannot be changed');
  await expect(input).toHaveAttribute('readonly', '');
  await input.focus();
  await page.keyboard.press('End');
  await page.keyboard.type(' changed');
  await expect(input).toHaveValue('This cannot be changed');

  await story.open('components-text-field--disabled');
  component = page.locator('scale-text-field');
  input = component.getByRole('textbox', { name: 'Disabled' });
  await component.evaluate((element) =>
    element.addEventListener('scale-change', (event) =>
      window.recordScaleChange(event.detail)
    )
  );
  await expect(input).toBeDisabled();
  const bounds = await input.boundingBox();
  expect(bounds).not.toBeNull();
  await page.mouse.click(
    bounds.x + bounds.width / 2,
    bounds.y + bounds.height / 2
  );
  await page.keyboard.type('blocked');
  await expect(input).toHaveValue('');
  await expect.poll(() => changes).toEqual([]);
});
