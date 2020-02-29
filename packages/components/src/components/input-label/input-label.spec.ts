import { newSpecPage } from '@stencil/core/testing';
import { InputLabel } from './input-label';
import { styles } from './input-label.styles';
import jss from 'jss';

describe('Input Label', () => {
  let element;
  let stylesheet;
  beforeEach(async () => {
    element = new InputLabel();
    stylesheet = element.stylesheet = jss.createStyleSheet(styles as any);
  });

  it('should match snapshot', async () => {
    const page = await newSpecPage({
      components: [InputLabel],
      html: `<t-input-label>Label</t-input-label>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  // it('should handle a custom css class', () => {
  //   element.customClass = 'custom';
  //   expect(element.getCssClassMap()).toContain('custom');
  // });

  // it('should handle theme css class', () => {
  //   element.theme = 'default';
  //   expect(element.getCssClassMap()).toContain('input-label--theme-default');
  // });

  // it('should have a default css class', () => {
  //   expect(element.getCssClassMap()).toContain('input-label');
  // });
});
