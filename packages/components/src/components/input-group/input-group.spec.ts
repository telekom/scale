import { newSpecPage } from '@stencil/core/testing';
import { InputGroup } from './input-group';

describe('Input Group', () => {
  let element;
  beforeEach(async () => {
    element = new InputGroup();
  });

  it('should match snapshot', async () => {
    const page = await newSpecPage({
      components: [InputGroup],
      html: `<t-input-group>Label</t-input-group>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('should handle theme css class', () => {
    element.theme = 'default';
    expect(element.getCssClassMap()).toContain('input-group--theme-default');
  });

  it('should have a default css class', () => {
    expect(element.getCssClassMap()).toContain('input-group');
  });
});
