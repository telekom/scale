const { test, expect } = require('./test-fixtures');

test('enabled button activates once with Enter @interaction', async ({
  page,
  story,
}) => {
  await story.open('components-button--standard');
  const component = page.locator('scale-button');
  const button = page.getByRole('button', { name: 'Label' });
  await component.evaluate((element) => {
    element.__clicks = [];
    element.addEventListener('click', (event) =>
      element.__clicks.push({
        type: event.type,
        bubbles: event.bubbles,
        trusted: event.isTrusted,
      })
    );
  });
  await button.focus();
  await expect(button).toBeFocused();
  await page.keyboard.press('Enter');
  expect(await component.evaluate((element) => element.__clicks)).toEqual([
    { type: 'click', bubbles: true, trusted: true },
  ]);
});

test('button disabled attribute blocks activation and resumes after removal @interaction', async ({
  page,
  story,
}) => {
  await story.open('components-button--standard');
  const component = page.locator('scale-button');
  const button = page.getByRole('button', { name: 'Label' });
  await component.evaluate((element) => {
    window.scaleButtonClicks = [];
    element.addEventListener('click', (event) =>
      window.scaleButtonClicks.push(event.type)
    );
  });

  await component.evaluate((element) => element.setAttribute('disabled', ''));
  await expect(button).toBeDisabled();
  await page.keyboard.press('Tab');
  await expect(button).not.toBeFocused();
  await page.keyboard.press('Enter');
  await page.keyboard.press('Space');

  const bounds = await button.boundingBox();
  expect(bounds).not.toBeNull();
  await page.mouse.click(
    bounds.x + bounds.width / 2,
    bounds.y + bounds.height / 2
  );
  expect(await page.evaluate(() => window.scaleButtonClicks)).toEqual([]);

  await component.evaluate((element) => element.removeAttribute('disabled'));
  await expect(button).toBeEnabled();
  await button.focus();
  await page.keyboard.press('Enter');
  expect(await page.evaluate(() => window.scaleButtonClicks)).toEqual([
    'click',
  ]);

  const enabledBounds = await button.boundingBox();
  expect(enabledBounds).not.toBeNull();
  await page.mouse.click(
    enabledBounds.x + enabledBounds.width / 2,
    enabledBounds.y + enabledBounds.height / 2
  );
  expect(await page.evaluate(() => window.scaleButtonClicks)).toEqual([
    'click',
    'click',
  ]);
});

test('button activation submits its name and value through the parent form @interaction', async ({
  page,
  story,
}) => {
  await story.open('components-button--standard');
  const component = page.locator('scale-button');
  await component.evaluate((element) => {
    const form = document.createElement('form');
    form.setAttribute('aria-label', 'Button test form');
    element.type = 'submit';
    element.name = 'action';
    element.value = 'save';
    element.replaceWith(form);
    form.append(element);
    window.__submissions = [];
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      window.__submissions.push(
        new FormData(form, event.submitter).get('action')
      );
    });
  });

  const button = component.getByRole('button', { name: 'Label' });
  await button.focus();
  await page.keyboard.press('Enter');
  await expect
    .poll(() => page.evaluate(() => window.__submissions))
    .toEqual(['save']);
});
