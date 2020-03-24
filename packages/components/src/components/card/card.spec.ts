import { newSpecPage } from '@stencil/core/testing';
import { Card } from './card';
import { styles } from './card.styles';
import jss from 'jss';

describe('Card', () => {
  let element;
  let stylesheet;
  beforeEach(async () => {
    element = new Card();
    stylesheet = element.stylesheet = jss.createStyleSheet(styles as any);
  });

  it('should match snapshot', async () => {
    const page = await newSpecPage({
      components: [Card],
      html: `<scale-card>Label</scale-card>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('should handle css classes', () => {
    element.customClass = 'custom';
    expect(element.getCssClassMap()).toContain('custom');
  });
});
