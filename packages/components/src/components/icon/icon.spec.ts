import { newSpecPage } from '@stencil/core/testing';
import { Icon } from './icon';
import { styles } from './icon.styles';
import jss from 'jss';

describe('Icon', () => {
  let element;
  let stylesheet;
  beforeEach(async () => {
    element = new Icon();
    stylesheet = element.stylesheet = jss.createStyleSheet(styles as any);
  });

  it('should match snapshot', async () => {
    const page = await newSpecPage({
      components: [Icon],
      html: `<t-icon path="d 10 10">Label</t-icon>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  // it('should handle a custom css class', () => {
  //   element.customClass = 'custom';
  //   expect(element.getCssClassMap()).toContain('custom');
  // });

  // it('should handle theme css class', () => {
  //   element.theme = 'default';
  //   expect(element.getCssClassMap()).toContain('icon--theme-default');
  // });

  // it('should have a default css class', () => {
  //   expect(element.getCssClassMap()).toContain('icon');
  // });
});
