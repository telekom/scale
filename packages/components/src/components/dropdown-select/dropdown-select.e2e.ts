import { newE2EPage } from '@stencil/core/testing';
import { DropdownSelect } from './dropdown-select';

describe('DropdownSelect', function () {
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
});
