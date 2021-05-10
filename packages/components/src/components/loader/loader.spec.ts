import { newSpecPage } from '@stencil/core/testing';
import { Loader } from './loader';

describe('Loader', () => {
  let element;
  beforeEach(async () => {
    element = new Loader();
  });

  it('should match snapshot', async () => {
    const page = await newSpecPage({
      components: [Loader],
      html: `<scale-loader></scale-loader>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('should handle css classes', () => {
    element.alignment = 'vertical';
    expect(element.getCssClassMap()).toContain('spinner--alignment-vertical');
    element.variant = 'white';
    expect(element.getCssClassMap()).toContain('spinner--variant-white');
    element.size = 'large';
    expect(element.getCssClassMap()).toContain('spinner--size-large');
    element.text = 'Loading';
    expect(element.getCssClassMap()).toContain('spinner--text');
  });
});
