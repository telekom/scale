import { newSpecPage } from '@stencil/core/testing';
import { Collapsible } from './collapsible';

describe('TextField', () => {
  let page;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [Collapsible],
      html: `<scale-collapsible></scale-collapsible>`,
    });
  });
  it('should match snapshot', async () => {
    expect(page.root).toMatchSnapshot();
  });
  it('should emit on click', async () => {
    const clickSpy = jest.fn();
    page.doc.addEventListener('scaleExpand', clickSpy);
    const buttonElement = page.root.shadowRoot.querySelector('button');
    buttonElement.click();
    await page.waitForChanges();
    expect(clickSpy).toHaveBeenCalled();
  });
});
