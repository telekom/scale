import { newSpecPage } from '@stencil/core/testing';
import { Button } from './button';
import { styles } from './button.styles';
import jss from 'jss';

describe('Button', () => {
  let element;
  let stylesheet;
  beforeEach(async () => {
    element = new Button();
    stylesheet = element.stylesheet = jss.createStyleSheet(styles as any);
  });

  it('should match snapshot', async () => {
    const page = await newSpecPage({
      components: [Button],
      html: `<t-button>Label</t-button>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('should disable the button', () => {
    expect(element.disabled).toBe(false);
    element.disable();
    expect(element.disabled).toBe(true);
  });

  it('should enable the button', () => {
    element.disable();
    expect(element.disabled).toBe(true);
    element.enable();
    expect(element.disabled).toBe(false);
  });

  it('should handle custom css class', () => {});

  it('should handle css classes', () => {
    element.customClass = 'custom';
    expect(element.getCssClassMap()).toContain('custom');

    element.size = 'small';
    stylesheet.addRule('button--size-small', {});
    expect(element.getCssClassMap()).toContain(
      stylesheet.classes['button--size-small']
    );

    element.variant = 'primary';
    stylesheet.addRule('button--variant-primary', {});
    expect(element.getCssClassMap()).toContain(
      stylesheet.classes['button--variant-primary']
    );

    element.disabled = true;
    expect(element.getCssClassMap()).toContain(
      stylesheet.classes['button--disabled']
    );
  });
});
