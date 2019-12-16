import { newSpecPage } from '@stencil/core/testing';
import { Tooltip } from './tooltip';

describe('Tooltip', () => {
  let element;
  beforeEach(async () => {
    element = new Tooltip();
  });

  it('should match snapshot', async () => {
    const page = await newSpecPage({
      components: [Tooltip],
      html: `<t-tooltip>Tooltip</t-tooltip>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('should handle size css class', () => {
    element.size = 'default';
    expect(element.getCssClassMap()).toContain('tooltip--size-default');
  });

  it('should handle placement css class', () => {
    element.placement = 'default';
    expect(element.getCssClassMap()).toContain('tooltip--placement-default');
  });
});
