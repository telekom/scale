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

describe('scale-breadcrumb', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<scale-breadcrumb/>');
    const element = await page.find('scale-breadcrumb');
    expect(element).toHaveClass('hydrated');
  });

  it('should set aria-label="Breadcrumb" on its nav element', async () => {
    const page = await newE2EPage();
    await page.setContent('<scale-breadcrumb/>');
    const element = await page.find('scale-breadcrumb >>> nav');
    expect(element.getAttribute('aria-label')).toBe('Breadcrumb');
  });

  it('should accept a custom separator via prop', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <scale-breadcrumb separator="/">
        <a href="/a">A</a>
        <a href="/b">B</a>
      </scale-breadcrumb>
    `);
    const element = await page.find('scale-breadcrumb >>> span');
    expect(element).toEqualText('/');
  });

  it('should accept a custom separator via slot', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <scale-breadcrumb separator="/">
        <span slot="separator">
          <span>/</span>
        </span>
        <a href="/a">A</a>
        <a href="/b">B</a>
      </scale-breadcrumb>
    `);
    const separator = await page.find('scale-breadcrumb >>> span');
    expect(separator.innerHTML.trim()).toBe('<span>/</span>');
    const list = await page.findAll('scale-breadcrumb >>> li');
    expect(list.length).toBe(2);
  });

  it('should add aria-current="page" attribute to last item, when link', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <scale-breadcrumb separator="/">
        <a href="/a">A</a>
        <a href="/b">B</a>
      </scale-breadcrumb>
    `);
    const element = await page.find('scale-breadcrumb >>> li:last-child a');
    expect(element.getAttribute('aria-current')).toBe('page');
  });

  it('should render last item as plain text when no href is found', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <scale-breadcrumb separator="/">
        <a href="/a">A</a>
        <span>B</span>
      </scale-breadcrumb>
    `);
    const element = await page.find('scale-breadcrumb >>> li:last-child span');
    expect(element).toEqualText('B');
  });
});
