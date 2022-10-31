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

describe('scale-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<scale-button>Click me!</scale-button>');
    const element = await page.find('scale-button');
    expect(element).toHaveClass('hydrated');
  });

  it('should set tabindex on its inner element', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<scale-button inner-tabindex="5">Click me!</scale-button>'
    );
    const element = await page.find('scale-button >>> button');
    expect(element.getAttribute('tabindex')).toBe('5');
  });

  it('should allow submitting forms with the Enter key', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <form>
        <input type="text" name="a" />
        <input type="text" name="b" />
        <scale-button>Submit</scale-button>
      </form>
    `);
    const form = await page.find('form');
    const input = await page.find('input[name="a"]');
    const spy = await form.spyOnEvent('submit');
    await input.press('Enter');
    expect(spy).toHaveReceivedEvent();
  });
});
