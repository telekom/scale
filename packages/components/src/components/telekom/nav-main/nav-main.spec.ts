import { newSpecPage } from '@stencil/core/testing';
import { NavMain } from './nav-main';

describe('NavMain', () => {
  let page;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [NavMain],
      html: `<scale-nav-main></scale-nav-main>`,
    });
  });
  it('should match snapshot', async () => {
    expect(page.root).toMatchSnapshot();
  });
  it('should handle is active props', async () => {
    const specPage = await newSpecPage({
      components: [NavMain],
      html: `
      <scale-nav-main
        is-active=true
        is-mega-menu-visible=true
        name='nameDummy'
      ></scale-nav-main>`,
    });
    expect(specPage.root).toMatchSnapshot();
  });
  it('should handle css classes', () => {
    const element = new NavMain();

    element.isMegaMenuVisible = true;
    expect(element.getCssClassMap()).toContain('mega-menu--visible');

    element.isActive = true;
    expect(element.getCssClassMap()).toContain('selected');
  });
});
