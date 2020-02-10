import { newSpecPage } from '@stencil/core/testing';
import { Divider } from './divider';

describe('Divider', () => {
  let element;
  beforeEach(async () => {
    element = new Divider();
  });

  it('should match snapshot', async () => {
    const page = await newSpecPage({
      components: [Divider],
      html: `<t-divider></t-divider>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('should match snapshot when horizontal false', async () => {
    const page = await newSpecPage({
      components: [Divider],
      html: `<t-divider horizontal=false ></t-divider>`,
    });
    expect(page.root.shadowRoot).toBeTruthy();
    expect(page.root).toMatchSnapshot();
  });

  it('should handle vertical css class', () => {
    element.vertical = true;
    expect(element.getCssClassMap()).toContain('divider--vertical');
  });

  it('should handle default css class', () => {
    element.horizontal = true;
    expect(element.getCssClassMap()).toContain('divider');
  });

  it('should handle size css class', () => {
    element.size = 'small';
    expect(element.getCssClassMap()).toContain('divider--size-small');
  });

  it('should handle theme css class', () => {
    element.theme = 'default';
    expect(element.getCssClassMap()).toContain('divider--theme-default');
  });
});
