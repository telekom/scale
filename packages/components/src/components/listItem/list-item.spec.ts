import { newSpecPage } from '@stencil/core/testing';
import { ListItem } from './list-item';
import { styles } from '../list/list.styles';
import jss from 'jss';

describe('ListItem', () => {
  let element;
  let stylesheet;
  beforeEach(async () => {
    element = new ListItem();
    stylesheet = element.stylesheet = jss.createStyleSheet(styles as any);
  });

  it('should match snapshot', async () => {
    const page = await newSpecPage({
      components: [ListItem],
      html: `<scale-list-item>default</scale-list-item>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('should handle css classes', () => {
    element.type = 'circle';
    stylesheet.addRule('list-item--type', {});
    expect(element.getCssClassMap()).toContain(
      stylesheet.classes['list-item--type']
    );
  });
});
