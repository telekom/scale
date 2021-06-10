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
      `<scale-rating-stars precision="1"></scale-rating-stars>`
    );
    component = await page.find('scale-rating-stars');
  });

  test('renders', async () => {
    expect(component).not.toBeNull();
  });

  test('find div with class rating, which is not null', async () => {
    const container = await page.find('scale-rating-stars >>> .rating');
    expect(container).not.toBeNull();
  });

  test('click star 3 will return a rating of 3', async () => {
    const star = await page.find('scale-rating-stars >>> #star-3');
    expect(await component.getProperty('rating')).toEqual(0);
    await star.click();
    expect(await component.getProperty('rating')).toEqual(3);
  });

  test('click star 3 will return a rating of 2.5 (precision="0.5")', async () => {
    page = await newE2EPage();
    await page.setContent(
      `<scale-rating-stars precision="0.5"></scale-rating-stars>`
    );
    component = await page.find('scale-rating-stars');

    const star = await page.find('scale-rating-stars >>> #star-3');
    expect(await component.getProperty('rating')).toEqual(0);
    await star.click();
    expect(await component.getProperty('rating')).toEqual(2.5);
  });

  test('has no class rating-focus initially', async () => {
    const container = await page.find('scale-rating-stars >>> .rating');
    expect(container).not.toHaveClass('rating-focus');
  });

  test('gets class rating-focus on press Tab and loses it on click', async () => {
    const container = await page.find('scale-rating-stars >>> .rating');
    await container.press('Tab');
    expect(container).toHaveClass('rating-focus');
    await container.click();
    expect(container).not.toHaveClass('rating-focus');
  });

  test('gets class rating-focus on press Tab and keeps it on press Tab', async () => {
    const container = await page.find('scale-rating-stars >>> .rating');
    await container.press('Tab');
    expect(container).toHaveClass('rating-focus');
    await container.press('Tab');
    expect(container).toHaveClass('rating-focus');
  });

  test('gets rating of 2 when navigating two to the right with ArrowRight', async () => {
    const container = await page.find('scale-rating-stars >>> .rating');
    await container.press('Tab');
    expect(container).toHaveClass('rating-focus');
    await container.press('ArrowRight');
    await container.press('ArrowRight');
    expect(await component.getProperty('rating')).toEqual(2);
  });

  test('gets rating of 2 when navigating two to the right with ArrowRight (precision="0.5")', async () => {
    page = await newE2EPage();
    await page.setContent(
      `<scale-rating-stars precision="0.5"></scale-rating-stars>`
    );
    component = await page.find('scale-rating-stars');
    const container = await page.find('scale-rating-stars >>> .rating');
    await container.press('Tab');
    await container.press('ArrowRight');
    await container.press('ArrowRight');
    await container.press('ArrowRight');
    await container.press('ArrowRight');
    expect(await component.getProperty('rating')).toEqual(2);
  });

  test('gets rating of 4 when navigating to star-4 with ArrowRight and leaving with Tab', async () => {
    const container = await page.find('scale-rating-stars >>> .rating');
    await container.press('Tab');
    expect(container).toHaveClass('rating-focus');
    await container.press('ArrowRight');
    await container.press('ArrowRight');
    await container.press('ArrowRight');
    await container.press('ArrowRight');
    await container.press('Tab');
    expect(await component.getProperty('rating')).toEqual(4);
  });

  test('gets rating of max when pressing End', async () => {
    const container = await page.find('scale-rating-stars >>> .rating');
    await container.press('Tab');
    await container.press('End');
    expect(await component.getProperty('rating')).toEqual(5);
  });

  test('gets rating of 0 when pressing Home', async () => {
    const container = await page.find('scale-rating-stars >>> .rating');
    await container.press('Tab');
    await container.press('End');
    await container.press('Home');
    expect(await component.getProperty('rating')).toEqual(0);
  });
});
