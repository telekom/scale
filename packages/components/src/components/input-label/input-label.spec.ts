import { newSpecPage } from '@stencil/core/testing';
import { InputLabel } from './input-label';

describe('Input Label', () => {
  let element;
  beforeEach(async () => {
    element = new InputLabel();
  });

  it('should match snapshot', async () => {
    const page = await newSpecPage({
      components: [InputLabel],
      html: `<t-input-label>Label</t-input-label>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('should handle theme css class', () => {
    element.theme = 'default';
    expect(element.getCssClassMap()).toContain('input-label--theme-default');
  });

  it('should have a default css class', () => {
    expect(element.getCssClassMap()).toContain('input-label');
  });
});
