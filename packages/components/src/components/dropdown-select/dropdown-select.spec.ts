import { newSpecPage } from '@stencil/core/testing';
import { DropdownSelect } from './dropdown-select';

describe('DropdownSelect', function () {
  it('should take options via slots', async () => {
    const page = await newSpecPage({
      components: [DropdownSelect],
      html: `
      <scale-dropdown-select>
        <scale-dropdown-select-item value="caspar">Caspar</scale-dropdown-select-item>
        <scale-dropdown-select-item value="cedric">Cedric</scale-dropdown-select-item>
        <scale-dropdown-select-item value="cem">Cem</scale-dropdown-select-item>
      </scale-dropdown-select>`,
    });

    const optionsEls = page.doc
      .querySelector('scale-dropdown-select')
      .shadowRoot.querySelectorAll('[role="option"]');
    const { id, textContent } = optionsEls[0];

    expect(optionsEls).toHaveLength(optionsEls.length);

    expect(id).toBe('caspar');
    expect(textContent).toBe('Caspar');
  });

  it('should render a label, helper-text, value', async () => {
    const [label, helperText] = ['My Select', 'Some info'];
    const page = await newSpecPage({
      components: [DropdownSelect],
      html: `
        <scale-dropdown-select label='${label}' helper-text='${helperText}' value="cedric">
            <scale-dropdown-select-item value="caspar">Caspar</scale-dropdown-select-item>
            <scale-dropdown-select-item value="cedric">Cedric</scale-dropdown-select-item>
            <scale-dropdown-select-item value="cem">Cem</scale-dropdown-select-item>
        </scale-dropdown-select>`,
    });

    const selectEl = page.doc.querySelector('scale-dropdown-select');

    const labelEl = selectEl.shadowRoot.querySelector('[part="label"]');
    const helperTextEl = selectEl.shadowRoot.querySelector(
      '[part="helper-text"]'
    );
    await page.waitForChanges();
    const comboboxEl = selectEl.shadowRoot.querySelector('#combobox');
    await page.waitForChanges();

    expect(labelEl.textContent).toBe(label);
    expect(helperTextEl.textContent).toBe(helperText);
    expect(comboboxEl.textContent).toBe('Cedric');
  });

  it('should be able to change it`s value via click and emit an event', async () => {
    const page = await newSpecPage({
      components: [DropdownSelect],
      html: `
        <scale-dropdown-select>
            <scale-dropdown-select-item value="caspar">Caspar</scale-dropdown-select-item>
            <scale-dropdown-select-item value="cedric">Cedric</scale-dropdown-select-item>
            <scale-dropdown-select-item value="cem">Cem</scale-dropdown-select-item>
        </scale-dropdown-select>`,
    });

    const changeSpy = jest.fn();

    const selectEl = page.doc.querySelector('scale-dropdown-select');
    selectEl.addEventListener('scale-change', changeSpy);
    const comboboxEl = selectEl.shadowRoot.querySelector('[part="combobox"]');
    comboboxEl.scrollIntoView = function () {};
    comboboxEl.focus = function () {};
    const optionsEls = selectEl.shadowRoot.querySelectorAll('[role="option"]');

    comboboxEl.click();
    optionsEls[2].click();

    await page.waitForChanges();

    expect(comboboxEl.textContent).toBe('Cem');
    expect(selectEl.value).toBe('cem');
    expect(changeSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        detail: { value: 'cem' },
      })
    );
  });
});
