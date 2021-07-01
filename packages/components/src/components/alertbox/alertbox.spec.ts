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

  /* it('should handle click remove', async () => {
    const page = await newSpecPage({
      components: [Alertbox],
      html: `
      <scale-alertbox>
      </scale-alerbox>`,
    });
    expect(page.root).toMatchSnapshot();
      const element = new Alertbox();
      element.close = false;
      document.querySelector('scale-alertbox').remove();
      expect(element).toBe(remove);
  });

    it('element is set on componentWillLoad', () => {
      const element = new Alertbox();
      element.componentDidLoad();
      expect(element.content).toBe("p[slot='text']");
    }); */

    // it('should close the alertbox', () => {
    //   expect(element.opened).toBe();
    //   element.close();
    //   expect(element.opened).toBe(false);
    // });


    it('handle color prop', async () => {
      let page = await newSpecPage({
        components: [Alertbox],
        html: `<scale-alertbox opened="true" icon="true">Label</scale-alertbox>`,
      });
      page.root.color="black";
      await page.waitForChanges();
      expect(page.root).toMatchSnapshot();
      page.root.color="blue";
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();
      page.root.color="error";
      await page.waitForChanges();
      expect(page.root).toMatchSnapshot();
      page.root.color="yellow";
      await page.waitForChanges();
      expect(page.root).toMatchSnapshot();
      page.root.color="green";
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
});
