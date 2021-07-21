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

import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('rating-stars', () => {
  let page: E2EPage;
  let component: E2EElement;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(
      `<scale-rating-stars rating="3"></scale-rating-stars>`
    );
    component = await page.find('scale-rating-stars');
  });

  test('renders', async () => {
    expect(component).not.toBeNull();
  });

  test('find div with class rating, which is not null', async () => {
    const container = await page.find(
      'scale-rating-stars >>> [part="wrapper"]'
    );
    expect(container).not.toBeNull();
  });

  test('click star 3 will return a rating of 5', async () => {
    const star = await page.find('scale-rating-stars >>> [data-value="5"]');
    expect(await component.getProperty('rating')).toEqual(3);
    await star.click();
    expect(await component.getProperty('rating')).toEqual(5);
  });

  test('gets rating of 5 when navigating two to the right with ArrowRight', async () => {
    const container = await page.find(
      'scale-rating-stars >>> [part="range-slider"]'
    );
    await container.press('Tab');
    expect(await component.getProperty('rating')).toEqual(3);
    await container.press('ArrowRight');
    expect(await component.getProperty('rating')).toEqual(4);
    await container.press('ArrowRight');
    expect(await component.getProperty('rating')).toEqual(5);
  });

  test('clearing stars with two clicks', async () => {
    const star = await page.find('scale-rating-stars >>> [data-value="1"]');
    expect(await component.getProperty('rating')).toEqual(3);
    await star.click();
    expect(await component.getProperty('rating')).toEqual(1);
    await star.click();
    expect(await component.getProperty('rating')).toEqual(0);
  });

  test('gets rating of max when pressing End', async () => {
    const container = await page.find(
      'scale-rating-stars >>> [part="range-slider"]'
    );
    expect(await component.getProperty('rating')).toEqual(3);
    await container.press('Tab');
    await container.press('End');
    expect(await component.getProperty('rating')).toEqual(5);
    await container.press('Home');
    expect(await component.getProperty('rating')).toEqual(0);
  });
});
