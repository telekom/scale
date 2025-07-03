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
import { Textarea } from './textarea';
describe('Textarea', () => {
  it('should match snapshot', async () => {
    const page = await newSpecPage({
      components: [Textarea],
      html: `<scale-textarea></scale-textarea>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('should match snapshot -> helpertext', async () => {
    const page = await newSpecPage({
      components: [Textarea],
      html: `
        <scale-textarea
          invalid="true"
          helper-text="helpertext"
          >
        </scale-textarea>`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should match snapshot -> counter', async () => {
    const page = await newSpecPage({
      components: [Textarea],
      html: `
        <scale-textarea
          counter="true"
          >
        </scale-textarea>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  describe('classes', () => {
    it('should handle getCssClassMap()', () => {
      const element = new Textarea();
      expect(element.getCssClassMap()).toContain('textarea');

      element.hasFocus = true;
      expect(element.getCssClassMap()).toContain('textarea--has-focus');

      element.resize = 'vertical';
      expect(element.getCssClassMap()).toContain('textarea--resize-vertical');

      element.disabled = true;
      expect(element.getCssClassMap()).toContain('textarea--disabled');

      element.transparent = true;
      expect(element.getCssClassMap()).toContain('textarea--transparent');

      element.invalid = true;
      expect(element.getCssClassMap()).toContain('textarea--status-error');

      element.value = 'value';
      expect(element.getCssClassMap()).toContain('animated');
    });
  });
  describe('props', () => {
    it('check default props', async () => {
      const page = await newSpecPage({
        components: [Textarea],
        html: `<scale-textarea></scale-textarea>`,
      });
      expect(page.rootInstance.name).toBe('');
      expect(page.rootInstance.label).toBe('');
      expect(page.rootInstance.helperText).toBe('');
      expect(page.rootInstance.invalid).toBe(false);
      expect(page.rootInstance.placeholder).toBe('');
      expect(page.rootInstance.value).toBe('');
    });

    it('check props being set', async () => {
      const page = await newSpecPage({
        components: [Textarea],
        html: `<scale-textarea></scale-textarea>`,
      });
      page.root.name = 'name';
      page.root.label = 'label';
      page.root.rows = 5;
      page.root.cols = 3;
      page.root.maxLength = 100;
      page.root.minLength = 1;
      page.root.placeholder = 'placeholder';
      page.root.required = true;
      page.root.counter = true;
      page.root.resize = 'vertical';
      page.root.disabled = 'true';
      page.root.transparent = 'true';
      page.root.value = 'value';
      page.root.inputId = 'inputId';
      page.root.styles = 'background : red';
      await page.waitForChanges();
      expect(page.rootInstance.name).toBe('name');
      expect(page.rootInstance.label).toBe('label');
      expect(page.rootInstance.rows).toBe(5);
      expect(page.rootInstance.cols).toBe(3);
      expect(page.rootInstance.maxLength).toBe(100);
      expect(page.rootInstance.minLength).toBe(1);
      expect(page.rootInstance.placeholder).toBe('placeholder');
      expect(page.rootInstance.required).toBe(true);
      expect(page.rootInstance.counter).toBe(true);
      expect(page.rootInstance.resize).toBe('vertical');
      expect(page.rootInstance.disabled).toBe(true);
      expect(page.rootInstance.value).toBe('value');
      expect(page.rootInstance.transparent).toBe(true);
      expect(page.rootInstance.inputId).toBe('inputId');
      expect(page.rootInstance.styles).toBe('background : red');
    });
  });
  describe('functions', () => {
    it('handleFocus() sets focus to true', () => {
      const element = new Textarea();
      element.handleFocus();
      expect(element.hasFocus).toBe(true);
    });

    it('handleBlur() sets focus to false', () => {
      const element = new Textarea();
      element.hasFocus = true;
      element.handleBlur();
      expect(element.hasFocus).toBe(false);
    });
  });
  describe('events', () => {
    let page;
    beforeEach(async () => {
      page = await newSpecPage({
        components: [Textarea],
        html: `<scale-textarea></scale-textarea>`,
      });
    });

    it('onKeyDown', async () => {
      const mock = jest.fn();
      page.root.addEventListener('scale-keydown', mock);
      const target = page.root.querySelector('.textarea__control');
      await page.waitForChanges();
      await target.dispatchEvent(new KeyboardEvent('keydown'));
      await page.waitForChanges();
      expect(mock).toHaveBeenCalled();
    });

    it('onBlur', async () => {
      const mock = jest.fn();
      page.root.addEventListener('scale-blur', mock);
      const target = page.root.querySelector('.textarea__control');
      await page.waitForChanges();
      target.dispatchEvent(new Event('blur'));
      await page.waitForChanges();
      expect(mock).toHaveBeenCalled();
    });

    it('onFocus', async () => {
      const mock = jest.fn();
      page.root.addEventListener('scale-focus', mock);
      const target = page.root.querySelector('.textarea__control');
      await page.waitForChanges();
      target.dispatchEvent(new Event('focus'));
      await page.waitForChanges();
      expect(mock).toHaveBeenCalled();
    });

    it('onInput', async () => {
      const mock = jest.fn();
      page.root.addEventListener('scale-input', mock);
      const target = page.root.querySelector('.textarea__control');
      await page.waitForChanges();
      target.dispatchEvent(new Event('input'));
      await page.waitForChanges();
      expect(mock).toHaveBeenCalled();
    });

    it('onChange', async () => {
      const mock = jest.fn();
      page.root.emitChange = jest.fn();
      page.root.addEventListener('scale-change', mock);
      const target = page.root.querySelector('.textarea__control');
      await page.waitForChanges();
      target.dispatchEvent(new Event('change'));
      await page.waitForChanges();
      expect(mock).toHaveBeenCalled();
      expect(page.root.emitChange).not.toHaveBeenCalled();
    });
  });
  describe('branches', () => {
    let page;
    beforeEach(async () => {
      page = await newSpecPage({
        components: [Textarea],
        html: `<scale-textarea></scale-textarea>`,
      });
    });
    it('...', async () => {
      const mock = jest.fn();
      page.root.addEventListener('scale-change', mock);
      page.root.value = null;
      await page.waitForChanges();
      page.rootInstance.emitChange();
      await page.waitForChanges();
      expect(mock).toHaveBeenCalled();
    });
  });
});
