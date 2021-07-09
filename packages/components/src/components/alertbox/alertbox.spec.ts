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
    element.color = 'magenta';
    expect(element.getCssClassMap()).toContain('color-magenta');

    element.variant = 'variant';
    expect(element.getCssClassMap()).toContain('variant-variant');

    element.icon = true;
    expect(element.getCssClassMap()).toContain('icon');
  });

  it('should test the close() fucntion', () => {
    expect(element.opened).toBe(undefined);
    element.close();
    expect(element.opened).toBe(false);
  });

  it('handle color prop', async () => {
    let page = await newSpecPage({
      components: [Alertbox],
      html: `<scale-alertbox opened="true" icon="true">Label</scale-alertbox>`,
    });
    page.root.color = 'black';
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
    page.root.color = 'blue';
    await page.waitForChanges();

    expect(page.root).toMatchSnapshot();
    page.root.color = 'error';
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
    page.root.color = 'yellow';
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
    page.root.color = 'green';
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });

  it('should reflect attributes/props', async () => {
    const page = await newSpecPage({
      components: [Alertbox],
      html: `<scale-alertbox
                color ="black"
                variant ="outline"
                icon ="true"
                has-close ="true"
                content ="false">
              </scale-alertbox>`,
    });

    expect(page.rootInstance.color).toBe('black');
    expect(page.rootInstance.variant).toBe('outline');
    expect(page.rootInstance.icon).toBe(true);
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
