const { test, expect } = require('./test-fixtures');

const watchRatingChanges = async (page, component) => {
  await page.evaluate(() => {
    window.ratingChanges = [];
  });
  await component.evaluate((element) => {
    element.addEventListener('scale-change', (event) => {
      window.ratingChanges.push(event.detail);
    });
  });
};

test('rating stars change by pointer and emit scale-change @interaction', async ({
  page,
  story,
}) => {
  await story.open('components-rating-stars--info-text-and-custom-label');
  const component = page.locator('scale-rating-stars');
  const slider = page.getByRole('slider', { name: 'Custom Rating Label' });
  await watchRatingChanges(page, component);

  await expect(component).toHaveJSProperty('rating', 3);
  await expect(slider).toHaveAttribute('aria-valuenow', '3');
  await component.locator('[part="star"]').nth(3).click();

  await expect(component).toHaveJSProperty('rating', 4);
  await expect(slider).toHaveAttribute('aria-valuenow', '4');
  await expect(slider).toHaveAttribute('aria-valuetext', '4 out of 5 stars');
  await expect
    .poll(() => page.evaluate(() => window.ratingChanges))
    .toEqual([{ value: 4 }]);
});

test('rating stars change with ArrowRight and emit scale-change @interaction', async ({
  page,
  story,
}) => {
  await story.open('components-rating-stars--info-text-and-custom-label');
  const component = page.locator('scale-rating-stars');
  const slider = page.getByRole('slider', { name: 'Custom Rating Label' });
  await watchRatingChanges(page, component);

  await slider.focus();
  await page.keyboard.press('ArrowRight');

  await expect(component).toHaveJSProperty('rating', 4);
  await expect(slider).toHaveAttribute('aria-valuenow', '4');
  await expect(slider).toHaveAttribute('aria-valuetext', '4 out of 5 stars');
  await expect
    .poll(() => page.evaluate(() => window.ratingChanges))
    .toEqual([{ value: 4 }]);
});

test('readonly rating stars block keyboard changes @interaction', async ({
  page,
  story,
}) => {
  await story.open('components-rating-stars--readonly');
  const component = page.locator('scale-rating-stars');
  const rating = page.getByRole('spinbutton', { name: 'Rating' });
  await watchRatingChanges(page, component);

  await expect(rating).toHaveAttribute('aria-readonly', 'true');
  await expect(rating).toHaveAttribute('aria-valuenow', '3');
  await rating.focus();
  await page.keyboard.press('ArrowUp');

  await expect(component).toHaveJSProperty('rating', 3);
  await expect(rating).toHaveAttribute('aria-valuenow', '3');
  await expect(rating).toHaveAttribute('aria-valuetext', '3 out of 5 stars');
  await expect
    .poll(() => page.evaluate(() => window.ratingChanges))
    .toEqual([]);
});
