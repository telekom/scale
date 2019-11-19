import { newSpecPage } from '@stencil/core/testing';
import { InputText } from './input-text';

describe('InputText', () => {
  let element;
  beforeEach(async () => {
    element = new InputText();
  });

  it('should match snapshot', async () => {
    const page = await newSpecPage({
      components: [InputText],
      html: `<t-input-text>Label</t-input-text>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('should handle theme css class', () => {
    element.theme = 'default';
    expect(element.getCssClassMap()).toContain('input-text--theme-default');
  });

  it('should have a default css class', () => {
    expect(element.getCssClassMap()).toBe('input-text');
  });
});
