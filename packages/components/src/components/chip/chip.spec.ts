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
      html: `<scale-chip>Label</scale-chip>`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should handle css classes', () => {
    element.selected = true;
    expect(element.getCssClassMap()).toContain('chip--selected');

    element.disabled = true;
    expect(element.getCssClassMap()).toContain('chip--disabled');
  });

  it('should allow customizing checkmark accessibility', async () => {
    const page = await newSpecPage({
      components: [Chip],
      html: `<scale-chip selected checkmark-accessibility-title="translated" checkmark-decorative="true">Label</scale-chip>`,
    });
    const icon = page.root.shadowRoot.querySelector(
      'scale-icon-action-checkmark'
    ) as HTMLElement;
    expect(icon.getAttribute('accessibility-title')).toBe('translated');
    expect(icon.hasAttribute('decorative')).toBe(true);
  });
});
