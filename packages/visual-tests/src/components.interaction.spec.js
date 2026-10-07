const { test, expect } = require('./test-fixtures');

test('button activates with the keyboard @interaction', async ({
  page,
  story,
}) => {
  await story.open('components-button--standard');
  const component = page.locator('scale-button');
  const button = component.getByRole('button');
  await expect(button).toBeEnabled();
  await page.keyboard.press('Tab');
  await expect(button).toBeFocused();
  await component.evaluate((element) => {
    element.addEventListener(
      'click',
      () => element.setAttribute('data-activated', 'true'),
      { once: true }
    );
  });
  await page.keyboard.press('Space');
  await expect(component).toHaveAttribute('data-activated', 'true');
});

test('checkbox changes state @interaction', async ({ page, story }) => {
  await story.open('components-checkbox--standard');
  const component = page.locator('scale-checkbox');
  const checkbox = component.getByRole('checkbox');
  await expect(checkbox).not.toBeChecked();
  await component.locator('label').click();
  await expect(checkbox).toBeChecked();
});
