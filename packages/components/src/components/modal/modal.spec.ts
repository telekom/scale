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
  });

  it('should open the modal', () => {
    expect(element.opened).toBe(false);
    element.openModal();
    expect(element.opened).toBe(true);
  });

  it('should close the modal', () => {
    expect(element.opened).toBe(false);
    element.onCloseModal();
    expect(element.opened).toBe(false);
  });

  it('should not open the modal/ should not render, if the modal is already opened', () => {
    element.opened = true;
    expect(element.root).toBeFalsy();
  });

});
