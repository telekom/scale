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

test('textfield blocks editing while readonly or disabled and resumes after removal @interaction', async ({
  page,
  story,
}) => {
  await story.open('components-text-field--standard');
  const component = page.locator('scale-text-field');
  const input = component.getByRole('textbox', { name: 'An input' });
  await component.evaluate((element) => {
    window.textFieldValueEvents = [];
    for (const type of ['scale-input', 'scale-change']) {
      element.addEventListener(type, (event) =>
        window.textFieldValueEvents.push({
          type,
          value: type === 'scale-change' ? event.detail.value : undefined,
        })
      );
    }
  });

  await input.click();
  await input.pressSequentially('Ada');
  await expect(input).toHaveValue('Ada');

  const beforeReadonly = await page.evaluate(
    () =>
      window.textFieldValueEvents.filter(
        (event) => event.type === 'scale-input'
      ).length
  );
  await component.evaluate((element) => element.setAttribute('readonly', ''));
  await expect(input).toHaveJSProperty('readOnly', true);
  await input.pressSequentially(' blocked');
  await expect(input).toHaveValue('Ada');
  expect(
    await page.evaluate(
      () =>
        window.textFieldValueEvents.filter(
          (event) => event.type === 'scale-input'
        ).length
    )
  ).toBe(beforeReadonly);

  await component.evaluate((element) => element.removeAttribute('readonly'));
  await expect(input).not.toHaveAttribute('readonly');
  await input.pressSequentially(' Lovelace');
  await expect(input).toHaveValue('Ada Lovelace');

  const beforeDisabled = await page.evaluate(
    () =>
      window.textFieldValueEvents.filter(
        (event) => event.type === 'scale-input'
      ).length
  );
  await component.evaluate((element) => element.setAttribute('disabled', ''));
  await expect(input).toBeDisabled();
  const bounds = await input.boundingBox();
  expect(bounds).not.toBeNull();
  await page.mouse.click(
    bounds.x + bounds.width / 2,
    bounds.y + bounds.height / 2
  );
  await page.keyboard.type(' blocked');
  await expect(input).toHaveValue('Ada Lovelace');
  expect(
    await page.evaluate(
      () =>
        window.textFieldValueEvents.filter(
          (event) => event.type === 'scale-input'
        ).length
    )
  ).toBe(beforeDisabled);

  await component.evaluate((element) => element.removeAttribute('disabled'));
  await expect(input).toBeEnabled();
  await input.click();
  await input.pressSequentially('!');
  await expect(input).toHaveValue('Ada Lovelace!');
  expect(
    await page.evaluate(() =>
      window.textFieldValueEvents
        .filter((event) => event.type === 'scale-change')
        .at(-1)
    )
  ).toEqual({ type: 'scale-change', value: 'Ada Lovelace!' });
});

test('textfield validates email and submits its public name in a consumer form @interaction', async ({
  page,
  story,
}) => {
  await story.open('components-text-field--standard');
  const component = page.locator('scale-text-field');
  const input = component.getByRole('textbox', { name: 'An input' });
  await component.evaluate((element) => {
    const form = document.createElement('form');
    form.setAttribute('aria-label', 'Email form');
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Submit';
    element.replaceWith(form);
    form.append(element, submitButton);
    element.setAttribute('type', 'email');
    element.setAttribute('name', 'email');
    element.setAttribute('required', '');
    window.textFieldSubmissions = [];
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      window.textFieldSubmissions.push(
        Object.fromEntries(new FormData(form).entries())
      );
    });
  });

  await expect(input).toHaveAttribute('type', 'email');
  await expect(input).toHaveAttribute('name', 'email');
  await expect(input).toHaveAttribute('required', '');
  await input.click();
  await input.pressSequentially('not-an-email');
  await expect
    .poll(() => input.evaluate((element) => element.validity.valid))
    .toBe(false);
  await page.getByRole('button', { name: 'Submit' }).click();
  expect(await page.evaluate(() => window.textFieldSubmissions)).toEqual([]);

  await input.press('Control+A');
  await input.pressSequentially('ada@example.com');
  await expect
    .poll(() => input.evaluate((element) => element.validity.valid))
    .toBe(true);
  await page.getByRole('button', { name: 'Submit' }).click();
  expect(await page.evaluate(() => window.textFieldSubmissions)).toEqual([
    { email: 'ada@example.com' },
  ]);
});
