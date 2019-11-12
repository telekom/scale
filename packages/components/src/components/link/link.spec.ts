import { newSpecPage } from '@stencil/core/testing';
import { Link } from './link';

describe('Link', () => {
  let element;
  beforeEach(async () => {
    element = new Link();
  });

  it('should match snapshot', async () => {
    const page = await newSpecPage({
      components: [Link],
      html: `<t-link>default</t-link>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('should have class variant primary', () => {
    element.variant = 'primary';
    expect(element.getCssClassMap()).toContain('link--variant-primary');
  });

  it('should have class disabled ', () => {
    element.disabled = true;
    expect(element.getCssClassMap()).toContain('link--disabled');
  });

  it('should have class underline', () => {
    element.underline = true;
    expect(element.getCssClassMap()).toContain('link--underline');
  });

  it('should contain target="_blank" when newTag is set true', async () => {
    const page = await newSpecPage({
      components: [Link],
      html: `<t-link href="http://example.com" new-tag=true>Label</t-link>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('should have link href value when href value is set', async () => {
    const page = await newSpecPage({
      components: [Link],
      html: `<t-link href="http://example.com">Label</t-link>`,
    });
    expect(page.root).toMatchSnapshot();
  });
});
