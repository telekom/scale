import { newSpecPage } from '@stencil/core/testing';
import { Breadcrumb } from './breadcrumb';
// import { styles } from './breadcrumb.styles';
// import jss from 'jss';

describe('Breadcrumb', () => {
  /* let element;
  let stylesheet;
  beforeEach(async () => {
    element = new Breadcrumb();
    stylesheet = element.stylesheet = jss.createStyleSheet(styles as any);
  }); */

  it('should match snapshot', async () => {
    const page = await newSpecPage({
      components: [Breadcrumb],
      html: `
        <scale-breadcrumb></scale-breadcrumb>
      `,
    });
    expect(page.root).toMatchSnapshot();
  });
});
