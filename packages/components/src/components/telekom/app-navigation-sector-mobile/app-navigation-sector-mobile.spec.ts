import { newSpecPage } from '@stencil/core/testing';
import { NavigationSectorMobile } from './app-navigation-sector-mobile';
import { MenuItem } from '../app-interfaces';

const nav = {
  name: 'nav1',
  id: 'menuItem1',
  href: '#',
  children: [
    {
      name: 'menuItem1-1',
      id: 'menuItem1-1',
      href: '#',
      level: 2,
      onClick: (event: KeyboardEvent) => {
        return event.key;
      },
    },
  ],
  level: 1,
};

describe('NavigationSectorMobile', () => {
  let page;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [NavigationSectorMobile],
      html: `<app-navigation-sector-mobile></app-navigation-sector-mobile>`,
    });
  });
  it('should match snapshot', async () => {
    expect(page.root).toMatchSnapshot();
  });
  it('should handle menuitem', async () => {
    const navigation: MenuItem[] = [nav];
    page.root.navigation = navigation;
    page.root.activeSectorId = nav.children[0].id;
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });
});
