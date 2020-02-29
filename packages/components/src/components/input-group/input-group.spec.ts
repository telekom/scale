import { newSpecPage } from '@stencil/core/testing';
import { InputGroup } from './input-group';
import { styles } from './input-group.styles';
import jss from 'jss';

describe('Input Group', () => {
  let element;
  let stylesheet;
  beforeEach(async () => {
    element = new InputGroup();
    stylesheet = element.stylesheet = jss.createStyleSheet(styles as any);
  });

  it('should match snapshot', async () => {
    const page = await newSpecPage({
      components: [InputGroup],
      html: `<t-input-group>Label</t-input-group>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  // it('should handle a custom css class', () => {
  //   element.customClass = 'custom';
  //   expect(element.getCssClassMap()).toContain('custom');
  // });

  // it('should handle theme css class', () => {
  //   element.theme = 'default';
  //   expect(element.getCssClassMap()).toContain('input-group--theme-default');
  // });

  // it('should have a default css class', () => {
  //   expect(element.getCssClassMap()).toContain('input-group');
  // });
});
