import { newSpecPage } from '@stencil/core/testing';
import { Text } from './text';
import { styles } from './text.styles';
import jss from 'jss';

describe('Text', () => {
  let element;
  let stylesheet;
  beforeEach(async () => {
    element = new Text();
    stylesheet = element.stylesheet = jss.createStyleSheet(styles as any);
  });

  it('should match snapshot', async () => {
    const page = await newSpecPage({
      components: [Text],
      html: `<t-text>Label</t-text>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  // it('should handle a custom css class', () => {
  //   element.customClass = 'custom';
  //   expect(element.getCssClassMap()).toContain('custom');
  // });

  // it('should handle theme css class', () => {
  //   element.theme = 'default';
  //   expect(element.getCssClassMap()).toContain('text--theme-default');
  // });

  // it('should have a default css class', () => {
  //   expect(element.getCssClassMap()).toContain('text');
  // });
});
