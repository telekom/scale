const { test, expect } = require('./test-fixtures');

test.use({ launchOptions: { args: ['--disable-lcd-text'] } });

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

async function expectSelection(buttons, selected) {
  await expect(buttons).toHaveCount(4);
  for (let index = 0; index < 4; index += 1) {
    const button = buttons.nth(index);
    if (selected.includes(index)) {
      await expect(button).toHaveClass(/\bsegment--selected\b/);
    } else {
      await expect(button).not.toHaveClass(/\bsegment--selected\b/);
    }
    await expect(button).toHaveAttribute(
      'aria-description',
      `${index} ${selected.includes(index) ? 'selected' : 'deselected'}`
    );
  }
}

async function clickDisabled(page, button) {
  await expect(button).toBeVisible();
  await expect(button).toBeDisabled();
  const bounds = await button.boundingBox();
  expect(bounds.width).toBeGreaterThan(0);
  expect(bounds.height).toBeGreaterThan(0);
  await page.mouse.click(
    bounds.x + bounds.width / 2,
    bounds.y + bounds.height / 2
  );
}

test.describe('SegmentedButton', () => {
  for (const variant of ['standard', 'icon-only', 'icon-and-text']) {
    test(variant, async ({ page, story }) => {
      await openStory(page, story, variant);
      const group = page.locator('scale-segmented-button');
      const buttons = group.locator('scale-segment button');
      await expect(group.getByRole('group')).toBeVisible();
      await expectSelection(buttons, [0]);
      await story.screenshot('default.png');

      await buttons.nth(1).click();
      await expectSelection(buttons, [1]);
      await story.screenshot('selected.png');

      await page.keyboard.press('Tab');
      await expect(buttons.nth(2)).toBeFocused();
      await page.keyboard.press('Space');
      await expectSelection(buttons, [2]);
      await story.screenshot('keyboard-selected.png');

      await page.keyboard.press('Enter');
      await expectSelection(buttons, [2]);
    });
  }

  test('multi-select', async ({ page, story }) => {
    await openStory(page, story, 'multi-select');
    const segments = page.locator('scale-segmented-button scale-segment');
    const buttons = segments.locator('button');
    await expectSelection(buttons, [0, 1]);
    await story.screenshot('default.png');

    await buttons.nth(2).click();
    await expectSelection(buttons, [0, 1, 2]);
    await expect(segments.nth(1)).toHaveAttribute(
      'adjacent-siblings',
      'left right'
    );
    await story.screenshot('adjacent-selected.png');

    await buttons.nth(1).click();
    await expectSelection(buttons, [0, 2]);
    await story.screenshot('deselected.png');

    await page.keyboard.press('Tab');
    await expect(buttons.nth(2)).toBeFocused();
    await page.keyboard.press('Space');
    await expectSelection(buttons, [0]);
    await page.keyboard.press('Enter');
    await expectSelection(buttons, [0, 2]);
    await story.screenshot('keyboard-selected.png');
  });

  test('disabled-segment', async ({ page, story }) => {
    await openStory(page, story, 'disabled-segment');
    const buttons = page.locator('scale-segmented-button scale-segment button');
    await expectSelection(buttons, []);
    await expect(buttons.nth(0)).toBeDisabled();
    await expect(buttons.nth(1)).toBeEnabled();
    await story.screenshot('default.png');

    await buttons.nth(2).click();
    await expectSelection(buttons, [2]);
    await clickDisabled(page, buttons.nth(0));
    await expectSelection(buttons, [2]);

    await buttons.nth(1).click();
    await expectSelection(buttons, [1]);
    await page.keyboard.press('Shift+Tab');
    await expect(buttons.nth(0)).not.toBeFocused();
    await page.keyboard.press('Space');
    await expectSelection(buttons, [1]);
    await story.screenshot('disabled-unchanged.png');
  });

  test('disabled-button', async ({ page, story }) => {
    await openStory(page, story, 'disabled-button');
    const buttons = page.locator('scale-segmented-button scale-segment button');
    await expectSelection(buttons, [1]);
    for (const button of await buttons.all()) {
      await clickDisabled(page, button);
      await expectSelection(buttons, [1]);
    }
    await page.keyboard.press('Tab');
    for (const button of await buttons.all()) {
      await expect(button).not.toBeFocused();
    }
    await page.keyboard.press('Space');
    await page.keyboard.press('Enter');
    await expectSelection(buttons, [1]);
    await story.screenshot('default.png');
  });

  test('invalid', async ({ page, story }) => {
    await openStory(page, story, 'invalid');
    const group = page.locator('scale-segmented-button');
    const buttons = group.locator('scale-segment button');
    const helper = group.locator('scale-helper-text');
    await expectSelection(buttons, []);
    await expect(helper).toBeVisible();
    await expect(helper).toContainText('Please select an option');
    await story.screenshot('default.png');

    await page.keyboard.press('Tab');
    await expect(buttons.nth(0)).toBeFocused();
    await page.keyboard.press('Enter');
    await expectSelection(buttons, [0]);
    await expect(helper).toHaveCount(0);
    await story.screenshot('valid-selection.png');
  });
});
