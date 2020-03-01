import { newSpecPage } from '@stencil/core/testing';
import { InputLabel } from './input-label';
import { styles } from './input-label.styles';
import jss from 'jss';

describe('Input Label', () => {
  let element;
  beforeEach(async () => {
    element = new InputLabel();
    element.stylesheet = jss.createStyleSheet(styles as any);
  });

  it('should match snapshot', async () => {
    const page = await newSpecPage({
      components: [InputLabel],
      html: `<t-input-label>Label</t-input-label>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('should handle css classes', () => {
    element.customClass = 'custom';
    expect(element.getCssClassMap()).toContain('custom');
  });
});
