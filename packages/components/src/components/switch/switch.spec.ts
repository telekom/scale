import { newSpecPage } from '@stencil/core/testing';
import { Switch } from './switch';
import { styles } from './switch.styles';
import jss from 'jss';

describe('Switch', () => {
  let element;
  let stylesheet;
  beforeEach(async () => {
    element = new Switch();
    stylesheet = element.stylesheet = jss.createStyleSheet(styles as any);
  });

  it('should match snapshot', async () => {
    const page = await newSpecPage({
      components: [Switch],
      html: `<t-switch>/t-switch>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  // it('should have class active', () => {
  //   element.active = true;
  //   expect(element.getCssClassMap()).toContain('switch--active');
  // });

  // it('should have class disabled', () => {
  //   element.disabled = true;
  //   expect(element.getCssClassMap()).toContain('switch--disabled');
  // });

  it('should have toggle active state', () => {
    element.disabled = false;
    element.active = true;
    element.toggleSwitch();
    expect(element.active).toBe(false);
  });

  // it('should not toggle active state if disabled', () => {
  //   element.disabled = true;
  //   element.active = true;
  //   element.toggleSwitch();
  //   expect(element.active).toBe(true);
  // });
});
