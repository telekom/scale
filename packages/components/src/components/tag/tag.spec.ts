import { newSpecPage } from '@stencil/core/testing';
import { Tag } from './tag';
import { styles } from './tag.styles';
import jss from 'jss';

describe('Tag', () => {
  let element;
  let stylesheet;
  beforeEach(async () => {
    element = new Tag();
    stylesheet = element.stylesheet = jss.createStyleSheet(styles as any);
  });

  it('should match snapshot', async () => {
    const page = await newSpecPage({
      components: [Tag],
      html: `<scale-tag>Label</scale-tag>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('should have a link', async () => {
    const page = await newSpecPage({
      components: [Tag],
      html: `<scale-tag link="#">Label</scale-tag>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('should handle css classes', () => {
    element.customClass = 'custom';
    expect(element.getCssClassMap()).toContain('custom');

    element.size = 'small';
    stylesheet.addRule('tag--size-small', {});
    expect(element.getCssClassMap()).toContain(
      stylesheet.classes['tag--size-small']
    );

    element.variant = 'primary';
    stylesheet.addRule('tag--variant-primary', {});
    expect(element.getCssClassMap()).toContain(
      stylesheet.classes['tag--variant-primary']
    );

    element.link = true;
    expect(element.getCssClassMap()).toContain(stylesheet.classes['tag--link']);
  });
});
