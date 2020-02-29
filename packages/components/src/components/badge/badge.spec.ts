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

  // it('should have a default css class', () => {
  //   expect(element.getCssClassMap()).toBe('badge');
  // });

  it('should have a link', async () => {
    const page = await newSpecPage({
      components: [Badge],
      html: `<t-badge link="#">Label</t-badge>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  // it('should handle size css class', () => {
  //   element.size = 'small';
  //   expect(element.getCssClassMap()).toContain('badge--size-small');
  // });

  // it('should have class variant primary', () => {
  //   element.variant = 'primary';
  //   expect(element.getCssClassMap()).toContain('badge--variant-primary');
  // });

  // it('should render pill badge', () => {
  //   element.pill = true;
  //   expect(element.getCssClassMap()).toContain('badge--pill');
  // });
});
