import { newSpecPage } from '@stencil/core/testing';
import { ProgressBar } from './progress-bar';

describe('ProgressBar', () => {
  let element;
  beforeEach(async () => {
    element = new ProgressBar();
  });

  it('should match snapshot', async () => {
    const page = await newSpecPage({
      components: [ProgressBar],
      html: `<t-progress-bar>Label</t-progress-bar>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('should have class variant info', () => {
    element.variant = 'info';
    expect(element.getCssClassMap()).toContain(
      'progress-bar-inner-variant-info'
    );
  });

  it('should have css property width 24px when stroke width is set to 24', async () => {
    const page = await newSpecPage({
      components: [ProgressBar],
      html: `<t-progress-bar stroke-width=24>Label</t-progress-bar>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('should contain progress-bar-text css class when show text is set true', async () => {
    const page = await newSpecPage({
      components: [ProgressBar],
      html: `<t-progress-bar show-text=true>Label</t-progress-bar>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('should contain progress-bar-inner-text css class when text inside is set true', async () => {
    const page = await newSpecPage({
      components: [ProgressBar],
      html: `<t-progress-bar text-inside=true>Label</t-progress-bar>`,
    });
    expect(page.root).toMatchSnapshot();
  });
});
