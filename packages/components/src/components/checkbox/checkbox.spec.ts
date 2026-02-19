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

  it('should match snapshot', async () => {
    const specPage = await newSpecPage({
      components: [Checkbox],
      html: `<scale-checkbox helper-text="helpertext"></scale-checkbox>`,
    });
    expect(specPage.root).toMatchSnapshot();
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
          invalid="true"
          value="testvalue">
        </scale-checkbox>`,
    });
    await page.waitForChanges();
    expect(page.rootInstance.name).toBe('testname');
    expect(page.rootInstance.label).toBe('testlabel');
    expect(page.rootInstance.disabled).toBe(true);
    expect(page.rootInstance.checked).toBe(true);
    expect(page.rootInstance.invalid).toBe(true);
    expect(page.rootInstance.value).toBe('testvalue');
  });

  it('should emit on change', async () => {
    const changeSpy = jest.fn();
    const element = page.root.querySelector('input');
    page.doc.addEventListener('scale-change', changeSpy);
    element.dispatchEvent(new Event('change'));
    await page.waitForChanges();
    expect(changeSpy).toHaveBeenCalled();
  });

  it('should handle inputId with undefined value', async () => {
    page = await newSpecPage({
      components: [Checkbox],
      html: `
        <scale-checkbox
         input-id
         >
        </scale-checkbox>`,
    });
    expect(page.rootInstance.inputId).toContain('input-checkbox');
  });
});
