import { newSpecPage } from '@stencil/core/testing';
import { InputError } from './input-error';

describe('Input Error', () => {
  let element;
  beforeEach(async () => {
    element = new InputError();
  });

  it('should match snapshot', async () => {
    const page = await newSpecPage({
      components: [InputError],
      html: `<t-input-error>Error</t-input-error>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('should handle theme css class', () => {
    element.theme = 'default';
    expect(element.getCssClassMap()).toContain('input-error--theme-default');
  });

  it('should have a default css class', () => {
    expect(element.getCssClassMap()).toContain('input-error');
  });
});
