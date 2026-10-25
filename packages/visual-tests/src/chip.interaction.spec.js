const { test, expect } = require('./test-fixtures');

test('persistent chip toggles with pointer and Space and emits scale-change @interaction', async ({
  page,
  story,
}) => {
  await story.open('components-chip--persistent-standard');

  const component = page.locator('scale-chip');
  const chip = page.getByRole('switch', { name: 'Label' });
  await component.evaluate((element) => {
    window.chipEvents = [];
    element.addEventListener('scale-change', (event) => {
      window.chipEvents.push({
        type: event.type,
        bubbles: event.bubbles,
        target: event.target.localName,
        detailType: event.detail.type,
        detailBubbles: event.detail.bubbles,
        detailCode: event.detail.code ?? null,
      });
    });
  });

  await expect(chip).toHaveAttribute('aria-checked', 'false');
  await chip.click();
  await expect(chip).toHaveAttribute('aria-checked', 'true');
  await expect
    .poll(() => page.evaluate(() => window.chipEvents))
    .toEqual([
      {
        type: 'scale-change',
        bubbles: true,
        target: 'scale-chip',
        detailType: 'click',
        detailBubbles: true,
        detailCode: null,
      },
    ]);

  await chip.focus();
  await expect(chip).toBeFocused();
  await page.keyboard.press('Space');
  await expect(chip).toHaveAttribute('aria-checked', 'false');
  await expect
    .poll(() => page.evaluate(() => window.chipEvents))
    .toEqual([
      {
        type: 'scale-change',
        bubbles: true,
        target: 'scale-chip',
        detailType: 'click',
        detailBubbles: true,
        detailCode: null,
      },
      {
        type: 'scale-change',
        bubbles: true,
        target: 'scale-chip',
        detailType: 'keydown',
        detailBubbles: true,
        detailCode: 'Space',
      },
    ]);
});

test('selected dynamic chip dismiss button emits scale-close without removing the chip @interaction', async ({
  page,
  story,
}) => {
  await story.open('components-chip--dynamic-selection-standard');

  const component = page.locator('scale-chip');
  const chip = page.getByRole('switch', { name: 'Label' });
  const dismissButton = page.getByRole('button', { name: 'dismiss' });
  await component.evaluate((element) => {
    window.chipEvents = [];
    element.addEventListener('scale-close', (event) => {
      window.chipEvents.push({
        type: event.type,
        bubbles: event.bubbles,
        target: event.target.localName,
        detailType: event.detail.type,
        detailBubbles: event.detail.bubbles,
      });
    });
  });

  await expect(chip).toHaveAttribute('aria-checked', 'true');
  await expect(dismissButton).toBeVisible();
  await dismissButton.click();

  await expect
    .poll(() => page.evaluate(() => window.chipEvents))
    .toEqual([
      {
        type: 'scale-close',
        bubbles: true,
        target: 'scale-chip',
        detailType: 'click',
        detailBubbles: true,
      },
    ]);
  await expect(chip).toBeVisible();
  await expect(chip).toHaveAttribute('aria-checked', 'true');
  await expect(dismissButton).toBeVisible();
});
