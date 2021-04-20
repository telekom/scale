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
import { Breadcrumb } from './breadcrumb';
// import { styles } from './breadcrumb.styles';
// import jss from 'jss';

describe('Breadcrumb', () => {
  /* let element;
  let stylesheet;
  beforeEach(async () => {
    element = new Breadcrumb();
    stylesheet = element.stylesheet = jss.createStyleSheet(styles as any);
  }); */

  let element;
  let page: SpecPage;
  let component;

  beforeEach(async () => {
    page = await newSpecPage({
      components: [Breadcrumb],
      html: `<div></div>`,
    });

    component = page.doc.createElement('scale-breadcrumb');
    page.root.appendChild(component);
  });

  it('has class breadcrumb', () => {
    element = new Breadcrumb();
    expect(element.getCssClassMap()).toContain('breadcrumb');
  });

  it('linksArray initially empty', () => {
    element = new Breadcrumb();
    element.setLinksArray();
    expect(element.linksArray.length).toEqual(0);
  });

  it('should match snapshot', async () => {
    expect(page.root).toMatchSnapshot();
  });

  //  page.rootInstance is undefined => Solution to be found

  it('has no separator', async () => {
    const el1 = page.doc.createElement('a');
    const el2 = page.doc.createElement('a');
    const el3 = page.doc.createElement('span');
    component.appendChild(el1);
    component.appendChild(el2);
    component.appendChild(el3);

    const separator = page.root.querySelectorAll('[slot="separator"]');

    expect(separator.length).toBe(0);
  });

  it('has separator', async () => {
    /* const el1 = page.doc.createElement('a');
    const el2 = page.doc.createElement('a'); */
    const el3 = page.doc.createElement('span');
    el3.setAttribute('slot', 'separator');
    /*  component.appendChild(el1);
    component.appendChild(el2); */
    component.appendChild(el3);

    const separator = page.root.querySelectorAll('[slot="separator"]');

    expect(separator.length).toBe(1);
  });
});
