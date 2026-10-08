const { test, expect } = require('./test-fixtures');

async function openStory(page, story, variant) {
  await story.open(`components-segmented-button--${variant}`);
  await page.locator('scale-segmented-button').evaluate(async (group) => {
    const replacement = group.cloneNode(true);
    for (const element of replacement.querySelectorAll('*')) {
      if (element.localName.startsWith('scale-icon-')) {
        element.replaceChildren();
      }
    }
    for (const property of [
      'size',
      'multiSelect',
      'disabled',
      'fullWidth',
      'invalid',
      'helperText',
      'label',
      'ariaLabelTranslation',
    ]) {
      replacement[property] = group[property];
    }
    group.replaceWith(replacement);
    const ready = async (element) => {
      if (element.componentOnReady) await element.componentOnReady();
      await Promise.all(
        [...element.children, ...(element.shadowRoot?.children || [])].map(
          ready
        )
      );
    };
    await ready(replacement);
  });
}

async function listenForChange(page, component) {
  let resolveChange;
  const change = new Promise((resolve) => {
    resolveChange = resolve;
  });

  await page.exposeFunction('captureSegmentedButtonChange', (segments) => {
    resolveChange(segments);
  });
  await component.evaluate((element) => {
    element.addEventListener(
      'scale-change',
      (event) => {
        window.captureSegmentedButtonChange(
          event.detail.segments.map((segment) => ({
            label: segment.textContent.trim(),
            selected: segment.selected,
          }))
        );
      },
      { once: true }
    );
  });

  return { change };
}

test('selecting a segment clears the previous selection and emits its detail @interaction', async ({
  page,
  story,
}) => {
  await openStory(page, story, 'standard');
  const component = page.locator('scale-segmented-button');
  const group = component.getByRole('group', { name: 'segment button with 4' });
  const buttons = component.locator('scale-segment button');
  const apple = buttons.nth(0);
  const samsung = buttons.nth(2);
  await expect(group).toBeVisible();
  const { change } = await listenForChange(page, component);

  await samsung.click();

  await expect(component.locator('scale-segment').nth(2)).toHaveJSProperty(
    'selected',
    true
  );
  await expect(component.locator('scale-segment').nth(0)).toHaveJSProperty(
    'selected',
    false
  );
  await expect(
    component.locator('scale-segment button[part~="selected"]')
  ).toHaveCount(1);
  await expect
    .poll(() => change)
    .toEqual([
      { label: 'Apple', selected: false },
      { label: 'One+', selected: false },
      { label: 'Samsung', selected: true },
      { label: 'Huawei', selected: false },
    ]);
});

test('keyboard skips a disabled segment and disabled pointer input leaves selection unchanged @interaction', async ({
  page,
  story,
}) => {
  await openStory(page, story, 'disabled-segment');
  const component = page.locator('scale-segmented-button');
  const group = component.getByRole('group', { name: 'segment button with 4' });
  const buttons = component.locator('scale-segment button');
  const apple = buttons.nth(0);
  const onePlus = buttons.nth(1);
  await expect(group).toBeVisible();
  const { change } = await listenForChange(page, component);

  await expect(apple).toBeDisabled();
  await page.keyboard.press('Tab');
  await expect(onePlus).toBeFocused();
  await page.keyboard.press('Space');

  await expect(component.locator('scale-segment').nth(1)).toHaveJSProperty(
    'selected',
    true
  );
  await expect(component.locator('scale-segment').nth(0)).toHaveJSProperty(
    'selected',
    false
  );
  await expect
    .poll(() => change)
    .toEqual([
      { label: 'Apple', selected: false },
      { label: 'One+', selected: true },
      { label: 'Samsung', selected: false },
      { label: 'Huawei', selected: false },
    ]);

  const bounds = await apple.boundingBox();
  expect(bounds.width).toBeGreaterThan(0);
  expect(bounds.height).toBeGreaterThan(0);
  await page.mouse.click(
    bounds.x + bounds.width / 2,
    bounds.y + bounds.height / 2
  );
  await expect(component.locator('scale-segment').nth(1)).toHaveJSProperty(
    'selected',
    true
  );
  await expect(apple).toBeDisabled();
});
