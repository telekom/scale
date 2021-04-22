import { newSpecPage } from '@stencil/core/testing';
import { AppFooter } from './app-footer';

describe('AppFooter', () => {
  let page;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [AppFooter],
      html: `<scale-app-footer></scale-app-footer>`,
    });
  });

  it('should match snapshot', async () => {
    expect(page.root).toMatchSnapshot();
  });
  it('should handle css classes', () => {
    const element = new AppFooter();

    element.variant = 'standard';
    expect(element.getCssClassMap()).toContain('footer--variant-standard');
  });
});
