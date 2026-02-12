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
import { Collapsible } from './collapsible';

describe('TextField', () => {
  let page;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [Collapsible],
      html: `<scale-collapsible></scale-collapsible>`,
    });
  });
  it('should match snapshot', async () => {
    expect(page.root).toMatchSnapshot();
  });
  it('should emit on click', async () => {
    const clickSpy = jest.fn();
    page.doc.addEventListener('scale-expand', clickSpy);
    const buttonElement = page.root.shadowRoot.querySelector('button');
    buttonElement.click();
    await page.waitForChanges();
    expect(clickSpy).toHaveBeenCalled();
  });
});
