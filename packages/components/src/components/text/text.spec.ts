import { newSpecPage } from '@stencil/core/testing';
import { Text } from './text';
import { styles } from './text.styles';
import jss from 'jss';

describe('Text', () => {
  let element;
  beforeEach(async () => {
    element = new Text();
    element.stylesheet = jss.createStyleSheet(styles as any);
  });

  it('should match snapshot', async () => {
    const page = await newSpecPage({
      components: [Text],
      html: `<scale-text>Label</scale-text>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('should handle css classes', () => {
    element.customClass = 'custom';
    expect(element.getCssClassMap()).toContain('custom');
  });
});
