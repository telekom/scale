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
import { Accordion } from './accordion';

describe('Accordion', () => {
  let page: any;

  beforeEach(async () => {
    page = await newSpecPage({
      components: [Accordion],
      html: `<scale-accordion></scale-accordion>`,
    });
  });

  it('should match snapshot', async () => {
    expect(page.root).toMatchSnapshot();
  });

  it('should match getCssClassMap', async () => {
    const element = new Accordion();
    expect(element.getCssClassMap()).toContain('accordion');
  });

  it('should handle true dependent prop', async () => {
    const setDependent = true;
    page.rootInstance.dependent = setDependent;
    await page.waitForChanges();
    expect(page.rootInstance.dependent).toBe(setDependent);
  });

  it('should handle false dependent prop', async () => {
    const setDependent = false;
    page.rootInstance.dependent = setDependent;
    await page.waitForChanges();
    expect(page.rootInstance.dependent).toBe(setDependent);
  });

  it('should handle true expanded prop', async () => {
    const setExpanded = true;
    page.rootInstance.expanded = setExpanded;
    await page.waitForChanges();
    expect(page.rootInstance.expanded).toBe(setExpanded);
  });

  it('should handle false expanded prop', async () => {
    const setExpanded = false;
    page.rootInstance.expanded = setExpanded;
    await page.waitForChanges();
    expect(page.rootInstance.expanded).toBe(setExpanded);
  });
});

describe('Handle', () => {
  it('expanded prop match snapshot', async () => {
    const page = await newSpecPage({
      components: [Accordion],
      html: `
        <scale-accordion expanded>
          <scale-collapsible>
            <h3>Leo integer malesuada nunc vel risus</h3>
            <p>Freegan kinfolk farm-to-table humblebrag cred, hammock bespoke small batch pabst…</p>
          </scale-collapsible>
          <scale-collapsible>
            <h3>Dolor purus non enim</h3>
            <p>Bespoke austin pork belly yuccie pop-up…</p>
          </scale-collapsible>
          <scale-collapsible>
            <h3>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam</h3>
            <p>Biodiesel chia af hoodie tumeric bespoke letterpress…</p>
          </scale-collapsible>
        </scale-accordion>`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('dependent prop match snapshot', async () => {
    const page = await newSpecPage({
      components: [Accordion],
      html: `
      <scale-accordion headline="multi" dependent>
      <scale-collapsible is-expanded>
        <scale-text slot="headline" variant="collapsible"
          >Accordion with multi</scale-text
        >
        <scale-input
          slot="content"
          label="First Name"
          placeholder="Hello"
        ></scale-input>
      </scale-collapsible>
      <scale-collapsible>
        <scale-text slot="headline" variant="collapsible"
          >Accordion with multi</scale-text
        >
        <scale-input
          slot="content"
          label="First Name"
          placeholder="Hello"
        ></scale-input>
      </scale-collapsible>
    </scale-accordion>`,
    });
    expect(page.rootInstance.dependent).toBe(true);
    expect(page.root).toMatchSnapshot();
  });
});
