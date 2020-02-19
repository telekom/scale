import { newSpecPage } from '@stencil/core/testing';
import { Input } from './input';

describe('Input', () => {
  let element;
  beforeEach(async () => {
    element = new Input();
  });

  it('should match snapshot', async () => {
    const page = await newSpecPage({
      components: [Input],
      html: `<t-input></t-input>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('should handle a custom css class', () => {
    element.customClass = 'custom';
    expect(element.getCssClassMap()).toContain('custom');
  });

  it('should handle theme css class', () => {
    element.theme = 'default';
    expect(element.getCssClassMap()).toContain('input--theme-default');
  });

  it('should have a default css class', () => {
    expect(element.getCssClassMap()).toContain('input');
  });
});
