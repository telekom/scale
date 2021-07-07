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
                hasClose ="true"
                content ="false">
              </scale-alertbox>`,
    });

    expect(page.rootInstance.color).toBe('black');
    expect(page.rootInstance.variant).toBe('outline');
    expect(page.rootInstance.icon).toBe(true);
    expect(page.rootInstance.hasclose).toBe(true);
    expect(page.rootInstance.content).toBe(false);
  });

  
    // it('should emit onClick and set opened to false', async () => {
    //   element.rootInstance.opened = true;
    //   await element.waitForChanges();
    //   element.dispatchEvent(new Event('click'));
    //   await element.waitForChanges();
    //   expect(element.rootInstance.opened).toBe(false);
    // });

    // it('should emit onClick and set opened to false', async () => {
    //   let page = await newSpecPage({
    //     components: [Alertbox],
    //     html: `<scale-alertbox opened="true">Label</scale-alertbox>`,
    //   });
    //   await page.waitForChanges();
    //   element.dispatchEvent(new Event('click'));
    //   await page.waitForChanges();
    //   expect(element.rootInstance.opened).toBe(false);
    // });
});
  