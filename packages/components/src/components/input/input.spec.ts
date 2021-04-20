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
import { Input } from './input';

describe('Input', () => {
  /* let page: SpecPage;
   beforeEach(async () => {
    page = await newSpecPage({
      components: [Input],
      html: `<scale-input></scale-input>`,
    });
  }); */

  it('should match default snapshot (type="text")', async () => {
    const page = await newSpecPage({
      components: [Input],
      html: `<scale-input></scale-input>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('should match snapshot with type="checkbox"', async () => {
    const page = await newSpecPage({
      components: [Input],
      html: `<scale-input type="checkbox"></scale-input>`,
    });
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });

  it('should match snapshot with type="radio"', async () => {
    const page = await newSpecPage({
      components: [Input],
      html: `<scale-input type="radio"></scale-input>`,
    });
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });

  it('should match snapshot with type="textarea"', async () => {
    const page = await newSpecPage({
      components: [Input],
      html: `<scale-input type="textarea"></scale-input>`,
    });
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });

  it('should match snapshot with type="input"', async () => {
    const page = await newSpecPage({
      components: [Input],
      html: `<scale-input type="input"></scale-input>`,
    });
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });

  it('should match snapshot with type="email"', async () => {
    const page = await newSpecPage({
      components: [Input],
      html: `<scale-input type="email"></scale-input>`,
    });
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });

  it('should match snapshot with type="hidden"', async () => {
    const page = await newSpecPage({
      components: [Input],
      html: `<scale-input type="hidden"></scale-input>`,
    });
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });

  it('should match snapshot with type="number"', async () => {
    const page = await newSpecPage({
      components: [Input],
      html: `<scale-input type="number"></scale-input>`,
    });
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });

  it('should match snapshot with type="password"', async () => {
    const page = await newSpecPage({
      components: [Input],
      html: `<scale-input type="password"></scale-input>`,
    });
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });

  it('should match snapshot with type="tel"', async () => {
    const page = await newSpecPage({
      components: [Input],
      html: `<scale-input type="tel"></scale-input>`,
    });
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });

  it('should match snapshot with type="url"', async () => {
    const page = await newSpecPage({
      components: [Input],
      html: `<scale-input type="url"></scale-input>`,
    });
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });

  it('should reflect attributes', async () => {
    const page = await newSpecPage({
      components: [Input],
      html: `<scale-input></scale-input>`,
    });
    page.root.type = 'select';
    page.root.name = 'name';
    page.root.variant = 'animated';
    page.root.label = 'label';
    page.root.size = 'small';
    page.root.helperText = 'helper text';
    page.root.status = 'error';
    page.root.disabled = false;
    page.root.required = true;
    page.root.checked = true;
    page.root.resize = 'none';
    page.root.value = '';
    page.root.multiple = false;
    page.root.transparent = false;
    page.root.controlled = false;
    await page.waitForChanges();
    expect(page.rootInstance.type).toBe('select');
    expect(page.rootInstance.name).toBe('name');
    expect(page.rootInstance.variant).toBe('animated');
    expect(page.rootInstance.label).toBe('label');
    expect(page.rootInstance.size).toBe('small');
    expect(page.rootInstance.helperText).toBe('helper text');
    expect(page.rootInstance.status).toBe('error');
    expect(page.rootInstance.disabled).toBe(false);
    expect(page.rootInstance.required).toBe(true);
    expect(page.rootInstance.checked).toBe(true);
    expect(page.rootInstance.resize).toBe('none');
    expect(page.rootInstance.value).toBe('');
    expect(page.rootInstance.multiple).toBe(false);
    expect(page.rootInstance.transparent).toBe(false);
    expect(page.rootInstance.controlled).toBe(false);
    expect(page.root).toMatchSnapshot();
  });

  it('should handle css classes', () => {
    const element = new Input();
    element.type = 'number';
    element.hasFocus = true;
    element.checked = true;
    element.disabled = true;
    element.transparent = true;
    element.status = 'error';
    element.size = 'small';
    element.variant = 'static';
    element.value = 'animated';
    expect(element.getCssClassMap()).toContain('input--type-number');
    expect(element.getCssClassMap()).toContain('input--has-focus');
    expect(element.getCssClassMap()).toContain('input--checked');
    expect(element.getCssClassMap()).toContain('input--disabled');
    expect(element.getCssClassMap()).toContain('input--variant-static');
    expect(element.getCssClassMap()).toContain('input--transparent');
    expect(element.getCssClassMap()).toContain('input--status-error');
    expect(element.getCssClassMap()).toContain('input--variant-static');
    expect(element.getCssClassMap()).toContain('animated');
  });

  it('inputId is set on componentWillLoad', () => {
    const element = new Input();
    element.componentWillLoad();
    expect(element.inputId.substr(0, 6)).toBe('input-');
  });

  it('icon is default icon on componentWillLoad', () => {
    const element = new Input();
    element.type = 'select';
    element.icon = null;
    element.componentWillLoad();
    expect(element.icon).toBe(
      'M20.65 7.4c-.3-.3-.75-.3-1.05 0L12 15 4.4 7.4c-.3-.3-.75-.3-1.05 0s-.3.75 0 1.05L12 17.1l8.65-8.65c.3-.25.3-.75 0-1.05z'
    );
  });

  /*   it('test componentDidRender', () => {
    const element = new Input();
    element.type = 'select';
    element.controlled = true;
    element.value = 'value';
    // does not work
    // element.selectElement.value = 'different value'
    // 
    element.componentDidRender();
   // does not work
    // expect(element.selectElement.value).toBe('value');
  }); */

  /*   it('test componentDidLoad', async () => {
    const page = await newSpecPage({
      components: [Input],
      html: `<div></div>`,
    });

    const component = page.doc.createElement('scale-input');
    page.root.appendChild(component);
    await page.waitForChanges();
    page.root.type = 'select';
    page.root.value = 22;
    expect(page.rootInstance.value).toBe(22);
    expect(page.root).toMatchSnapshot();
  }); */

  it('test function handleCheckboxClick()', () => {
    const element = new Input();
    element.disabled = false;
    element.checked = true;
    element.handleCheckboxClick();
    expect(element.checked).toBe(false);
  });

  it('test function handleFocus()', () => {
    const element = new Input();
    element.hasFocus = false;
    element.handleFocus();
    expect(element.hasFocus).toBe(true);
  });

  it('test function handleBlur()', () => {
    const element = new Input();
    element.hasFocus = true;
    element.handleBlur();
    expect(element.hasFocus).toBe(false);
  });

  it('test function emitChange()', () => {
    const element = new Input();
    element.emitChange();
    expect(element.scaleChange.emit).toBeTruthy();
  });
});
