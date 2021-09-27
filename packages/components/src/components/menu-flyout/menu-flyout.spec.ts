import { newSpecPage } from '@stencil/core/testing';
import { MenuFlyout } from './menu-flyout';

jest.useFakeTimers();

describe('MenuFlyout‚', () => {
  describe('snapshot tests', () => {
    it('should handle menu flyout items', async () => {
      const page = await newSpecPage({
        components: [MenuFlyout],
        html: `
                <scale-menu-flyout>
                    <div slot="trigger" style="padding: 20px; cursor: pointer; background: var(--scl-color-blue-40)"></div>
                    <scale-menu-flyout-list>
                        <scale-menu-flyout-item>Item 1</scale-menu-flyout-item>
                        <scale-menu-flyout-item>Item 2</scale-menu-flyout-item>
                        <scale-menu-flyout-item>Item 3</scale-menu-flyout-item>
                    </scale-menu-flyout-list>
                </scale-menu-flyout>`,
      });
      expect(page.root).toMatchSnapshot();
    });
  });
  describe('prop test', async () => {
    it('should handle props', async () => {
      const page = await newSpecPage({
        components: [MenuFlyout],
        html: `
                <scale-menu-flyout>
                    <div slot="trigger" style="padding: 20px; cursor: pointer; background: var(--scl-color-blue-40)"></div>
                    <scale-menu-flyout-list>
                        <scale-menu-flyout-item>Item 1</scale-menu-flyout-item>
                        <scale-menu-flyout-item>Item 2</scale-menu-flyout-item>
                        <scale-menu-flyout-item>Item 3</scale-menu-flyout-item>
                    </scale-menu-flyout-list>
                </scale-menu-flyout>`,
      });
      const setDirection = 'bottom-right';
      page.rootInstance.direction = setDirection;

      expect(page.rootInstance.direction).toBe(setDirection);
    });
  });
  describe('on slot change test', async () => {
    it('should handle slot change', async () => {
      const page = await newSpecPage({
        components: [MenuFlyout],
        html: `
                  <scale-menu-flyout>
                      <div slot="trigger" style="padding: 20px; cursor: pointer; background: var(--scl-color-blue-40)"></div>
                      <scale-menu-flyout-list>
                          <scale-menu-flyout-item>Item 1</scale-menu-flyout-item>
                          <scale-menu-flyout-item>Item 2</scale-menu-flyout-item>
                          <scale-menu-flyout-item>Item 3</scale-menu-flyout-item>
                      </scale-menu-flyout-list>
                  </scale-menu-flyout>`,
      });
      page.root.shadowRoot.querySelector('slot').removeAttribute('slot');
      expect(page.root).toMatchSnapshot();
    });

    it('should handle css classes', () => {
      let element = new MenuFlyout();
      element.open = true;
      expect(element.getCssClassMap()).toContain('menu--open');
    });
    it('should handle on Catcher', async () => {
      let element = new MenuFlyout();
      const spy = jest.spyOn(element, 'emitOpenState');
      element.open = true;
      element.onCatcherClick(new Event('click'));
      expect(spy).toBeCalled();
      expect(element.open).toBeFalsy;
    });
    //     it('should handle on Catcher', async () => {
    //       const page = await newSpecPage({
    //         components: [MenuFlyout],
    //         html: `
    //                     <scale-menu-flyout>
    //                         <div slot="trigger" style="padding: 20px; cursor: pointer; background: var(--scl-color-blue-40)"></div>
    //                         <scale-menu-flyout-list>
    //                             <scale-menu-flyout-item>Item 1</scale-menu-flyout-item>
    //                             <scale-menu-flyout-item>Item 2</scale-menu-flyout-item>
    //                             <scale-menu-flyout-item>Item 3</scale-menu-flyout-item>
    //                         </scale-menu-flyout-list>
    //                     </scale-menu-flyout>`,
    //       });
    //       const mock = jest.fn();
    //       const mockLegacy = jest.fn();
    //       page.root.open = true;
    //       page.root.direction = 'left';
    //       page.root.shadowRoot.addEventListener('scale-open', mock);
    //       page.root.shadowRoot.addEventListener('scaleOpen', mockLegacy);
    //       await page.waitForChanges();
    //       const elem = page.root.shadowRoot.querySelector('.menu__click-catcher');
    //       await page.waitForChanges();
    //       elem.dispatchEvent(new Event('click'));
    //       await page.waitForChanges();
    //       expect(mock).toHaveBeenCalled();
    //       expect(mockLegacy).toHaveBeenCalled();
    //     });
  });
});
