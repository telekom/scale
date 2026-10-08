const { test, expect } = require('./test-fixtures');

test('slider changes by keyboard increments and emits scale-change values @interaction', async ({
  page,
  story,
}) => {
  await story.open('components-slider--standard');
  const component = page.locator('scale-slider');
  const slider = page.getByRole('slider', { name: 'Standard' });
  const changes = [];
  await page.exposeFunction('recordSliderChange', (value) =>
    changes.push(value)
  );
  await component.evaluate((element) =>
    element.addEventListener('scale-change', (event) =>
      window.recordSliderChange(event.detail)
    )
  );

  await expect(slider).toHaveAttribute('aria-valuenow', '42');
  await slider.focus();
  await expect(slider).toBeFocused();

  await page.keyboard.press('ArrowRight');
  await expect(slider).toHaveAttribute('aria-valuenow', '43');
  await expect(component).toHaveAttribute('value', '43');
  await expect.poll(() => changes).toEqual([43]);

  await page.keyboard.press('ArrowUp');
  await expect(slider).toHaveAttribute('aria-valuenow', '53');
  await expect(component).toHaveAttribute('value', '53');
  await expect.poll(() => changes).toEqual([43, 53]);
});

test('slider arrow keys clamp at the minimum and maximum @interaction', async ({
  page,
  story,
}) => {
  await story.open('components-slider--standard');
  const component = page.locator('scale-slider');
  const slider = page.getByRole('slider', { name: 'Standard' });
  const changes = [];
  await page.exposeFunction('recordSliderChange', (value) =>
    changes.push(value)
  );
  await component.evaluate((element) =>
    element.addEventListener('scale-change', (event) =>
      window.recordSliderChange(event.detail)
    )
  );

  await slider.focus();
  for (let step = 0; step < 11; step += 1) await page.keyboard.press('ArrowUp');
  await expect(slider).toHaveAttribute('aria-valuenow', '100');
  await expect(component).toHaveAttribute('value', '100');
  await expect.poll(() => changes.at(-1)).toBe(100);
  for (let step = 0; step < 11; step += 1)
    await page.keyboard.press('ArrowDown');
  await expect(slider).toHaveAttribute('aria-valuenow', '0');
  await expect(component).toHaveAttribute('value', '0');
  await expect.poll(() => changes.at(-1)).toBe(0);
});

test('disabled slider ignores pointer changes @interaction', async ({
  page,
  story,
}) => {
  await story.open('components-slider--disabled');
  const component = page.locator('scale-slider');
  const track = component.locator('[part="track"]');
  const changes = [];
  await page.exposeFunction('recordSliderChange', (value) =>
    changes.push(value)
  );
  await component.evaluate((element) =>
    element.addEventListener('scale-change', (event) =>
      window.recordSliderChange(event.detail)
    )
  );

  await expect(component).toHaveAttribute('value', '13');
  const bounds = await track.boundingBox();
  expect(bounds).not.toBeNull();
  await page.mouse.click(
    bounds.x + bounds.width / 2,
    bounds.y + bounds.height / 2
  );
  await expect(component).toHaveAttribute('value', '13');
  await expect.poll(() => changes).toEqual([]);
});
