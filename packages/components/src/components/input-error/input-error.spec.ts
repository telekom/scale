import { newSpecPage } from '@stencil/core/testing';
import { InputError } from './input-error';
import { styles } from './input-error.styles';
import jss from 'jss';

describe('Input Error', () => {
  let element;
  let stylesheet;
  beforeEach(async () => {
    element = new InputError();
    stylesheet = element.stylesheet = jss.createStyleSheet(styles as any);
  });

  it('should match snapshot', async () => {
    const page = await newSpecPage({
      components: [InputError],
      html: `<t-input-error>Error</t-input-error>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  // it('should handle a custom css class', () => {
  //   element.customClass = 'custom';
  //   expect(element.getCssClassMap()).toContain('custom');
  // });

  // it('should handle theme css class', () => {
  //   element.theme = 'default';
  //   expect(element.getCssClassMap()).toContain('input-error--theme-default');
  // });

  // it('should have a default css class', () => {
  //   expect(element.getCssClassMap()).toContain('input-error');
  // });
});
