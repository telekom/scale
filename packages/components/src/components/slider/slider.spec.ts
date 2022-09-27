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
import { Slider } from './slider';

async function simulateKeyboardEvent(
  page: SpecPage,
  strEvent: string,
  querySelectorString: string,
  key: string
) {
  const event = new KeyboardEvent(strEvent, {
    view: window,
    bubbles: true,
    cancelable: true,
    key,
  });
  const element = page.root.shadowRoot.querySelector(querySelectorString);
  !element.dispatchEvent(event); // tslint:disable-line
}

async function simulateMouseEvent(
  page: SpecPage,
  strEvent: string,
  querySelectorString: string
) {
  const event = new MouseEvent(strEvent, {
    view: window,
    bubbles: true,
    cancelable: true,
  });
  const element = page.root.shadowRoot.querySelector(querySelectorString);
  !element.dispatchEvent(event); // tslint:disable-line
}

describe('Slider', () => {
  it('should match snapshot', async () => {
    const page = await newSpecPage({
      components: [Slider],
      html: `<scale-slider>Label</scale-slider>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('should match snapshot', async () => {
    const page = await newSpecPage({
      components: [Slider],
      html: `<scale-slider value="10">Label</scale-slider>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  describe('props', () => {
    it('check default props', async () => {
      const page = await newSpecPage({
        components: [Slider],
        html: `<scale-slider></scale-slider>`,
      });
      expect(page.rootInstance.min).toBe(0);
      expect(page.rootInstance.max).toBe(100);
      expect(page.rootInstance.step).toBe(1);
      expect(page.rootInstance.unit).toBe('');
      expect(page.rootInstance.decimals).toBe(0);
      expect(page.rootInstance.showValue).toBe(true);
      expect(page.rootInstance.disabled).toBe(false);
    });

    it('check props being set', async () => {
      const page = await newSpecPage({
        components: [Slider],
        html: `<scale-slider></scale-slider>`,
      });
      page.root.value = 50;
      page.root.min = 10;
      page.root.max = 90;
      page.root.step = 2;
      page.root.unit = '';
      page.root.decimals = 2;
      page.root.label = 'slider label';
      page.root.helperText = 'helper text';
      page.root.showValue = false;
      page.root.disabled = 'true';
      page.root.sliderId = 'sliderID';
      page.root.styles = 'background : red';
      await page.waitForChanges();
      expect(page.rootInstance.value).toBe(50);
      expect(page.rootInstance.min).toBe(10);
      expect(page.rootInstance.max).toBe(90);
      expect(page.rootInstance.step).toBe(2);
      expect(page.rootInstance.unit).toBe('');
      expect(page.rootInstance.decimals).toBe(2);
      expect(page.rootInstance.label).toBe('slider label');
      expect(page.rootInstance.helperText).toBe('helper text');
      expect(page.rootInstance.showValue).toBe(false);
      expect(page.rootInstance.disabled).toBe(true);
      expect(page.rootInstance.sliderId).toBe('sliderID');
      expect(page.rootInstance.styles).toBe('background : red');
    });
  });

  it('keydown [part="thumb"] with ArrowRight', async () => {
    const page = await newSpecPage({
      components: [Slider],
      html: `<scale-slider></scale-slider>`,
    });
    page.root.value = 50;
    simulateKeyboardEvent(page, 'keydown', '[part="thumb"]', 'ArrowRight');
    expect(await page.rootInstance.value).toBe(51);
  });

  it('input events', async () => {
    const page = await newSpecPage({
      components: [Slider],
      html: `<scale-slider></scale-slider>`,
    });
    const inputSpy = jest.fn();
    const inputSpyLegacy = jest.fn();
    page.doc.addEventListener('scale-input', inputSpy);
    page.doc.addEventListener('scaleInput', inputSpyLegacy);
    const element = page.root.shadowRoot.querySelector('[part="thumb"]');
    element.dispatchEvent(new Event('keydown'));
    await page.waitForChanges();
    expect(inputSpy).toHaveBeenCalled();
    expect(inputSpyLegacy).toHaveBeenCalled();
  });

  it('keydown [part="thumb"] with ArrowUp', async () => {
    const page = await newSpecPage({
      components: [Slider],
      html: `<scale-slider></scale-slider>`,
    });
    page.root.value = 50;
    simulateKeyboardEvent(page, 'keydown', '[part="thumb"]', 'ArrowUp');
    expect(await page.rootInstance.value).toBe(60);
  });

  it('mousedown [part="thumb-wrapper"]', async () => {
    const page = await newSpecPage({
      components: [Slider],
      html: `<scale-slider></scale-slider>`,
    });
    page.root.dragging = false;
    expect(await page.rootInstance.dragging).toBe(undefined);
    simulateMouseEvent(page, 'mousedown', '[part="thumb-wrapper"]');
    expect(await page.rootInstance.dragging).toBe(true);
  });
});
