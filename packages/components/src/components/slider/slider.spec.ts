import { newSpecPage } from '@stencil/core/testing';
import { Slider } from './slider';

describe('Slider', () => {
  let element;
  beforeEach(async () => {
    element = new Slider();
  });

  it('should match snapshot', async () => {
    const page = await newSpecPage({
      components: [Slider],
      html: `<t-slider>Label</t-slider>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('should handle a custom css class', () => {
    element.customClass = 'custom';
    expect(element.getCssClassMap()).toContain('custom');
  });

  it('should have a default css class', () => {
    expect(element.getCssClassMap()).toContain('slider');
  });
});
