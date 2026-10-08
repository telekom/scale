const { test, expect } = require('./test-fixtures');

test('textarea accepts multiline keyboard input and emits scale-change detail @interaction', async ({
  page,
  story,
}) => {
  await story.open('components-text-area--standard');
  const component = page.locator('scale-textarea');
  const textarea = page.getByRole('textbox', { name: 'Textarea' });
  const changes = [];
  await page.exposeFunction('recordTextareaChange', (detail) =>
    changes.push(detail)
  );
  await component.evaluate((element) =>
    element.addEventListener('scale-change', (event) =>
      window.recordTextareaChange(event.detail)
    )
  );

  await textarea.click();
  await textarea.pressSequentially('First line');
  await textarea.press('Enter');
  await textarea.pressSequentially('Second line');

  await expect(textarea).toHaveValue('First line\nSecond line');
  await expect
    .poll(() => changes.at(-1))
    .toEqual({
      value: 'First line\nSecond line',
    });
});

test('textarea enforces max length and updates its counter and scale-change detail @interaction', async ({
  page,
  story,
}) => {
  await story.open('components-text-area--max-length-with-counter');
  const component = page.locator('scale-textarea');
  const textarea = page.getByRole('textbox', {
    name: 'Max Length With Counter',
  });
  const changes = [];
  await page.exposeFunction('recordTextareaChange', (detail) =>
    changes.push(detail)
  );
  await component.evaluate((element) =>
    element.addEventListener('scale-change', (event) =>
      window.recordTextareaChange(event.detail)
    )
  );

  await textarea.click();
  await textarea.pressSequentially('0123456789XYZ');

  await expect(textarea).toHaveValue('0123456789');
  await expect(page.getByText('10 / 10', { exact: true })).toBeVisible();
  await expect.poll(() => changes.at(-1)).toEqual({ value: '0123456789' });
});
