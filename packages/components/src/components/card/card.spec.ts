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
      html: `<t-card>Label</t-card>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('should match snapshot with header slot', async () => {
    const page = await newSpecPage({
      components: [Card],
      html: `
			<t-card>
				<h3 slot="header">Header content</h3>
				A title
			</t-card>
			`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('should match snapshot with footer slot', async () => {
    const page = await newSpecPage({
      components: [Card],
      html: `
			<t-card>
				<h3 slot="footer">Footer content</h3>
				A title
			</t-card>
			`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('should match snapshot with image', async () => {
    const page = await newSpecPage({
      components: [Card],
      html: `<t-card image-top="http://placehold.it/400x300">A title</t-card>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('should handle css classes', () => {
    element.customClass = 'custom';
    expect(element.getCssClassMap()).toContain('custom');

    element.size = 'small';
    stylesheet.addRule('card--size-small', {});
    expect(element.getCssClassMap()).toContain(
      stylesheet.classes['card--size-small']
    );

    element.variant = 'primary';
    stylesheet.addRule('card--variant-primary', {});
    expect(element.getCssClassMap()).toContain(
      stylesheet.classes['card--variant-primary']
    );
  });
});
