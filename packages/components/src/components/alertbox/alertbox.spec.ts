import { newSpecPage } from '@stencil/core/testing';
// import { remove } from 'lodash';
import { Alertbox } from './alertbox';

describe('Alertbox', () => {
  let element;

  beforeEach(async () => {
    element = new Alertbox();
  });

  it('should match snapshot', async () => {
    const page = await newSpecPage({
      components: [Alertbox],
      html: `<scale-alertbox opened="true">Label</scale-alertbox>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('should handle css classes', () => {
    element.variant = 'warning';
    expect(element.getCssClassMap()).toContain('variant-warning');
  });

  it('should test the close() fucntion', () => {
    expect(element.opened).toBe(undefined);
    element.close();
    expect(element.opened).toBe(false);
  });

  it('handle variant prop', async () => {
    const page = await newSpecPage({
      components: [Alertbox],
      html: `<scale-alertbox opened="true">Label</scale-alertbox>`,
    });
    page.root.variant = 'error';
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
    page.root.variant = 'warning';
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
    page.root.variant = 'informational';
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
    page.root.variant = 'success';
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });

  it('should reflect attributes/props', async () => {
    const page = await newSpecPage({
      components: [Alertbox],
      html: `<scale-alertbox
                variant ="warning"
                has-close ="true"
                content ="false">
              </scale-alertbox>`,
    });

    expect(page.rootInstance.variant).toBe('warning');
    expect(page.rootInstance.hasClose).toBe(true);
    expect(page.rootInstance.content).toBe(false);
  });

  it('should emit onClick and set opened to false', async () => {
    const page = await newSpecPage({
      components: [Alertbox],
      html: `<scale-alertbox opened="true" has-close="true">Label</scale-alertbox>`,
    });
    const icon = page.root.shadowRoot.querySelector('.alertbox__icon-close');
    await page.waitForChanges();
    icon.dispatchEvent(new Event('click'));
    await page.waitForChanges();
    expect(page.rootInstance.opened).toBe(false);
  });

  it('should set timeout of the FIRST argument on function onCloseAlertWithTimeout()', async () => {
    const page = await newSpecPage({
      components: [Alertbox],
      html: `<scale-alertbox opened="true" >Label</scale-alertbox>`,
    });
    page.rootInstance.defaultTimeout = 1;
    page.rootInstance.timeout = true;
    await page.waitForChanges();
    expect(page.rootInstance.defaultTimeout).toBe(1);
    setTimeout(() => {
      expect(page.root.opened).toEqual(false);
    }, 1);
  });
});
