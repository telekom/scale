import { mount } from '@vue/test-utils';
import { ScaleSlider } from '../src';

describe('ScaleSlider', () => {
  it('should work with v-model', async () => {
    const Component = {
      data() {
        return { numberValue: 0 };
      },
      template: `<ScaleSlider v-model="numberValue"></ScaleSlider>`,
    };
    const wrapper = mount(Component, {
      components: { ScaleSlider },
    });

    const sliderEl = wrapper.find('scale-slider');
    const wc = sliderEl.element as HTMLScaleSliderElement;

    // one way - input to data
    wc.value = 50;
    sliderEl.trigger('scale-change', { detail: { value: 50 } });
    expect(wrapper.vm.$data.numberValue).toEqual(50);

    // the other way - data to input
    await wrapper.setData({ numberValue: 20 });
    expect(wc.value).toEqual('20');
  });
});
