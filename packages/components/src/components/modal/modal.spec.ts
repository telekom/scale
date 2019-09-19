import { newSpecPage } from '@stencil/core/testing';
import { Modal } from './modal';

describe('Modal', () => {
  let element;
  beforeEach(async () => {
    element = new Modal()
  });

  it('should match snapshot', async () => {
    const page = await newSpecPage({
      components: [Modal],
      html: `<t-modal>Label</t-modal>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('should handle size css class', () => {
    element.size = 'small'
    expect(element.getCssClassMap()).toContain('modal--size-small');
  })

});
