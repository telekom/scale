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

test('dependent accordion applies single-open behavior to a live slotted panel @interaction', async ({
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

  const addedHeading = 'Runtime-added panel';
  await page.evaluate(async (heading) => {
    await customElements.whenDefined('scale-collapsible');
    const collapsible = document.createElement('scale-collapsible');
    const headingElement = document.createElement('span');
    headingElement.slot = 'heading';
    headingElement.textContent = heading;
    const content = document.createElement('p');
    content.textContent = 'Runtime-added panel content';
    collapsible.append(headingElement, content);
    document.querySelector('scale-accordion').append(collapsible);
    await collapsible.componentOnReady();
  }, addedHeading);

  const addedButton = page.getByRole('button', { name: addedHeading });
  const addedPanel = page.getByRole('region', {
    name: addedHeading,
    includeHidden: true,
  });
  const addedCollapsible = page
    .locator('scale-accordion > scale-collapsible')
    .filter({ hasText: addedHeading });
  await expect(addedButton).toHaveAttribute('aria-expanded', 'false');
  await addedButton.click();
  await expect(addedButton).toHaveAttribute('aria-expanded', 'true');
  await expect(addedPanel).toBeVisible();
  await expect(firstButton).toHaveAttribute('aria-expanded', 'false');
  await expect(firstPanel).toBeHidden();

  await addedCollapsible.evaluate((element) => element.remove());
  await expect(addedButton).toHaveCount(0);
  await expect(addedPanel).toHaveCount(0);

  await secondButton.click();
  await expect(firstButton).toHaveAttribute('aria-expanded', 'false');
  await expect(firstPanel).toBeHidden();
  await expect(secondButton).toHaveAttribute('aria-expanded', 'true');
  await expect(secondPanel).toBeVisible();
});
