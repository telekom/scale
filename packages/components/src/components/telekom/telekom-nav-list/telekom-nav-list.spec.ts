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
import { TelekomNavList } from './telekom-nav-list';
import { TelekomNavItem } from '../telekom-nav-item/telekom-nav-item';

const renderList = (attributes: string) =>
  newSpecPage({
    components: [TelekomNavList, TelekomNavItem],
    html: `
      <scale-telekom-nav-list ${attributes}>
        <scale-telekom-nav-item><a href="/overview">Overview</a></scale-telekom-nav-item>
      </scale-telekom-nav-list>`,
  });

describe('scale-telekom-nav-list roles', () => {
  it('exposes the main navigation as a list of links', async () => {
    const page = await renderList('variant="main-nav"');
    const list = page.body.querySelector('scale-telekom-nav-list');
    const item = page.body.querySelector('scale-telekom-nav-item');
    const link = page.body.querySelector('a');

    expect(list.getAttribute('role')).toBe('list');
    expect(item.getAttribute('role')).toBe('listitem');
    expect(link.hasAttribute('role')).toBe(false);
  });

  it('uses the main navigation roles when no variant is set', async () => {
    const page = await renderList('');

    expect(
      page.body.querySelector('scale-telekom-nav-list').getAttribute('role')
    ).toBe('list');
    expect(page.body.querySelector('a').hasAttribute('role')).toBe(false);
  });

  it('keeps menu semantics for the other variants', async () => {
    const page = await renderList('variant="functions"');
    const list = page.body.querySelector('scale-telekom-nav-list');
    const item = page.body.querySelector('scale-telekom-nav-item');
    const link = page.body.querySelector('a');

    expect(list.getAttribute('role')).toBe('menu');
    expect(item.getAttribute('role')).toBe('none');
    expect(link.getAttribute('role')).toBe('menuitem');
  });

  it('makes a dropdown wrapper the list item', async () => {
    const page = await newSpecPage({
      components: [TelekomNavList, TelekomNavItem],
      html: `
        <scale-telekom-nav-list variant="main-nav">
          <scale-menu-flyout>
            <scale-telekom-nav-item slot="trigger"><button>Topic One</button></scale-telekom-nav-item>
          </scale-menu-flyout>
        </scale-telekom-nav-list>`,
    });

    expect(
      page.body.querySelector('scale-telekom-nav-list').getAttribute('role')
    ).toBe('list');
    expect(
      page.body.querySelector('scale-menu-flyout').getAttribute('role')
    ).toBe('listitem');
    expect(
      page.body.querySelector('scale-telekom-nav-item').getAttribute('role')
    ).toBe('none');
    expect(page.body.querySelector('button').hasAttribute('role')).toBe(false);
  });

  it('respects a role set by the consumer', async () => {
    const page = await renderList('variant="main-nav" role="menu"');
    const list = page.body.querySelector('scale-telekom-nav-list');
    const item = page.body.querySelector('scale-telekom-nav-item');
    const link = page.body.querySelector('a');

    expect(list.getAttribute('role')).toBe('menu');
    expect(item.getAttribute('role')).toBe('none');
    expect(link.getAttribute('role')).toBe('menuitem');
  });
});
