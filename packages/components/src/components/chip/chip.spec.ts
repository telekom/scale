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
    element.type = 'strong';
    expect(element.getCssClassMap()).toContain('chip--type-strong');

    element.color = 'green';
    expect(element.getCssClassMap()).toContain('chip--color-green');

    element.type = 'strong';
    expect(element.getCssClassMap()).toContain('chip--type-strong');

    element.selected = true;
    expect(element.getCssClassMap()).toContain('chip--selected');

    element.disabled = true;
    expect(element.getCssClassMap()).toContain('chip--disabled');

    element.href = 'http://example.com';
    expect(element.getCssClassMap()).toContain('chip--link');
  });
});
