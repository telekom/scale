import { newSpecPage } from '@stencil/core/testing';
import { Chip } from './chip';

describe('Chip', () => {
  let element;

  beforeEach(async () => {
    element = new Chip();
  });

  it('should match snapshot', async () => {
    const page = await newSpecPage({
      components: [Chip],
      html: `<scale-chip label="Label Text"></scale-chip>`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should handle css classes', () => {
    element.selected = true;
    expect(element.getCssClassMap()).toContain('chip--selected');

    element.disabled = true;
    expect(element.getCssClassMap()).toContain('chip--disabled');
  });
});
