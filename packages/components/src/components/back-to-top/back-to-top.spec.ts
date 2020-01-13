import { newSpecPage } from '@stencil/core/testing';
import { BackToTop } from './back-to-top';

describe('BackToTop', () => {
  let element;
  beforeEach(async () => {
    element = new BackToTop();
  });

  it('should match snapshot', async () => {
    const page = await newSpecPage({
      components: [BackToTop],
      html: `<t-back-to-top></t-back-to-top>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('should have class back to top container visible', () => {
    element.visible = true;
    expect(element.getCssClassMap()).toContain(
      'back-to-top__container-visible'
    );
  });

  it('set visible to false when scrollTop is smaller than initial visibilityHeight', () => {
    element.visible = true;
    element.visibilityHeight = 200;
    const event = { target: { documentElement: { scrollTop: 200 } } };
    element.handleScroll(event);
    expect(element.visible).toBe(false);
  });

  it('set visible to true when scrollTop is greater than initial visibilityHeight', () => {
    element.visible = false;
    element.visibilityHeight = 200;
    const event = { target: { documentElement: { scrollTop: 400 } } };
    element.handleScroll(event);
    expect(element.visible).toBe(true);
  });

  it('it should call scrollTo function when scrollToTop function is called', () => {
    window.scrollTo = jest.fn();
    element.scrollToTop();
    expect(window.scrollTo).toBeCalled();
  });
});
