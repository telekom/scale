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

import { newSpecPage } from '@stencil/core/testing';
import { RadioButton } from './radio-button';

describe('RadioButton', () => {
  it('should match snapshot', async () => {
    const page = await newSpecPage({
      components: [RadioButton],
      html: `<scale-radio-button></scale-radio-button>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('should handle change of checked', async () => {
    const page = await newSpecPage({
      components: [RadioButton],
      html: `<scale-radio-button inputId="testing" checked="false"></scale-radio-button>`,
    });
    page.rootInstance.checked = true;
    expect(page.root).toMatchSnapshot();
  });

  it('should emit on change', async () => {
    const page = await newSpecPage({
      components: [RadioButton],
      html: `<scale-radio-button></scale-radio-button>`,
    });
    const changeSpy = jest.fn();
    page.rootInstance.checked = true;
    page.doc.addEventListener('scale-change', changeSpy);
    const element = page.root.querySelector('input');
    element.dispatchEvent(new Event('change'));
    await page.waitForChanges();
    expect(changeSpy).toHaveBeenCalled();
  });
});
