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

describe('scale-bottom-bar', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent(`
        <scale-bottom-bar>
            <scale-bottom-bar-item icon="home-home" selected></scale-bottom-bar-item>
            <scale-bottom-bar-item icon="action-favorite"></scale-bottom-bar-item>
            <scale-bottom-bar-item icon="content-music"></scale-bottom-bar-item>
            <scale-bottom-bar-item icon="user-file-user"></scale-bottom-bar-item>  
        </scale-breadcrumb>    
    `);
    const element = await page.find('scale-bottom-bar');
    expect(element).toHaveClass('hydrated');
  });

  it('should add selected attribute only to clicked bottom bar item', async () => {
    const page = await newE2EPage();
    await page.setContent(`
        <scale-bottom-bar>
            <scale-bottom-bar-item id="first" icon="home-home" selected></scale-bottom-bar-item>
            <scale-bottom-bar-item id="second" icon="action-favorite"></scale-bottom-bar-item>
            <scale-bottom-bar-item id="third" icon="content-music"></scale-bottom-bar-item>
            <scale-bottom-bar-item id="fourth" icon="user-file-user"></scale-bottom-bar-item>  
        </scale-breadcrumb>    
    `);
    await (await page.find('scale-bottom-bar-item#second')).click();
    const element = await page.find('scale-bottom-bar-item#second');
    const element2 = await page.find('scale-bottom-bar-item#third');

    expect(element.getAttribute('selected')).toBe('');
    expect(element2.getAttribute('selected')).toBeFalsy();
  });
});
