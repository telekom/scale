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
 import { TextFieldV2 } from './text-field-v2';
 
 describe('TextFieldV2', () => {
   let page;
   const TEST_VALUE = 'Test Value';
   beforeEach(async () => {
     page = await newSpecPage({
       components: [TextFieldV2],
       html: `<scale-text-field-v2></scale-text-field-v2>`,
     });
   });
 
   it('should match snapshot', async () => {
     expect(page.root).toMatchSnapshot();
   });
 
   it('should reflect attributes/props being set', async () => {
     const specPage = await newSpecPage({
       components: [TextFieldV2],
       html: `<scale-text-field-v2
                  type ="email"
                  name ="name"
                  label ="label"
                  max-length="2"
                  min-length="1"
                  size ="size"
                  invalid="true"
                  placeholder ="placeholder"
                  disabled ="true"
                  required ="true"
                  counter ="true" 
                  value ="value"
                  input-id ="input-text-field1"
                  transparent ="true"
                  styles ="styles"
                  list="datalist"
               ></scale-text-field-v2>`,
     });
 
     expect(specPage.rootInstance.type).toBe('email');
     expect(specPage.rootInstance.name).toBe('name');
     expect(specPage.rootInstance.label).toBe('label');
     expect(specPage.rootInstance.size).toBe('size');
     expect(specPage.rootInstance.maxLength).toBe(2);
     expect(specPage.rootInstance.minLength).toBe(1);
     expect(specPage.rootInstance.invalid).toBe(true);
     expect(specPage.rootInstance.placeholder).toBe('placeholder');
     expect(specPage.rootInstance.disabled).toBe(true);
     expect(specPage.rootInstance.required).toBe(true);
     expect(specPage.rootInstance.counter).toBe(true);
     expect(specPage.rootInstance.value).toBe('value');
     expect(specPage.rootInstance.transparent).toBe(true);
     expect(specPage.rootInstance.styles).toBe('styles');
     expect(specPage.rootInstance.inputId).toBe('input-text-field1');
     expect(specPage.rootInstance.hasFocus).toBe(false);
     expect(specPage.rootInstance.list).toBe('datalist');
   });
 
   it('should handle focus with right hasFocus state', async () => {
     const textField = new TextFieldV2();
     textField.hasFocus = false;
     textField.handleFocus();
     expect(textField.hasFocus).toBeTruthy();
   });
 
   it('should handle blur with right hasFocus state', async () => {
     const textField = new TextFieldV2();
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
     const inputSpyLegacy = jest.fn();
     page.doc.addEventListener('scale-input', inputSpy);
     page.doc.addEventListener('scaleInput', inputSpyLegacy);
     const inputField = page.doc.querySelector('input');
     inputField.value = TEST_VALUE;
     await inputField.dispatchEvent(new Event('input'));
     await page.waitForChanges();
     expect(inputSpy).toHaveBeenCalled();
     expect(inputSpyLegacy).toHaveBeenCalled();
   });
   it('should react on change event', async () => {
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
   it('should emit on change', async () => {
     const emitSpy = jest.fn();
     const emitSpyLegacy = jest.fn();
     page.doc.addEventListener('scale-change', emitSpy);
     page.doc.addEventListener('scaleChange', emitSpyLegacy);
     page.rootInstance.emitChange();
     await page.waitForChanges();
     expect(emitSpy).toHaveBeenCalled();
     expect(emitSpyLegacy).toHaveBeenCalled();
   });
   it('should emit on focus', async () => {
     const focusSpy = jest.fn();
     const focusSpyLegacy = jest.fn();
     page.doc.addEventListener('scale-focus', focusSpy);
     page.doc.addEventListener('scaleFocus', focusSpyLegacy);
     const inputField = page.doc.querySelector('input');
     inputField.value = TEST_VALUE;
     await inputField.dispatchEvent(new Event('focus'));
     await page.waitForChanges();
     expect(focusSpy).toHaveBeenCalled();
     expect(focusSpyLegacy).toHaveBeenCalled();
   });
   it('should emit on blur', async () => {
     const blurSpy = jest.fn();
     const blurSpyLegacy = jest.fn();
     page.doc.addEventListener('scale-blur', blurSpy);
     page.doc.addEventListener('scaleBlur', blurSpyLegacy);
     const inputField = page.doc.querySelector('input');
     inputField.value = TEST_VALUE;
     await inputField.dispatchEvent(new Event('blur'));
     await page.waitForChanges();
     expect(blurSpy).toHaveBeenCalled();
     expect(blurSpyLegacy).toHaveBeenCalled();
   });
   it('should emit on keydown', async () => {
     const keyDownSpy = jest.fn();
     const keyDownSpyLegacy = jest.fn();
     page.doc.addEventListener('scaleKeydown', keyDownSpyLegacy);
     page.doc.addEventListener('scale-keydown', keyDownSpy);
     const inputField = page.doc.querySelector('input');
     inputField.value = TEST_VALUE;
     await inputField.dispatchEvent(new Event('keydown'));
     await page.waitForChanges();
     expect(keyDownSpy).toHaveBeenCalled();
     expect(keyDownSpyLegacy).toHaveBeenCalled();
   });
 
   it('should handle css classes', () => {
     const element = new TextFieldV2();
 
     element.type = 'email';
     expect(element.getCssClassMap()).toContain('text-field-v2--type-email');
 
     element.hasFocus = true;
     expect(element.getCssClassMap()).toContain('text-field-v2--has-focus');
 
     element.disabled = true;
     expect(element.getCssClassMap()).toContain('text-field-v2--disabled');
 
     element.transparent = true;
     expect(element.getCssClassMap()).toContain('text-field-v2--transparent');
 
     element.invalid = true;
     expect(element.getCssClassMap()).toContain('text-field-v2--status-error');
 
     element.size = 'small';
     expect(element.getCssClassMap()).toContain('text-field-v2--size-small');
   });
 
   it('should handle hasFocus right', () => {
     const element = new TextFieldV2();
     element.handleFocus();
     expect(element.hasFocus).toBeTruthy();
     element.handleBlur();
     expect(element.hasFocus).toBeFalsy();
   });
   it('should render prefix and suffix', async () => {
    const specPage = await newSpecPage({
        components: [TextFieldV2],
        html: `<scale-text-field-v2
                   inputprefix="$"
                   inputsuffix="/100"
                   label="label"
                ></scale-text-field-v2>`,
    });
    const prefix = specPage.root.querySelector('.text-field-v2__prefix') as HTMLElement;
    const suffix = specPage.root.querySelector('.text-field-v2__suffix') as HTMLElement;
    expect(prefix.textContent.trim()).toBe('$')
    expect(suffix.textContent.trim()).toBe('/100')
  });
  it('should toggle password visibility', async () => {
    const specPage = await newSpecPage({
        components: [TextFieldV2],
        html: `<scale-text-field-v2
                   type ="password"
                   revealpassword=true
                   label ="label"
                ></scale-text-field-v2>`,
    });       
    expect(specPage.rootInstance.type).toBe('password');
    specPage.root.value = TEST_VALUE
    const revealButton = specPage.root.querySelector('.text-field-v2__reveal-password') as HTMLElement;
    revealButton.click();
    expect(specPage.rootInstance.type).toBe('text');
  });
  it('should reset the input value', async () => {
    const specPage = await newSpecPage({
        components: [TextFieldV2],
        html: `<scale-text-field-v2
                   type="text"
                   reset=true
                   label="label"
                ></scale-text-field-v2>`,
    });       
    specPage.root.value = TEST_VALUE
    const resetButton = specPage.root.querySelector('.text-field-v2__reset') as HTMLElement;
    resetButton.click();
    expect(specPage.root.value).toBe('');
  });  
 });
 