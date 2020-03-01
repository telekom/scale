import { newSpecPage } from '@stencil/core/testing';
import { InputError } from './input-error';
import { styles } from './input-error.styles';
import jss from 'jss';

describe('Input Error', () => {
  let element;
  beforeEach(async () => {
    element = new InputError();
    element.stylesheet = jss.createStyleSheet(styles as any);
  });

  it('should match snapshot', async () => {
    const page = await newSpecPage({
      components: [InputError],
      html: `<t-input-error>Error</t-input-error>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('should handle css classes', () => {
    element.customClass = 'custom';
    expect(element.getCssClassMap()).toContain('custom');
  });
});
