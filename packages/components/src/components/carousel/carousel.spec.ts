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
import { Carousel } from './carousel';

describe('Carousel', () => {
  let element;

  beforeEach(async () => {
    element = new Carousel();
  });

  it('should match snapshot', async () => {
    const page = await newSpecPage({
      components: [Carousel],
      html: `<scale-carousel>Label</scale-carousel>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('should set correct translate value when clicking arrow prev', () => {
    element.value = 0;
    element.slidesArray = [0, 1, 2, 3];
    element.handleSlideChange('prev');
    expect(element.value).toBe(-300);
  });

  it('should set correct translate value when clicking arrow next', () => {
    element.value = 100;
    element.slidesArray = [0, 1, 2, 3];
    element.handleSlideChange('next');
    expect(element.value).toBe(0);
  });

  it('should set correct active slide', () => {
    element.value = -300;
    element.setActiveSlide(2);
    expect(element.value).toBe(-200);
  });

  it('should set correct transform value based on the carousel container direction', () => {
    element.value = -300;
    element.vertical = true;
    element.setTransformValue();
    expect(element.setTransformValue()).toBe('translateY(-300%)');
  });

  it('should set correct transform value based on the carousel container direction', () => {
    element.value = -200;
    element.setTransformValue();
    expect(element.setTransformValue()).toBe('translateX(-200%)');
  });

  it('function setActiveCssClass should return (cssClass)string', () => {
    const functionIndex = 1;
    element.value = 100;
    expect(element.setActiveCssClass(functionIndex)).toBe(
      'carousel__indicator--active'
    );
  });

  it('function setActiveCssClass should return empty string', () => {
    const functionIndex = 0;
    element.value = 100;
    expect(element.setActiveCssClass(functionIndex)).toBe('');
  });

  it('function handleSlideChange set to [prev] should return value plus 100', () => {
    const value = 1;
    element.value = value;
    element.handleSlideChange('prev');
    expect(element.value).toBe(101);
  });

  it('function handleSlideChange set to [prev] should return right value', () => {
    const value = 0;
    const slidesArray = [];
    element.value = value;
    element.slidesArray = slidesArray;
    element.handleSlideChange('prev');
    expect(element.value).toBe(100);
  });

  it('function handleSlideChange set to [next] should return value minus 100', () => {
    const value = 100;
    const slidesArray = [];
    element.value = value;
    element.slidesArray = slidesArray;
    element.handleSlideChange('next');
    expect(element.value).toBe(0);
  });

  it('function handleSlideChange set to [next] should return right value', () => {
    const value = 101;
    const slidesArray = [];
    element.value = value;
    element.slidesArray = slidesArray;
    element.handleSlideChange('next');
    expect(element.value).toBe(1);
  });
});
