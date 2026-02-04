/**
 * @license
 * Scale https://github.com/telekom/scale
 *
 * Copyright (c) 2021 Egor Kirpichev and contributors, Deutsche Telekom AG
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { newE2EPage } from '@stencil/core/testing';

describe('scale-combobox', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<scale-combobox/>');
    const element = await page.find('scale-combobox');
    expect(element).toHaveClass('hydrated');
  });

  it('displays label when provided', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<scale-combobox label="Select framework"></scale-combobox>'
    );
    const label = await page.find('scale-combobox >>> .combobox-label');
    expect(label).toEqualText('Select framework');
  });

  it('displays placeholder text in input', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<scale-combobox placeholder="Type or select..."></scale-combobox>'
    );
    const input = await page.find('scale-combobox >>> .combobox-input');
    expect(input).toHaveAttribute('placeholder');
    const placeholderValue = await input.getAttribute('placeholder');
    expect(placeholderValue).toEqual('Type or select...');
  });

  it('opens dropdown on input focus', async () => {
    const page = await newE2EPage();
    const html = `
      <scale-combobox></scale-combobox>
      <script>
        const combobox = document.querySelector('scale-combobox');
        combobox.options = ['React', 'Vue', 'Angular'];
      </script>
    `;
    await page.setContent(html);
    const input = await page.find('scale-combobox >>> .combobox-input');
    await input.focus();
    await page.waitForTimeout(150);
    const listbox = await page.find('scale-combobox >>> .combobox-listbox');
    expect(listbox).toBeTruthy();
  });

  it('filters options based on input value', async () => {
    const page = await newE2EPage();
    const html = `
      <scale-combobox></scale-combobox>
      <script>
        const combobox = document.querySelector('scale-combobox');
        combobox.options = ['React', 'Vue', 'Angular'];
      </script>
    `;
    await page.setContent(html);
    const input = await page.find('scale-combobox >>> .combobox-input');
    await input.focus();
    await input.type('Re');
    await page.waitForTimeout(100);
    const options = await page.findAll('scale-combobox >>> .combobox-option');
    // Should only show React
    expect(options.length).toBeLessThanOrEqual(1);
    expect(options[0]).toEqualText('React');
  });

  it('selects option on click', async () => {
    const page = await newE2EPage();
    const html = `
      <scale-combobox></scale-combobox>
      <script>
        const combobox = document.querySelector('scale-combobox');
        combobox.options = ['React', 'Vue', 'Angular'];
      </script>
    `;
    await page.setContent(html);
    const input = await page.find('scale-combobox >>> .combobox-input');
    await input.focus();
    await page.waitForTimeout(150);
    const option = await page.find('scale-combobox >>> .combobox-option');
    await option.click();
    await page.waitForTimeout(100);
    const inputValue = await input.getProperty('value');
    expect(inputValue).toBeTruthy();
  });

  it('shows disabled state', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<scale-combobox disabled label="Disabled field"></scale-combobox>'
    );
    const input = await page.find('scale-combobox >>> .combobox-input');
    expect(input).toHaveAttribute('disabled');
  });

  it('shows invalid state styling', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<scale-combobox invalid label="Invalid field"></scale-combobox>'
    );
    const container = await page.find('scale-combobox >>> .combobox-container');
    const classes = container.getAttribute('class');
    expect(classes).toContain('combobox-invalid');
  });

  it('displays helper text', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<scale-combobox helper-text="Please select an option"></scale-combobox>'
    );
    const helperText = await page.find('scale-combobox >>> scale-helper-text');
    expect(helperText).toBeTruthy();
    const helperTextContent = await helperText.getProperty('helperText');
    expect(helperTextContent).toEqual('Please select an option');
  });

  it('emits scaleChange event on selection', async () => {
    const page = await newE2EPage();
    const html = `
      <scale-combobox></scale-combobox>
      <script>
        const combobox = document.querySelector('scale-combobox');
        combobox.options = ['React', 'Vue'];
      </script>
    `;
    await page.setContent(html);
    const scaleChangeEvent = await page.spyOnEvent('scaleChange');
    const input = await page.find('scale-combobox >>> .combobox-input');
    await input.focus();
    await page.waitForTimeout(150);
    const option = await page.find('scale-combobox >>> .combobox-option');
    await option.click();
    await page.waitForTimeout(100);
    expect(scaleChangeEvent).toHaveReceivedEvent();
  });

  it('closes dropdown on escape key', async () => {
    const page = await newE2EPage();
    const html = `
      <scale-combobox></scale-combobox>
      <script>
        const combobox = document.querySelector('scale-combobox');
        combobox.options = ['React', 'Vue', 'Angular'];
      </script>
    `;
    await page.setContent(html);
    const input = await page.find('scale-combobox >>> .combobox-input');
    await input.focus();
    await page.waitForTimeout(150);
    await input.press('Escape');
    await page.waitForTimeout(100);
    const listbox = await page.find('scale-combobox >>> .combobox-listbox');
    expect(listbox).toBeFalsy();
  });

  it('respects allow-custom prop', async () => {
    const page = await newE2EPage();
    const html = `
      <scale-combobox allow-custom="true"></scale-combobox>
      <script>
        const combobox = document.querySelector('scale-combobox');
        combobox.options = ['React', 'Vue'];
      </script>
    `;
    await page.setContent(html);
    const input = await page.find('scale-combobox >>> .combobox-input');
    await input.focus();
    await input.type('Custom Value');
    await page.waitForTimeout(100);
    const inputValue = await input.getProperty('value');
    expect(inputValue).toContain('Custom Value');
  });

  it('respects allow-custom prop set to false', async () => {
    const page = await newE2EPage();
    const html = `
      <scale-combobox allow-custom="false"></scale-combobox>
      <script>
        const combobox = document.querySelector('scale-combobox');
        combobox.options = ['React', 'Vue'];
      </script>
    `;
    await page.setContent(html);
    const scaleChangeEvent = await page.spyOnEvent('scaleChange');
    const input = await page.find('scale-combobox >>> .combobox-input');
    await input.focus();
    await page.waitForTimeout(150);

    // Type a custom value that's not in the options
    await input.type('Custom Value');
    await page.waitForTimeout(100);

    // Press Enter - should NOT emit scaleChange for custom values
    await input.press('Enter');
    await page.waitForTimeout(100);

    // Verify no scaleChange event was emitted
    expect(scaleChangeEvent).not.toHaveReceivedEvent();
  });

  it('respects custom filter function', async () => {
    const page = await newE2EPage();
    const html = `
      <scale-combobox></scale-combobox>
      <script>
        const combobox = document.querySelector('scale-combobox');
        combobox.options = ['test', 'estt', 'stte'];
        combobox.filterFunction = (option, query) =>
          option.toLowerCase().startsWith(query.toLowerCase());
      </script>
    `;
    await page.setContent(html);
    const input = await page.find('scale-combobox >>> .combobox-input');
    await input.focus();
    await input.type('st');
    await page.waitForTimeout(100);
    const options = await page.findAll('scale-combobox >>> .combobox-option');
    // Should only show React due to custom filter function
    expect(options.length).toBeLessThanOrEqual(1);
    expect(options[0]).toEqualText('stte');
  });
});
