import { newSpecPage } from '@stencil/core/testing';
import { Icon } from './icon';
import { styles } from './icon.styles';
import jss from 'jss';

describe('Icon', () => {
  let element;
  beforeEach(async () => {
    element = new Icon();
    element.stylesheet = jss.createStyleSheet(styles as any);
  });

  it('should match snapshot', async () => {
    const page = await newSpecPage({
      components: [Icon],
      html: `<scale-icon path="d 10 10">Label</scale-icon>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('should handle css classes', () => {
    element.customClass = 'custom';
    expect(element.getCssClassMap()).toContain('custom');

    element.name = 'arrow-left';
    expect(element.getCssClassMap()).toContain('arrow-left');
  });
});
