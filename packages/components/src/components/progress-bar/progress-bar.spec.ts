import { newSpecPage } from '@stencil/core/testing';
import { ProgressBar } from './progress-bar';
import { styles } from './progress-bar.styles';
import jss from 'jss';

describe('ProgressBar', () => {
  let element;
  let stylesheet;
  beforeEach(async () => {
    element = new ProgressBar();
    stylesheet = element.stylesheet = jss.createStyleSheet(styles as any);
  });

  it('should match snapshot', async () => {
    const page = await newSpecPage({
      components: [ProgressBar],
      html: `<scale-progress-bar>Label</scale-progress-bar>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('should have css property width 24px when stroke width is set to 24', async () => {
    const page = await newSpecPage({
      components: [ProgressBar],
      html: `<scale-progress-bar stroke-width=24>Label</scale-progress-bar>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('should contain progress-bar-text css class when show text is set true', async () => {
    const page = await newSpecPage({
      components: [ProgressBar],
      html: `<scale-progress-bar show-text=true>Label</scale-progress-bar>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('should contain progress-bar-inner-text css class when text inside is set true', async () => {
    const page = await newSpecPage({
      components: [ProgressBar],
      html: `<scale-progress-bar text-inside=true>Label</scale-progress-bar>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('should handle css classes', () => {
    element.customClass = 'custom';
    expect(element.getCssClassMap()).toContain('custom');

    element.variant = 'primary';
    stylesheet.addRule('progress-bar--variant-primary', {});
    expect(element.getCssClassMap()).toContain(
      stylesheet.classes['progress-bar--variant-primary']
    );
  });
});
