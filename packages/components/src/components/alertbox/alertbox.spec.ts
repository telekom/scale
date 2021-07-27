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
    element.variant = 'magenta';
    expect(element.getCssClassMap()).toContain('variant-magenta');
  });

  it('should test the close() fucntion', () => {
    expect(element.opened).toBe(undefined);
    element.close();
    expect(element.opened).toBe(false);
  });

  it('handle variant prop', async () => {
    let page = await newSpecPage({
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
                variant ="black"
                has-close ="true"
                content ="false">
              </scale-alertbox>`,
    });

    expect(page.rootInstance.variant).toBe('black');
    expect(page.rootInstance.hasClose).toBe(true);
    expect(page.rootInstance.content).toBe(false);
  });

  it('should emit onClick and set opened to false', async () => {
    let page = await newSpecPage({
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
    let page = await newSpecPage({
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

  // it('should set timeout of the SECOND argument on function onCloseAlertWithTimeout()', async () => {
  //   let page = await newSpecPage({
  //     components: [Alertbox],
  //     html: `<scale-alertbox timeout="200" opened="true" >Label</scale-alertbox>`,
  //   });
  //   await page.waitForChanges();
  //   expect(page.root.timeout).toBe("200");
  //   setTimeout(() => {
  //     expect(page.root.opened).toBe(false);
  //   }, page.root.timeout);
  // });

  // it('should set timeout of the SECOND argument on function onCloseAlertWithTimeout()', async () => {
  //   let page = await newSpecPage({
  //     components: [Alertbox],
  //     html: `<scale-alertbox>Label</scale-alertbox>`,
  //   });
  //   page.rootInstance.timeout = 200;
  //   page.rootInstance.opened = true;
  //   await page.waitForChanges();
  //   expect(page.rootInstance.timeout).toBe(200);
  //   setTimeout(() => {
  //     expect(page.rootInstance.opened).toBe(false);
  //   }, 200);
  // });

});
