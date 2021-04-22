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

import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { Checkbox } from './checkbox';

describe('Checkbox', () => {
  let page: SpecPage;

  beforeEach(async () => {
    page = await newSpecPage({
      components: [Checkbox],
      html: `<scale-checkbox></scale-checkbox>`,
    });
  });

  it('should match snapshot', async () => {
    expect(page.root).toMatchSnapshot();
  });

  it('should reflect attributes', async () => {
    page = await newSpecPage({
      components: [Checkbox],
      html: `
        <scale-checkbox 
          name="testname"
          label="testlabel"
          checked
          disabled
          status="error"
          value="testvalue">
        </scale-checkbox>`,
    });
    await page.waitForChanges();
    expect(page.rootInstance.name).toBe('testname');
    expect(page.rootInstance.label).toBe('testlabel');
    expect(page.rootInstance.disabled).toBe(true);
    expect(page.rootInstance.checked).toBe(true);
    expect(page.rootInstance.status).toBe('error');
    expect(page.rootInstance.value).toBe('testvalue');
  });

  it('should handle css classes', () => {
    const element = new Checkbox();
    element.checked = true;
    expect(element.getCssClassMap()).toContain('checkbox--checked');
    element.disabled = true;
    expect(element.getCssClassMap()).toContain('checkbox--disabled');
    element.status = 'error';
    expect(element.getCssClassMap()).toContain('checkbox--status-error');
  });

  it('should emit on change', async () => {
    const changeSpy = jest.fn();
    page.doc.addEventListener('scaleChange', changeSpy);
    const buttonElement = page.root.querySelector('input');
    buttonElement.dispatchEvent(new Event('change'));
    await page.waitForChanges();
    expect(changeSpy).toHaveBeenCalled();
  });

  it('should handle inputId with value null', async () => {
    page = await newSpecPage({
      components: [Checkbox],
      html: `
        <scale-checkbox 
         input-id
         >
        </scale-checkbox>`,
    });
    expect(page.rootInstance.inputId).toBe('');
  });
});
