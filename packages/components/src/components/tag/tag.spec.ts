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
      html: `<t-tag>Label</t-tag>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  // it('should have class variant primary', () => {
  //   element.variant = 'primary';
  //   expect(element.getCssClassMap()).toContain('tag--variant-primary');
  // });

  // it('should have class link ', () => {
  //   element.link = '#';
  //   expect(element.getCssClassMap()).toContain('tag--link');
  // });

  // it('should render pill tag', () => {
  //   element.pill = true;
  //   expect(element.getCssClassMap()).toContain('tag--pill');
  // });

  it('should have a link', async () => {
    const page = await newSpecPage({
      components: [Tag],
      html: `<t-tag link="#">Label</t-tag>`,
    });
    expect(page.root).toMatchSnapshot();
  });
});
