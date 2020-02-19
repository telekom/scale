import { newSpecPage } from '@stencil/core/testing';
import { Text } from './text';

describe('Text', () => {
  let element;
  beforeEach(async () => {
    element = new Text();
  });

  it('should match snapshot', async () => {
    const page = await newSpecPage({
      components: [Text],
      html: `<t-text>Label</t-text>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('should handle a custom css class', () => {
    element.customClass = 'custom';
    expect(element.getCssClassMap()).toContain('custom');
  });

  it('should handle theme css class', () => {
    element.theme = 'default';
    expect(element.getCssClassMap()).toContain('text--theme-default');
  });

  it('should have a default css class', () => {
    expect(element.getCssClassMap()).toContain('text');
  });
});
