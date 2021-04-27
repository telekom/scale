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
    const page = await newSpecPage({
      components: [Pagination],
      html: `<scale-pagination
                hide-borders="true"
                page-size="11"
                start-element="2"
                total-elements="33"
                styles="style">
              </scale-pagination>`,
    });
    expect(page.rootInstance.hideBorders).toBe(true);
    expect(page.rootInstance.pageSize).toBe(11);
    expect(page.rootInstance.startElement).toBe(2);
    expect(page.rootInstance.totalElements).toBe(33);
    expect(page.rootInstance.styles).toBe('style');
  });
  it('should emit when clicked goFirstPage()', async () => {
    const clickSpy = jest.fn();
    page.doc.addEventListener('scalePagination', clickSpy);
    const buttonElement = (page.root.shadowRoot.querySelector(
      '.pagination__first-prompt'
    ) as HTMLElement);
    buttonElement.click();
    await page.waitForChanges();
    expect(clickSpy).toHaveBeenCalled();
  });
  it('should emit when clicked goPreviousPage()', async () => {
    const clickSpy = jest.fn();
    page.doc.addEventListener('scalePagination', clickSpy);
    const buttonElement = (page.root.shadowRoot.querySelector(
      '.pagination__prev-prompt'
    ) as HTMLElement);
    buttonElement.click();
    await page.waitForChanges();
    expect(clickSpy).toHaveBeenCalled();
  });
  it('should emit when clicked goNextPage()', async () => {
    const clickSpy = jest.fn();
    page.doc.addEventListener('scalePagination', clickSpy);
    const buttonElement = (page.root.shadowRoot.querySelector(
      '.pagination__next-prompt'
    ) as HTMLElement);
    buttonElement.click();
    await page.waitForChanges();
    expect(clickSpy).toHaveBeenCalled();
  });
  it('should emit when clicked golastPage()', async () => {
    const clickSpy = jest.fn();
    page.doc.addEventListener('scalePagination', clickSpy);
    const buttonElement = (page.root.shadowRoot.querySelector(
      '.pagination__last-prompt'
    ) as HTMLElement);
    buttonElement.click();
    await page.waitForChanges();
    expect(clickSpy).toHaveBeenCalled();
  });
});