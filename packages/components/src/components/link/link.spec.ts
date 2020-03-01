import { newSpecPage } from '@stencil/core/testing';
import { Link } from './link';
import { styles } from './link.styles';
import jss from 'jss';

describe('Link', () => {
  let element;
  let stylesheet;
  beforeEach(async () => {
    element = new Link();
    stylesheet = element.stylesheet = jss.createStyleSheet(styles as any);
  });

  it('should match snapshot', async () => {
    const page = await newSpecPage({
      components: [Link],
      html: `<t-link>default</t-link>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('should contain target="_blank" when openNewTab is set true', async () => {
    const page = await newSpecPage({
      components: [Link],
      html: `<t-link href="http://example.com" open-new-tab=true>Label</t-link>`,
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

  it('should handle css classes', () => {
    element.customClass = 'custom';
    expect(element.getCssClassMap()).toContain('custom');

    element.variant = 'primary';
    stylesheet.addRule('link--variant-primary', {});
    expect(element.getCssClassMap()).toContain(
      stylesheet.classes['link--variant-primary']
    );

    element.disabled = true;
    stylesheet.addRule('link--disabled', {});
    expect(element.getCssClassMap()).toContain(
      stylesheet.classes['link--disabled']
    );

    element.underline = true;
    stylesheet.addRule('link--underline', {});
    expect(element.getCssClassMap()).toContain(
      stylesheet.classes['link--underline']
    );
  });
});
