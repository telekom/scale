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

test('textarea blocks editing while readonly or disabled and resumes after removal @interaction', async ({
  page,
  story,
}) => {
  await story.open('components-text-area--standard');
  const component = page.locator('scale-textarea');
  const textarea = component.getByRole('textbox', { name: 'Textarea' });
  await component.evaluate((element) => {
    window.textareaValueEvents = [];
    for (const type of ['scale-input', 'scale-change']) {
      element.addEventListener(type, (event) =>
        window.textareaValueEvents.push({
          type,
          value: type === 'scale-change' ? event.detail.value : undefined,
        })
      );
    }
  });

  await textarea.click();
  await textarea.pressSequentially('First line');
  await textarea.press('Enter');
  await textarea.pressSequentially('Second line');
  await expect(textarea).toHaveValue('First line\nSecond line');

  const beforeReadonly = await page.evaluate(
    () =>
      window.textareaValueEvents.filter((event) => event.type === 'scale-input')
        .length
  );
  await component.evaluate((element) => element.setAttribute('readonly', ''));
  await expect(textarea).toHaveJSProperty('readOnly', true);
  await textarea.pressSequentially(' blocked');
  await expect(textarea).toHaveValue('First line\nSecond line');
  expect(
    await page.evaluate(
      () =>
        window.textareaValueEvents.filter(
          (event) => event.type === 'scale-input'
        ).length
    )
  ).toBe(beforeReadonly);

  await component.evaluate((element) => element.removeAttribute('readonly'));
  await expect(textarea).not.toHaveAttribute('readonly');
  await textarea.press('Enter');
  await textarea.pressSequentially('Third line');
  await expect(textarea).toHaveValue('First line\nSecond line\nThird line');

  const beforeDisabled = await page.evaluate(
    () =>
      window.textareaValueEvents.filter((event) => event.type === 'scale-input')
        .length
  );
  await component.evaluate((element) => element.setAttribute('disabled', ''));
  await expect(textarea).toBeDisabled();
  const bounds = await textarea.boundingBox();
  expect(bounds).not.toBeNull();
  await page.mouse.click(
    bounds.x + bounds.width / 2,
    bounds.y + bounds.height / 2
  );
  await page.keyboard.type(' blocked');
  await expect(textarea).toHaveValue('First line\nSecond line\nThird line');
  expect(
    await page.evaluate(
      () =>
        window.textareaValueEvents.filter(
          (event) => event.type === 'scale-input'
        ).length
    )
  ).toBe(beforeDisabled);

  await component.evaluate((element) => element.removeAttribute('disabled'));
  await expect(textarea).toBeEnabled();
  await textarea.click();
  await textarea.press('Control+End');
  await textarea.press('Enter');
  await textarea.pressSequentially('Fourth line');
  await expect(textarea).toHaveValue(
    'First line\nSecond line\nThird line\nFourth line'
  );
  expect(
    await page.evaluate(() =>
      window.textareaValueEvents
        .filter((event) => event.type === 'scale-change')
        .at(-1)
    )
  ).toEqual({
    type: 'scale-change',
    value: 'First line\nSecond line\nThird line\nFourth line',
  });
});
