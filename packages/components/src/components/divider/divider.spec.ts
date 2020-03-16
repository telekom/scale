import { newSpecPage } from '@stencil/core/testing';
import { Divider } from './divider';
import { styles } from './divider.styles';
import jss from 'jss';

describe('Divider', () => {
  let element;
  let stylesheet;
  beforeEach(async () => {
    element = new Divider();
    stylesheet = element.stylesheet = jss.createStyleSheet(styles as any);
  });

  it('should match snapshot', async () => {
    const page = await newSpecPage({
      components: [Divider],
      html: `<scale-divider></scale-divider>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('should match snapshot when horizontal false', async () => {
    const page = await newSpecPage({
      components: [Divider],
      html: `<scale-divider vertical=true></scale-divider>`,
    });
    expect(page.root.shadowRoot).toBeTruthy();
    expect(page.root).toMatchSnapshot();
  });

  it('should handle css classes', () => {
    element.customClass = 'custom';
    expect(element.getCssClassMap()).toContain('custom');

    element.size = 'small';
    stylesheet.addRule('divider--size-small', {});
    expect(element.getCssClassMap()).toContain(
      stylesheet.classes['divider--size-small']
    );

    element.vertical = true;
    expect(element.getCssClassMap()).toContain(
      stylesheet.classes['divider--vertical']
    );
  });
});
