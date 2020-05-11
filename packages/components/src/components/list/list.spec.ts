import { newSpecPage } from '@stencil/core/testing';
import { List } from './list';
import { styles } from './list.styles';
import jss from 'jss';

describe('List', () => {
  let element;
  let stylesheet;
  beforeEach(async () => {
    element = new List();
    stylesheet = element.stylesheet = jss.createStyleSheet(styles as any);
  });

  it('should match snapshot', async () => {
    const page = await newSpecPage({
      components: [List],
      html: `<scale-list>default</scale-list>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('should handle css classes', () => {
    element.variant = 'ordered';
    stylesheet.addRule('list--variant-ordered', {});
    expect(element.getCssClassMap()).toContain(
      stylesheet.classes['list--variant-ordered']
    );
  });
});
