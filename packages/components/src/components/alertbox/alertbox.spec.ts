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
      html: `<scale-alertbox>Label</scale-alertbox>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('should handle css classes', () => {
    element.color = 'magenta';
    expect(element.getCssClassMap()).toContain('color-magenta');

    element.variant = 'variant';
    expect(element.getCssClassMap()).toContain('variant-outline');

    element.icon = true;
    expect(element.getCssClassMap()).toContain('button--disabled');
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



 it('should reflect attributes/props', async () => {
  const page = await newSpecPage({
    components: [Alertbox],
    html: `<scale-alertbox
                size ="large"
                color ="black"
                variant ="outline"
                icon ="true"
                close ="true"
                content ="false">
              </scale-alertbox>`,
  });
  expect(page.rootInstance.size).toBe('large');
  expect(page.rootInstance.color).toBe('black');
  expect(page.rootInstance.variant).toBe('outline');
  expect(page.rootInstance.icon).toBe('true');
  expect(page.rootInstance.close).toBe('true');
  expect(page.rootInstance.content).toBe('false');
 });
});
