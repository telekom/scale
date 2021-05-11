import { newSpecPage } from '@stencil/core/testing';
import { LoadingSpinner } from './loading-spinner';

describe('LoadingSpinner', () => {
  let element;
  beforeEach(async () => {
    element = new LoadingSpinner();
  });

  it('should match snapshot', async () => {
    const page = await newSpecPage({
      components: [LoadingSpinner],
      html: `<scale-loading-spinner></scale-loading-spinner>`,
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
