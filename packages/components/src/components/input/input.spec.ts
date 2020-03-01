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

  it('should handle css classes', () => {
    element.customClass = 'custom';
    expect(element.getCssClassMap()).toContain('custom');

    element.type = 'number';
    stylesheet.addRule('input--type-number', {});
    expect(element.getCssClassMap()).toContain(
      stylesheet.classes['input--type-number']
    );
  });
});
