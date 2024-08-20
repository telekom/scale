import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';
import { DropdownSelect } from './dropdown-select';

describe('DropdownSelect', function() {
  it('should be able to change it`s value via keyboard nav', async () => {
    const page = await newE2EPage({
      components: [DropdownSelect],
      html: `
      <scale-dropdown-select>
        <scale-dropdown-select-item value="caspar">Caspar</scale-dropdown-select-item>
        <scale-dropdown-select-item value="cedric">Cedric</scale-dropdown-select-item>
        <scale-dropdown-select-item value="cem">Cem</scale-dropdown-select-item>
      </scale-dropdown-select>`,
    });

    const selectEl = await page.find('scale-dropdown-select');
    const comboboxEl = await page.find(
      'scale-dropdown-select >>> [part="combobox"]'
    );

    await page.keyboard.down('Tab');
    await page.keyboard.down('Enter');
    await page.keyboard.down('ArrowDown');
    await page.keyboard.down('ArrowDown');
    await page.keyboard.down('ArrowDown');
    await page.keyboard.down('Enter');
    await page.waitForChanges();

    expect(comboboxEl).toEqualText('Cem');
    expect(selectEl).toEqualAttribute('value', 'cem');
  });
  it('should be able to change it`s value via typing', async () => {
    const page = await newE2EPage({
      components: [DropdownSelect],
      html: `
      <scale-dropdown-select>
        <scale-dropdown-select-item value="caspar">Caspar</scale-dropdown-select-item>
        <scale-dropdown-select-item value="cedric">Cedric</scale-dropdown-select-item>
        <scale-dropdown-select-item value="cem">Cem</scale-dropdown-select-item>
      </scale-dropdown-select>`,
    });

    const selectEl = await page.find('scale-dropdown-select');
    const comboboxEl = await page.find(
      'scale-dropdown-select >>> [part="combobox"]'
    );

    await page.keyboard.down('Tab');
    await page.keyboard.down('Enter');
    await page.keyboard.down('c');
    await page.keyboard.down('e');
    await page.keyboard.down('d');
    await page.keyboard.down('r');
    await page.keyboard.down('i');
    await page.keyboard.down('c');
    await page.keyboard.down('Enter');
    await page.waitForChanges();

    expect(comboboxEl).toEqualText('Cedric');
    expect(selectEl).toEqualAttribute('value', 'cedric');
  });

  describe('when contains some disabled options', () => {
    let page: E2EPage;
    let selectEl: E2EElement;
    let comboboxEl: E2EElement;

    beforeEach(async () => {
      page = await newE2EPage({
        components: [DropdownSelect],
        html: `
        <scale-dropdown-select>
          <scale-dropdown-select-item value="adam">Adam</scale-dropdown-select-item>
          <scale-dropdown-select-item value="cedrik" disabled>Cedrik</scale-dropdown-select-item>
          <scale-dropdown-select-item value="cedric" disabled>Cedric</scale-dropdown-select-item>
          <scale-dropdown-select-item value="cem">Cem</scale-dropdown-select-item>
          <scale-dropdown-select-item value="chris">Chris</scale-dropdown-select-item>
          <scale-dropdown-select-item value="christian">Christian</scale-dropdown-select-item>
          <scale-dropdown-select-item value="christiano">Christiano</scale-dropdown-select-item>
        </scale-dropdown-select>`,
      });

      selectEl = await page.find('scale-dropdown-select');
      comboboxEl = await page.find(
        'scale-dropdown-select >>> [part="combobox"]'
      );
    });

    it('should skip disabled options when navigating with keyboard', async () => {
      await page.keyboard.down('Tab');
      await page.keyboard.down('Enter');
      await page.keyboard.down('ArrowDown');
      await page.keyboard.down('ArrowDown');
      await page.keyboard.down('Enter');
      await page.waitForChanges();

      // should skip Cedrik and Cedric
      expect(comboboxEl).toEqualText('Cem');
      expect(selectEl).toEqualAttribute('value', 'cem');
    });

    it('should skip disabled options when typing', async () => {
      await page.keyboard.down('Tab');
      await page.keyboard.down('Enter');
      await page.keyboard.down('c');
      await page.keyboard.down('e');
      await page.keyboard.down('Enter');
      await page.waitForChanges();

      expect(comboboxEl).toEqualText('Cem');
      expect(selectEl).toEqualAttribute('value', 'cem');
    });
  });

  describe('when ALL options are disabled', () => {
    let page: E2EPage;
    let selectEl: E2EElement;
    let comboboxEl: E2EElement;

    beforeEach(async () => {
      page = await newE2EPage({
        components: [DropdownSelect],
        html: `
        <scale-dropdown-select value="default">
          <scale-dropdown-select-item disabled value="adam">Adam</scale-dropdown-select-item>
          <scale-dropdown-select-item disabled value="cedrik">Cedrik</scale-dropdown-select-item>
          <scale-dropdown-select-item disabled value="cedric">Cedric</scale-dropdown-select-item>
          <scale-dropdown-select-item disabled value="cem">Cem</scale-dropdown-select-item>
          <scale-dropdown-select-item disabled value="chris">Chris</scale-dropdown-select-item>
          <scale-dropdown-select-item disabled value="christian">Christian</scale-dropdown-select-item>
          <scale-dropdown-select-item disabled value="christiano">Christiano</scale-dropdown-select-item>
        </scale-dropdown-select>`,
      });

      selectEl = await page.find('scale-dropdown-select');
      comboboxEl = await page.find(
        'scale-dropdown-select >>> [part="combobox"]'
      );
    });

    it('should not be able to select any option', async () => {
      await page.keyboard.down('Tab');
      await page.keyboard.down('Enter');
      await page.keyboard.down('ArrowDown');
      await page.keyboard.down('ArrowDown');
      await page.keyboard.down('ArrowDown');
      await page.keyboard.down('ArrowUp');
      await page.keyboard.down('ArrowUp');
      await page.keyboard.down('ArrowDown');
      await page.keyboard.down('Enter');
      await page.waitForChanges();

      expect(comboboxEl).toEqualText('');
      expect(selectEl).toEqualAttribute('value', 'default');
    });

    it('should not be able to select any option by typing', async () => {
      await page.keyboard.down('Tab');
      await page.keyboard.down('Enter');
      await page.keyboard.down('c');
      await page.keyboard.down('e');
      await page.keyboard.down('d');
      await page.keyboard.down('Enter');
      await page.waitForChanges();

      expect(comboboxEl).toEqualText('');
      expect(selectEl).toEqualAttribute('value', 'default');
    });
  });
});
