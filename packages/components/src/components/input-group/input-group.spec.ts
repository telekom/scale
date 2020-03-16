import { newSpecPage } from '@stencil/core/testing';
import { InputGroup } from './input-group';
import { styles } from './input-group.styles';
import jss from 'jss';

describe('Input Group', () => {
  let element;
  beforeEach(async () => {
    element = new InputGroup();
    element.stylesheet = jss.createStyleSheet(styles as any);
  });

  it('should match snapshot', async () => {
    const page = await newSpecPage({
      components: [InputGroup],
      html: `<scale-input-group>Label</scale-input-group>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('should handle css classes', () => {
    element.customClass = 'custom';
    expect(element.getCssClassMap()).toContain('custom');
  });
});
