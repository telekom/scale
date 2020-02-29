import { newSpecPage } from '@stencil/core/testing';
import { Input } from './input';
import { styles } from './input.styles';
import jss from 'jss';

describe('Input', () => {
  let element;
  let stylesheet;
  beforeEach(async () => {
    element = new Input();
    stylesheet = element.stylesheet = jss.createStyleSheet(styles as any);
  });

  it('should match snapshot', async () => {
    const page = await newSpecPage({
      components: [Input],
      html: `<t-input></t-input>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  // it('should handle a custom css class', () => {
  //   element.customClass = 'custom';
  //   expect(element.getCssClassMap()).toContain('custom');
  // });

  // it('should handle theme css class', () => {
  //   element.theme = 'default';
  //   expect(element.getCssClassMap()).toContain('input--theme-default');
  // });

  // it('should have a default css class', () => {
  //   expect(element.getCssClassMap()).toContain('input');
  // });
});
