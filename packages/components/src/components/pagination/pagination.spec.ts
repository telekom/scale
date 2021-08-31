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
import { Pagination } from './pagination';
describe('pagination', () => {
  let page: SpecPage;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [Pagination],
      html: `<scale-pagination></scale-pagination>`,
    });
  });
  it('should match snapshot', async () => {
    expect(page.root).toMatchSnapshot();
  });
  it('should reflect to set attributes/props', async () => {
    const specPage = await newSpecPage({
      components: [Pagination],
      html: `<scale-pagination
                hide-borders="true"
                page-size="11"
                start-element="2"
                total-elements="33"
                styles="style">
              </scale-pagination>`,
    });
    expect(specPage.rootInstance.hideBorders).toBe(true);
    expect(specPage.rootInstance.pageSize).toBe(11);
    expect(specPage.rootInstance.startElement).toBe(2);
    expect(specPage.rootInstance.totalElements).toBe(33);
    expect(specPage.rootInstance.styles).toBe('style');
  });
  it('should emit when clicked goFirstPage()', async () => {
    const clickSpy = jest.fn();
    const clickSpyLegacy = jest.fn();
    page.doc.addEventListener('scale-pagination', clickSpy);
    page.doc.addEventListener('scalePagination', clickSpyLegacy);
    const buttonElement = page.root.shadowRoot.querySelector(
      '.pagination__first-prompt'
    ) as HTMLElement;
    buttonElement.click();
    await page.waitForChanges();
    expect(clickSpy).toHaveBeenCalled();
    expect(clickSpyLegacy).toHaveBeenCalled();
  });
  it('should emit when clicked goPreviousPage()', async () => {
    const clickSpy = jest.fn();
    const clickSpyLegacy = jest.fn();
    page.doc.addEventListener('scale-pagination', clickSpy);
    page.doc.addEventListener('scalePagination', clickSpyLegacy);
    const buttonElement = page.root.shadowRoot.querySelector(
      '.pagination__prev-prompt'
    ) as HTMLElement;
    buttonElement.click();
    await page.waitForChanges();
    expect(clickSpy).toHaveBeenCalled();
    expect(clickSpyLegacy).toHaveBeenCalled();
  });
  it('should emit when clicked goNextPage()', async () => {
    const clickSpy = jest.fn();
    const clickSpyLegacy = jest.fn();
    page.doc.addEventListener('scale-pagination', clickSpy);
    page.doc.addEventListener('scalePagination', clickSpyLegacy);
    const buttonElement = page.root.shadowRoot.querySelector(
      '.pagination__next-prompt'
    ) as HTMLElement;
    buttonElement.click();
    await page.waitForChanges();
    expect(clickSpy).toHaveBeenCalled();
    expect(clickSpyLegacy).toHaveBeenCalled();
  });
  it('should emit when clicked golastPage()', async () => {
    const clickSpy = jest.fn();
    const clickSpyLegacy = jest.fn();
    page.doc.addEventListener('scale-pagination', clickSpy);
    page.doc.addEventListener('scalePagination', clickSpyLegacy);
    const buttonElement = page.root.shadowRoot.querySelector(
      '.pagination__last-prompt'
    ) as HTMLElement;
    buttonElement.click();
    await page.waitForChanges();
    expect(clickSpy).toHaveBeenCalled();
    expect(clickSpyLegacy).toHaveBeenCalled();
  });
});
