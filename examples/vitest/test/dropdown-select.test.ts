import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('Dropdown Select', () => {
  function getInsideComboboxContainer(): HTMLElement | null | undefined {
    return document.body
      .querySelector('scale-dropdown-select')
      ?.shadowRoot?.querySelector('[part="combobox-container"]');
  }

  beforeEach(async () => {
    document.body.innerHTML = `
<scale-dropdown-select>
  <scale-dropdown-select-item value="caspar">Caspar</scale-dropdown-select-item>
  <scale-dropdown-select-item value="cedric">Cedric</scale-dropdown-select-item>
  <scale-dropdown-select-item value="cem">Cem</scale-dropdown-select-item>
</scale-dropdown-select>
`;
    await new Promise<void>((resolve) => {
      const interval = setInterval(() => {
        if (getInsideComboboxContainer()) {
          clearInterval(interval);
          resolve();
        }
      });
    });
  });

  it('should dispatch scale-change event when selecting the first option', () => {
    const spyChange = vi.fn();

    document
      .querySelector('scale-dropdown-select')!
      .addEventListener('scale-change', spyChange);

    getInsideComboboxContainer().querySelector(
      `[part="combobox"]`
    ).scrollIntoView = vi.fn();
    getInsideComboboxContainer().querySelector(`[part="combobox"]`).click();
    getInsideComboboxContainer().querySelectorAll(`[role="option"]`)[0].click();

    expect(spyChange).toHaveBeenCalled();
    expect(spyChange.mock.lastCall[0].detail).toEqual(
      expect.objectContaining({ value: 'caspar' })
    );
  });
});
