import { newSpecPage } from '@stencil/core/testing';
import { Combobox } from './combobox';

jest.mock('@floating-ui/dom', () => ({
  computePosition: jest.fn().mockResolvedValue({ x: 0, y: 0 }),
  flip: jest.fn(),
}));

describe('Combobox', () => {
  describe('snapshots', () => {
    it('should match default snapshot', async () => {
      const page = await newSpecPage({
        components: [Combobox],
        html: `<scale-combobox></scale-combobox>`,
      });

      expect(page.root).toMatchSnapshot();
    });

    it('should match snapshot with label, helper text and invalid state', async () => {
      const page = await newSpecPage({
        components: [Combobox],
        html: `<scale-combobox label="Framework" helper-text="Please choose" invalid="true"></scale-combobox>`,
      });

      expect(page.root).toMatchSnapshot();
    });
  });

  describe('props', () => {
    it('should have expected default props', async () => {
      const page = await newSpecPage({
        components: [Combobox],
        html: `<scale-combobox></scale-combobox>`,
      });

      expect(page.rootInstance.label).toBe('');
      expect(page.rootInstance.placeholder).toBe('');
      expect(page.rootInstance.options).toEqual([]);
      expect(page.rootInstance.value).toBe('');
      expect(page.rootInstance.disabled).toBe(false);
      expect(page.rootInstance.allowCustom).toBe(false);
      expect(page.rootInstance.helperText).toBe('');
      expect(page.rootInstance.invalid).toBe(false);
      expect(page.rootInstance.inputValue).toBe('');
    });

    it('should handle props being set and keep input value synced with value', async () => {
      const page = await newSpecPage({
        components: [Combobox],
        html: `<scale-combobox></scale-combobox>`,
      });

      page.root.label = 'My Label';
      page.root.placeholder = 'Select value';
      page.root.options = ['React', 'Vue'];
      page.root.value = 'Vue';
      page.root.disabled = true;
      page.root.allowCustom = true;
      page.root.helperText = 'Helpful info';
      page.root.invalid = true;
      await page.waitForChanges();

      expect(page.rootInstance.label).toBe('My Label');
      expect(page.rootInstance.placeholder).toBe('Select value');
      expect(page.rootInstance.options).toEqual(['React', 'Vue']);
      expect(page.rootInstance.value).toBe('Vue');
      expect(page.rootInstance.inputValue).toBe('Vue');
      expect(page.rootInstance.disabled).toBe(true);
      expect(page.rootInstance.allowCustom).toBe(true);
      expect(page.rootInstance.helperText).toBe('Helpful info');
      expect(page.rootInstance.invalid).toBe(true);
    });
  });

  describe('functions and interactions', () => {
    it('should filter options on input and open listbox', async () => {
      const page = await newSpecPage({
        components: [Combobox],
        html: `<scale-combobox></scale-combobox>`,
      });

      page.root.options = ['React', 'Vue', 'Angular'];
      await page.waitForChanges();

      const input = page.root.shadowRoot.querySelector(
        '.combobox-input'
      ) as HTMLInputElement;

      input.dispatchEvent(new Event('focus'));
      input.value = 're';
      input.dispatchEvent(new Event('input'));
      await page.waitForChanges();

      const options = page.root.shadowRoot.querySelectorAll('.combobox-option');

      expect(page.rootInstance.isOpen).toBe(true);
      expect(options.length).toBe(1);
      expect(options[0].textContent).toBe('React');
    });

    it('should apply custom filter function', async () => {
      const page = await newSpecPage({
        components: [Combobox],
        html: `<scale-combobox></scale-combobox>`,
      });

      page.root.options = ['test', 'estt', 'stte'];
      page.root.filterFunction = (option, query) =>
        option.toLowerCase().startsWith(query.toLowerCase());
      await page.waitForChanges();

      const input = page.root.shadowRoot.querySelector(
        '.combobox-input'
      ) as HTMLInputElement;

      input.dispatchEvent(new Event('focus'));
      input.value = 'st';
      input.dispatchEvent(new Event('input'));
      await page.waitForChanges();

      const options = page.root.shadowRoot.querySelectorAll('.combobox-option');

      expect(options.length).toBe(1);
      expect(options[0].textContent).toBe('stte');
    });

    it('should select highlighted option with keyboard enter', async () => {
      const page = await newSpecPage({
        components: [Combobox],
        html: `<scale-combobox></scale-combobox>`,
      });

      page.root.options = ['React', 'Vue'];
      await page.waitForChanges();

      const input = page.root.shadowRoot.querySelector(
        '.combobox-input'
      ) as HTMLInputElement;

      input.dispatchEvent(new Event('focus'));
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      await page.waitForChanges();

      expect(page.root.value).toBe('React');
      expect(page.rootInstance.isOpen).toBe(false);
    });

    it('should close listbox on escape', async () => {
      const page = await newSpecPage({
        components: [Combobox],
        html: `<scale-combobox></scale-combobox>`,
      });

      page.root.options = ['React', 'Vue'];
      await page.waitForChanges();

      const input = page.root.shadowRoot.querySelector(
        '.combobox-input'
      ) as HTMLInputElement;

      input.dispatchEvent(new Event('focus'));
      await page.waitForChanges();
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      await page.waitForChanges();

      expect(page.rootInstance.isOpen).toBe(false);
    });
  });

  describe('events', () => {
    it('should emit scale-change on option mousedown', async () => {
      const page = await newSpecPage({
        components: [Combobox],
        html: `<scale-combobox></scale-combobox>`,
      });
      const mock = jest.fn();
      page.root.addEventListener('scale-change', mock);

      page.root.options = ['React', 'Vue'];
      await page.waitForChanges();

      const input = page.root.shadowRoot.querySelector(
        '.combobox-input'
      ) as HTMLInputElement;
      input.dispatchEvent(new Event('focus'));
      await page.waitForChanges();

      const option = page.root.shadowRoot.querySelector(
        '.combobox-option'
      ) as HTMLElement;
      option.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
      await page.waitForChanges();

      expect(page.root.value).toBe('React');
      expect(mock).toHaveBeenCalledWith(
        expect.objectContaining({ detail: { value: 'React' } })
      );
    });

    it('should emit scale-change for custom value when allow-custom is true', async () => {
      const page = await newSpecPage({
        components: [Combobox],
        html: `<scale-combobox allow-custom="true"></scale-combobox>`,
      });
      const mock = jest.fn();
      page.root.addEventListener('scale-change', mock);

      const input = page.root.shadowRoot.querySelector(
        '.combobox-input'
      ) as HTMLInputElement;
      input.dispatchEvent(new Event('focus'));
      await page.waitForChanges();

      input.value = 'Custom Value';
      input.dispatchEvent(new Event('input'));
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      await page.waitForChanges();

      expect(page.root.value).toBe('Custom Value');
      expect(mock).toHaveBeenCalledWith(
        expect.objectContaining({ detail: { value: 'Custom Value' } })
      );
    });

    it('should not emit custom value when allow-custom is false and no option highlighted', async () => {
      const page = await newSpecPage({
        components: [Combobox],
        html: `<scale-combobox></scale-combobox>`,
      });
      const mock = jest.fn();
      page.root.addEventListener('scale-change', mock);

      page.root.options = ['React', 'Vue'];
      await page.waitForChanges();

      const input = page.root.shadowRoot.querySelector(
        '.combobox-input'
      ) as HTMLInputElement;
      input.dispatchEvent(new Event('focus'));
      input.value = 'Custom Value';
      input.dispatchEvent(new Event('input'));
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      await page.waitForChanges();

      expect(page.root.value).toBe('');
      expect(mock).not.toHaveBeenCalled();
    });
  });
});
