import { newSpecPage } from '@stencil/core/testing';
import { TabHeader } from './tab-header';

describe('TabHeader', () => {
  let page;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [TabHeader],
      html: `<scale-tab-header></scale-tab-header>`,
    });
  });
  it('should match snapshot', async () => {
    expect(page.root).toMatchSnapshot();
  });

  it('should handle selected', async () => {
    const page = await newSpecPage({
      components: [TabHeader],
      html: `<scale-tab-header selected=true></scale-tab-header>`,
    });
    page.root.shadowRoot.querySelector('slot').remove();
    page.rootInstance.selected = false;
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });

  it('should handle css classes', () => {
    const element = new TabHeader();

    element.selected = true;
    expect(element.getCssClassMap()).toContain('selected');

    element.small = true;
    expect(element.getCssClassMap()).toContain('small');

    element.hasFocus = true;
    expect(element.getCssClassMap()).toContain('has-focus');
  });

  it('should handle blur event', async () => {
    const element = page.root.shadowRoot.host;
    await element.dispatchEvent(new Event('blur'));
    await page.waitForChanges();
    expect(page.rootInstance.hasFocus).toBeFalsy;
  });

  it('should handle focus event', async () => {
    const element = page.root.shadowRoot.host;
    await element.dispatchEvent(new Event('focus'));
    await page.waitForChanges();
    expect(page.rootInstance.hasFocus).toBeTruthy;
  });
});
