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

  it('should update value when slider moved', () => {
    const event = {
      target: {
        value: 30,
        style: {
          background:
            'linear-gradient(to right, #409eff 0%, #409eff 0%, #e4e7ed 0%, #e4e7ed 100%)',
        },
      },
    };
    element.value = 0;
    element.updateValue(event);
    expect(element.value).toBe(30);
  });
});
