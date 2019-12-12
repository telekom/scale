import { newSpecPage, newE2EPage } from '@stencil/core/testing';
import { Switch } from './switch';

describe('Switch', () => {
  let element;
  beforeEach(async () => {
    element = new Switch();
  });

  it('should match snapshot', async () => {
    const page = await newSpecPage({
      components: [Switch],
      html: `<t-switch>/t-switch>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('should have class active', () => {
    element.active = true;
    expect(element.getCssClassMap()).toContain('switch--active');
  });

  it('should have class disabled ', () => {
    element.disabled = true;
    expect(element.getCssClassMap()).toContain('switch--disabled');
  });
});
