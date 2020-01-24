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
      html: `<t-devider/>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('should handle vertical css class', () => {
    element.vertical = true;
    expect(element.getCssClassMap()).toContain('divider--vertical');
  });

  it('should have a default css class', () => {
    expect(element.getCssClassMap()).toBe('divider');
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
