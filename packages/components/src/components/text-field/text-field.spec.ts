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
import { TextField } from './text-field';

describe('TextField', () => {
  let page;
  const TEST_VALUE = 'Test Value';
  beforeEach(async () => {
    page = await newSpecPage({
      components: [TextField],
      html: `<scale-text-field></scale-text-field>`,
    });
  });

  it('should match snapshot', async () => {
    expect(page.root).toMatchSnapshot();
  });

  it('should reflect attributes/props being set', async () => {
    const specPage = await newSpecPage({
      components: [TextField],
      html: `<scale-text-field
                 type ="email"
                 name ="name"
                 label ="label"
                 max-length="2"
                 min-length="1"
                 size ="size"
                 status ="status"
                 placeholder ="placeholder"
                 disabled ="true"
                 required ="true"
                 counter ="true" 
                 value ="value"
                 input-id ="input-text-field1"
                 transparent ="true"
                 styles ="styles"
               </scale-text-field>`,
    });

    expect(specPage.rootInstance.type).toBe('email');
    expect(specPage.rootInstance.name).toBe('name');
    expect(specPage.rootInstance.label).toBe('label');
    expect(specPage.rootInstance.size).toBe('size');
    expect(specPage.rootInstance.maxLength).toBe(2);
    expect(specPage.rootInstance.minLength).toBe(1);
    expect(specPage.rootInstance.status).toBe('status');
    expect(specPage.rootInstance.placeholder).toBe('placeholder');
    expect(specPage.rootInstance.disabled).toBe(true);
    expect(specPage.rootInstance.required).toBe(true);
    expect(specPage.rootInstance.counter).toBe(true);
    expect(specPage.rootInstance.value).toBe('value');
    expect(specPage.rootInstance.transparent).toBe(true);
    expect(specPage.rootInstance.styles).toBe('styles');
    expect(specPage.rootInstance.inputId).toBe('input-text-field1');
    expect(specPage.rootInstance.hasFocus).toBe(false);
  });

  it('should handle focus with right hasFocus state', async () => {
    const textField = new TextField();
    textField.hasFocus = false;
    textField.handleFocus();
    expect(textField.hasFocus).toBeTruthy();
  });

  it('should handle blur with right hasFocus state', async () => {
    const textField = new TextField();
    textField.hasFocus = true;
    textField.handleBlur();
    expect(textField.hasFocus).toBeFalsy();
  });

  it('should handle helperText prop', async () => {
    page.root.helperText = 'help';
    await page.waitForChanges();
    expect(page.rootInstance.helperText).toBe('help');
  });

  it('should handle maxLength prop', async () => {
    page.root.maxLength = 15;
    await page.waitForChanges();
    expect(page.rootInstance.maxLength).toBe(15);
  });

  it('should handle minLength prop', async () => {
    page.root.minLength = 5;
    await page.waitForChanges();
    expect(page.rootInstance.minLength).toBe(5);
  });

  it('should emit on input', async () => {
    const inputSpy = jest.fn();
    page.doc.addEventListener('scaleInput', inputSpy);
    const inputField = page.doc.querySelector('input');
    inputField.value = TEST_VALUE;
    await inputField.dispatchEvent(new Event('input'));
    await page.waitForChanges();
    expect(inputSpy).toHaveBeenCalled();
  });
  it('should emit on change', async () => {
    // const changeSpy = jest.fn();
    // page.doc.addEventListener('scaleChange', changeSpy);
    const inputField = page.doc.querySelector('input');
    inputField.value = TEST_VALUE;
    await inputField.dispatchEvent(new Event('change'));
    await page.waitForChanges();
    expect(page.rootInstance.value).toBe('Test Value');
    inputField.value = '';
    await inputField.dispatchEvent(new Event('change'));
    await page.waitForChanges();
    expect(page.rootInstance.value).toBe('');
    // expect(changeSpy).toHaveBeenCalled();
  });
  it('', async () => {
    const emitSpy = jest.fn();
    page.doc.addEventListener('scaleChange', emitSpy);
    page.rootInstance.emitChange();
    await page.waitForChanges();
    expect(emitSpy).toHaveBeenCalled();
  });
  it('should emit on focus', async () => {
    const focusSpy = jest.fn();
    page.doc.addEventListener('scaleFocus', focusSpy);
    const inputField = page.doc.querySelector('input');
    inputField.value = TEST_VALUE;
    await inputField.dispatchEvent(new Event('focus'));
    await page.waitForChanges();
    expect(focusSpy).toHaveBeenCalled();
  });
  it('should emit on blur', async () => {
    const blurSpy = jest.fn();
    page.doc.addEventListener('scaleBlur', blurSpy);
    const inputField = page.doc.querySelector('input');
    inputField.value = TEST_VALUE;
    await inputField.dispatchEvent(new Event('blur'));
    await page.waitForChanges();
    expect(blurSpy).toHaveBeenCalled();
  });
  it('should emit on keydown', async () => {
    const keyDownSpy = jest.fn();
    page.doc.addEventListener('scaleKeyDown', keyDownSpy);
    const inputField = page.doc.querySelector('input');
    inputField.value = TEST_VALUE;
    await inputField.dispatchEvent(new Event('keydown'));
    await page.waitForChanges();
    expect(keyDownSpy).toHaveBeenCalled();
  });

  it('should handle css classes', () => {
    const element = new TextField();

    element.type = 'email';
    expect(element.getCssClassMap()).toContain('text-field--type-email');

    element.hasFocus = true;
    expect(element.getCssClassMap()).toContain('text-field--has-focus');

    element.disabled = true;
    expect(element.getCssClassMap()).toContain('text-field--disabled');

    element.transparent = true;
    expect(element.getCssClassMap()).toContain('text-field--transparent');

    element.status = 'status';
    expect(element.getCssClassMap()).toContain('text-field--status-status');

    element.size = 'small';
    expect(element.getCssClassMap()).toContain('text-field--size-small');
  });

  it('should handle hasFocus right', () => {
    const element = new TextField();
    element.handleFocus();
    expect(element.hasFocus).toBeTruthy();
    element.handleBlur();
    expect(element.hasFocus).toBeFalsy();
  });

  it('should emit on emitchange', async () => {
    const inputSpy = jest.fn();
    const emitSpy = jest.fn();
    page.doc.addEventListener('scaleInput', inputSpy);
    page.doc.addEventListener('scaleChange', emitSpy);
    const inputField = page.doc.querySelector('input');
    inputField.value = TEST_VALUE;
    await inputField.dispatchEvent(new Event('input'));
    await page.waitForChanges();
    expect(inputSpy).toHaveBeenCalled();
    expect(emitSpy).toHaveBeenCalled();
  });
});
