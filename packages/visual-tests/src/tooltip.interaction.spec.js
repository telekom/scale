const { test, expect } = require('./test-fixtures');

test('tooltip opens on hover and closes when the pointer leaves @interaction', async ({
  page,
  story,
}) => {
  await story.open('components-tooltip--standard');
  const button = page.getByRole('button', { name: 'Hover me' });
  const tooltip = page.getByRole('tooltip', { includeHidden: true });

  await expect(tooltip).toHaveAttribute('aria-hidden', 'true');
  await button.hover();
  await expect(tooltip).toHaveAttribute('aria-hidden', 'false');
  await expect(page.getByRole('tooltip')).toBeVisible();
  await expect(page.getByRole('tooltip')).toHaveText('Tooltip');

  await page.mouse.move(0, 0);
  await expect(tooltip).toHaveAttribute('aria-hidden', 'true');
  await expect(page.getByRole('tooltip')).toHaveCount(0);
});

test('keyboard focus opens tooltip; blur and Escape close it @interaction', async ({
  page,
  story,
}) => {
  await story.open('components-tooltip--trigger');
  const button = page.getByRole('button', { name: 'Focus me' });
  const tooltip = page.getByRole('tooltip', { includeHidden: true });

  await page.keyboard.press('Tab');
  await expect(button).toBeFocused();
  await expect(tooltip).toHaveAttribute('aria-hidden', 'false');
  await expect(page.getByRole('tooltip')).toBeVisible();
  await expect(page.getByRole('tooltip')).toHaveText('Tooltip');

  await page.keyboard.press('Tab');
  await expect(button).not.toBeFocused();
  await expect(tooltip).toHaveAttribute('aria-hidden', 'true');

  await button.focus();
  await expect(tooltip).toHaveAttribute('aria-hidden', 'false');
  await page.keyboard.press('Escape');
  await expect(tooltip).toHaveAttribute('aria-hidden', 'true');
});
