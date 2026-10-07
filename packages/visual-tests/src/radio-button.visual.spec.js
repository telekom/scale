const { test, expect } = require('./test-fixtures');

const openRadioButton = async (page, story, variant) => {
  await story.open('components-radio-button-group--standard');
  await page.evaluate(async (variant) => {
    const radio = document.createElement('scale-radio-button');
    Object.assign(radio, {
      inputId: 'radio-button',
      name: 'radio-button',
      value: '0',
      label: 'Radio Label',
      checked: variant.startsWith('selected'),
      disabled: variant.endsWith('disabled'),
      invalid: variant === 'error',
      helperText:
        variant === 'helper-text'
          ? 'Helper text'
          : variant === 'error'
            ? 'Error message'
            : '',
    });
    document.querySelector('#root, #storybook-root').replaceChildren(radio);
    await radio.componentOnReady();
  }, variant);
  if (variant === 'helper-text' || variant === 'error') {
    await expect(
      page.locator('scale-radio-button .radio-button__helper-text')
    ).toHaveText(variant === 'error' ? 'Error message' : 'Helper text');
    await page
      .locator(
        'scale-radio-button scale-icon-alert-information, scale-radio-button scale-icon-alert-error'
      )
      .evaluate(async (icon) => {
        await icon.componentOnReady();
      });
  }
};

test.describe('RadioButton', () => {
  for (const [variant] of [
    ['standard'],
    ['standard-disabled'],
    ['selected'],
    ['selected-disabled'],
    ['helper-text'],
    ['error'],
  ]) {
    test(`${variant}`, async ({ page, story }) => {
      await openRadioButton(page, story, variant);
      const radioButton = page.locator('scale-radio-button').getByRole('radio');
      const selected = variant.startsWith('selected');
      await expect(radioButton).toBeChecked({ checked: selected });
      if (variant.endsWith('disabled')) {
        await expect(radioButton).toBeDisabled();
        await page.locator('scale-radio-button label').hover();
        await page.mouse.down();
        try {
          await expect(radioButton).toBeChecked({ checked: selected });
        } finally {
          await page.mouse.up();
        }
        await expect(radioButton).toBeChecked({ checked: selected });
        await expect(radioButton).not.toBeFocused();
        await page.mouse.move(0, 0);
      } else {
        await expect(radioButton).toBeEnabled();
      }
      await story.screenshot('default.png');
    });
  }
  for (const [variant] of [['standard'], ['selected']]) {
    test(`${variant} states`, async ({ page, story }) => {
      await openRadioButton(page, story, variant);
      const radioButton = page.locator('scale-radio-button').getByRole('radio');
      await expect(radioButton).toBeEnabled();
      await expect(radioButton).toBeChecked({
        checked: variant === 'selected',
      });
      await radioButton.focus();
      await expect(radioButton).toBeFocused();
      await story.screenshot('focus.png');
      await radioButton.hover();
      await story.screenshot('hover.png');
      await page.mouse.down();
      try {
        await expect
          .poll(() =>
            radioButton.evaluate((element) => element.matches(':active'))
          )
          .toBe(true);
        await story.screenshot('active.png');
      } finally {
        await page.mouse.up();
      }
      await expect(radioButton).toBeChecked();
      await expect(radioButton).toBeFocused();
    });
  }
});
