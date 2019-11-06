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
      html: `<t-progress-bar percentage=30>Label</t-progress-bar>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('should have class variant info', () => {
    element.variant = 'info';
    expect(element.getCssClassMap()).toContain(
      'progress-bar__inner-variant-info'
    );
  });

  it('should show text percentage', async () => {
    const page = await newSpecPage({
      components: [ProgressBar],
      html: `<t-progress-bar showText=true percentage=30>Label</t-progress-bar>`,
    });
    expect(page.root.shadowRoot).toContain('30%');
  });
});
