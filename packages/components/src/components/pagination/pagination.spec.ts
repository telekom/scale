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
                hide-border="true"
                page-size="11"
                start-element="2"
                total-elements="33"
                styles="style">
              </scale-pagination>`,
    });
    expect(specPage.rootInstance.hideBorders).toBe(true);
    expect(specPage.rootInstance.hideBorder).toBe(true);
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
    expect(clickSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        detail: expect.objectContaining({ direction: 'FIRST' }),
      })
    );
    expect(clickSpyLegacy).toHaveBeenCalledWith(
      expect.objectContaining({
        detail: expect.objectContaining({ direction: 'FIRST' }),
      })
    );
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
    expect(clickSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        detail: expect.objectContaining({ direction: 'PREVIOUS' }),
      })
    );
    expect(clickSpyLegacy).toHaveBeenCalledWith(
      expect.objectContaining({
        detail: expect.objectContaining({ direction: 'PREVIOUS' }),
      })
    );
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
    expect(clickSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        detail: expect.objectContaining({ direction: 'NEXT' }),
      })
    );
    expect(clickSpyLegacy).toHaveBeenCalledWith(
      expect.objectContaining({
        detail: expect.objectContaining({ direction: 'NEXT' }),
      })
    );
  });
  it('should emit when clicked goLastPage()', async () => {
    const clickSpy = jest.fn();
    const clickSpyLegacy = jest.fn();
    page.doc.addEventListener('scale-pagination', clickSpy);
    page.doc.addEventListener('scalePagination', clickSpyLegacy);
    const buttonElement = page.root.shadowRoot.querySelector(
      '.pagination__last-prompt'
    ) as HTMLElement;
    buttonElement.click();
    await page.waitForChanges();
    expect(clickSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        detail: expect.objectContaining({ direction: 'LAST' }),
      })
    );
    expect(clickSpyLegacy).toHaveBeenCalledWith(
      expect.objectContaining({
        detail: expect.objectContaining({ direction: 'LAST' }),
      })
    );
  });
  it('should show no start element when total elements is zero', async () => {
    const specPage = await newSpecPage({
      components: [Pagination],
      html: `<scale-pagination
                hide-borders="true"
                hide-border="true"
                page-size="11"
                start-element="0"
                total-elements="0"
                styles="style">
              </scale-pagination>`,
    });
    const paginationInfoElement =
      specPage.root.shadowRoot.querySelector('.pagination__info');
    const buttonPrev = specPage.root.shadowRoot.querySelector(
      '.pagination__prev-prompt'
    );
    expect(paginationInfoElement.textContent).toEqual('0-0 / 0');
    expect(buttonPrev.hasAttribute('disabled')).toBe(true);
  });
});
