import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { NavIcon } from './nav-icon';
describe('nav-icon', () => {
  let page: SpecPage;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [NavIcon],
      html: `<scale-nav-icon></scale-nav-icon>`,
    });
  });
  it('should match snapshot', async () => {
    expect(page.root).toMatchSnapshot();
  });
  it('should reflect to set attributes/props', async () => {
    const page = await newSpecPage({
      components: [NavIcon],
      html: `<scale-nav-icon
                is-active="true"
                href="href"
                click-link="true"
                icon="icon"
                is-mobile-menu-open="true"
                ref-mobile-menu-toggle="">
              </scale-nav-icon>`,
    });
    expect(page.rootInstance.isActive).toBe(true);
    expect(page.rootInstance.href).toBe('href');
    expect(page.rootInstance.clickLink).toBe('true');
    expect(page.rootInstance.icon).toBe('icon');
    expect(page.rootInstance.isMobileMenuOpen).toBe(true);
    expect(page.rootInstance.refMobileMenuToggle).toBe('');
  });
  it('should trigger onClick()', async () => {
    page.root.clickLink = jest.fn();
    const anchor = page.root.querySelector(
      '.meta-navigation__item-link'
    ) as HTMLElement;
    await page.waitForChanges();
    anchor.click();
    await page.waitForChanges();
    expect(page.root.clickLink).toHaveBeenCalled();
  });
  it('should trigger onKeyDown', async () => {
    page.root.clickLink = jest.fn();
    page.root.refMobileMenuToggle = () => {};
    const anchor = page.root.querySelector(
      '.meta-navigation__item-link'
    ) as HTMLElement;
    await page.waitForChanges();
    anchor.dispatchEvent(
      new KeyboardEvent('keydown', {
        view: window,
        bubbles: true,
        cancelable: true,
        key: 'Escape',
      })
    );
    await page.waitForChanges();
    expect(page.root.clickLink).toHaveBeenCalled();
  });
  it('should trigger onClick()', async () => {
    page.root.clickLink = jest.fn();
    const anchor = page.root.querySelector(
      '.meta-navigation__item-link'
    ) as HTMLElement;
    await page.waitForChanges();
    anchor.dispatchEvent(
      new KeyboardEvent('keydown', {
        view: window,
        bubbles: true,
        cancelable: true,
        key: 'Escape',
      })
    );
    await page.waitForChanges();
    expect(page.root.clickLink).not.toHaveBeenCalled();
  });
});