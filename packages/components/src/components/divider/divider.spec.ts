import { newSpecPage } from '@stencil/core/testing';
import { Divider } from './divider';
import { styles } from './divider.styles';
import jss from 'jss';

describe('Divider', () => {
  let element;
  let stylesheet;
  beforeEach(async () => {
    element = new Divider();
    stylesheet = element.stylesheet = jss.createStyleSheet(styles as any);
  });

  it('should match snapshot', async () => {
    const page = await newSpecPage({
      components: [Divider],
      html: `<t-divider></t-divider>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('should match snapshot when horizontal false', async () => {
    const page = await newSpecPage({
      components: [Divider],
      html: `<t-divider vertical=true></t-divider>`,
    });
    expect(page.root.shadowRoot).toBeTruthy();
    expect(page.root).toMatchSnapshot();
  });

  // it('should handle custom css class', () => {
  //   element.customClass = 'custom';
  //   expect(element.getCssClassMap()).toContain('custom');
  // });

  // it('should handle vertical css class', () => {
  //   element.vertical = true;
  //   expect(element.getCssClassMap()).toContain('divider--vertical');
  // });

  // it('should handle default css class', () => {
  //   element.vertical = false;
  //   expect(element.getCssClassMap()).toContain('divider');
  // });

  // it('should handle size css class', () => {
  //   element.size = 'small';
  //   expect(element.getCssClassMap()).toContain('divider--size-small');
  // });

  // it('should handle theme css class', () => {
  //   element.theme = 'default';
  //   expect(element.getCssClassMap()).toContain('divider--theme-default');
  // });
});
