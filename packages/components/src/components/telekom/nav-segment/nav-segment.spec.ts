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
import { NavSegment } from './nav-segment';

describe('NavSegment', async () => {
  let page: SpecPage;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [NavSegment],
      html: `<scale-nav-segment></scale-nav-segment>`,
    });
  });
  it('smoke test', async () => {
    expect(page.root).toMatchSnapshot();
  });

  it('has slot', async () => {
    page = await newSpecPage({
      components: [NavSegment],
      html: `
			<scale-nav-segment is-active>
				<div></div>
			</scale-nav-segment>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('should react on focus', async () => {
    const mock = jest.fn();
    const anchor = page.root.querySelector(
      '.segment-navigation__item-link'
    ) as HTMLAnchorElement;
    anchor.addEventListener('focus', mock);
    await page.waitForChanges();
    anchor.dispatchEvent(new Event('focus'));
    await page.waitForChanges();
    expect(mock).toHaveBeenCalled();
  });

  it('has class segment-navigation__item', () => {
    const element = new NavSegment();
    expect(element.getCssClassMap()).toContain('segment-navigation__item');
  });
});
