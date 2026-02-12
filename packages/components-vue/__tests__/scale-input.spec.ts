import { mount } from '@vue/test-utils';
import { ScaleInput } from '../src';

describe('ScaleInput', () => {
  it('should set events on handler', () => {
    const Component = {
      template: `<ScaleInput v-on:click="$emit('click')"></ScaleInput>`,
    };
    const onClick = jest.fn();
    const wrapper = mount(Component, {
      components: { ScaleInput },
      listeners: {
        click: onClick,
      },
    });

    wrapper.find('scale-input').trigger('click');
    expect(onClick).toBeCalledTimes(1);
  });

  it('should work with v-model', async () => {
    const Component = {
      data() {
        return { text: '' };
      },
      template: `<ScaleInput v-model="text"></ScaleInput>`,
    };
    const wrapper = mount(Component, {
      components: { ScaleInput },
    });

    const inputEl = wrapper.find('scale-input');
    const wc = inputEl.element as HTMLScaleInputElement;

    // one way - input to data
    wc.value = 'value';
    inputEl.trigger('scale-change', { detail: { value: 'value' } });
    expect(wrapper.vm.$data.text).toEqual('value');

    // the other way - data to input
    await wrapper.setData({ text: 'changed' });
    expect(wc.value).toEqual('changed');
  });
});
