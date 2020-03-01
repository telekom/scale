import { newSpecPage } from '@stencil/core/testing';
import { Badge } from './badge';
import { styles } from './badge.styles';
import jss from 'jss';

describe('Badge', () => {
  let element;
  let stylesheet;
  beforeEach(async () => {
    element = new Badge();
    stylesheet = element.stylesheet = jss.createStyleSheet(styles as any);
  });

  it('should match snapshot', async () => {
    const page = await newSpecPage({
      components: [Badge],
      html: `<t-badge>Label</t-badge>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('should have a link', async () => {
    const page = await newSpecPage({
      components: [Badge],
      html: `<t-badge link="#">Label</t-badge>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('should handle css classes', () => {
    element.customClass = 'custom';
    expect(element.getCssClassMap()).toContain('custom');

    element.size = 'small';
    stylesheet.addRule('badge--size-small', {});
    expect(element.getCssClassMap()).toContain(
      stylesheet.classes['badge--size-small']
    );

    element.variant = 'primary';
    stylesheet.addRule('badge--variant-primary', {});
    expect(element.getCssClassMap()).toContain(
      stylesheet.classes['badge--variant-primary']
    );

    element.pill = true;
    expect(element.getCssClassMap()).toContain(
      stylesheet.classes['badge--pill']
    );

    element.link = true;
    expect(element.getCssClassMap()).toContain(
      stylesheet.classes['badge--link']
    );
  });
});
