const { test, expect } = require('./test-fixtures');

test('standard accordion supports multiple open panels and collapse @interaction', async ({
  page,
  story,
}) => {
  await story.open('components-accordion--standard');
  const firstHeading = 'Leo integer malesuada nunc vel risus';
  const secondHeading = 'Dolor purus non enim';
  const firstButton = page.getByRole('button', { name: firstHeading });
  const secondButton = page.getByRole('button', { name: secondHeading });
  const firstPanel = page.getByRole('region', {
    name: firstHeading,
    includeHidden: true,
  });
  const secondPanel = page.getByRole('region', {
    name: secondHeading,
    includeHidden: true,
  });

  await expect(firstButton).toHaveAttribute('aria-expanded', 'false');
  await expect(secondButton).toHaveAttribute('aria-expanded', 'false');
  await expect(firstPanel).toBeHidden();
  await expect(secondPanel).toBeHidden();

  await firstButton.click();
  await expect(firstButton).toHaveAttribute('aria-expanded', 'true');
  await expect(firstPanel).toBeVisible();

  await secondButton.click();
  await expect(firstButton).toHaveAttribute('aria-expanded', 'true');
  await expect(secondButton).toHaveAttribute('aria-expanded', 'true');
  await expect(firstPanel).toBeVisible();
  await expect(secondPanel).toBeVisible();

  await firstButton.click();
  await expect(firstButton).toHaveAttribute('aria-expanded', 'false');
  await expect(firstPanel).toBeHidden();
  await expect(secondButton).toHaveAttribute('aria-expanded', 'true');
  await expect(secondPanel).toBeVisible();
});

test('accordion buttons open and close panels with keyboard activation @interaction', async ({
  page,
  story,
}) => {
  await story.open('components-accordion--standard');
  const heading = 'Leo integer malesuada nunc vel risus';
  const button = page.getByRole('button', { name: heading });
  const panel = page.getByRole('region', {
    name: heading,
    includeHidden: true,
  });

  await expect(button).toHaveAttribute('aria-expanded', 'false');
  await expect(panel).toBeHidden();

  await page.keyboard.press('Tab');
  await expect(button).toBeFocused();
  await page.keyboard.press('Space');
  await expect(button).toHaveAttribute('aria-expanded', 'true');
  await expect(panel).toBeVisible();

  await page.keyboard.press('Enter');
  await expect(button).toHaveAttribute('aria-expanded', 'false');
  await expect(panel).toBeHidden();
});

test('dependent accordion keeps only the newly selected panel open @interaction', async ({
  page,
  story,
}) => {
  await story.open('components-accordion--dependent');
  const firstHeading = 'Leo integer malesuada nunc vel risus';
  const secondHeading = 'Dolor purus non enim';
  const firstButton = page.getByRole('button', { name: firstHeading });
  const secondButton = page.getByRole('button', { name: secondHeading });
  const firstPanel = page.getByRole('region', {
    name: firstHeading,
    includeHidden: true,
  });
  const secondPanel = page.getByRole('region', {
    name: secondHeading,
    includeHidden: true,
  });

  await firstButton.click();
  await expect(firstButton).toHaveAttribute('aria-expanded', 'true');
  await expect(firstPanel).toBeVisible();
  await expect(secondButton).toHaveAttribute('aria-expanded', 'false');
  await expect(secondPanel).toBeHidden();

  await secondButton.click();
  await expect(firstButton).toHaveAttribute('aria-expanded', 'false');
  await expect(firstPanel).toBeHidden();
  await expect(secondButton).toHaveAttribute('aria-expanded', 'true');
  await expect(secondPanel).toBeVisible();
});
