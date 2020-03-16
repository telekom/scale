import { newSpecPage } from '@stencil/core/testing';
import { Modal } from './modal';
import { styles } from './modal.styles';
import jss from 'jss';

describe('Modal', () => {
  let element;
  let stylesheet;
  beforeEach(async () => {
    element = new Modal();
    stylesheet = element.stylesheet = jss.createStyleSheet(styles as any);
  });

  const components = [Modal];

  it('should match snapshot', async () => {
    const page = await newSpecPage({
      components: [Modal],
      html: `<scale-modal>Label</scale-modal>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('should match snapshot with header slot', async () => {
    const page = await newSpecPage({
      components: [Modal],
      html: `
			<scale-modal>
				<span slot="header">Header content</span>
				A title
			</scale-modal>
			`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('should match snapshot with actions slot', async () => {
    const page = await newSpecPage({
      components: [Modal],
      html: `
			<scale-modal>
				<span slot="modal-actions">Action buttons</span>
				Content
			</scale-modal>
			`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('should match snapshot with close slot', async () => {
    const page = await newSpecPage({
      components: [Modal],
      html: `
			<scale-modal>
				<span slot="close">Close</span>
				Content
			</scale-modal>
			`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('should match snapshot when opened', async () => {
    const page = await newSpecPage({
      components,
      html: `<scale-modal opened=true>Label</scale-modal>`,
    });
    expect(page.root.shadowRoot).toBeTruthy();
    expect(page.root).toMatchSnapshot();
  });

  it('should open the modal', () => {
    expect(element.opened).toBe(false);
    element.open();
    expect(element.opened).toBe(true);
  });

  it('should close the modal', () => {
    element.close();
    expect(element.opened).toBe(false);
  });

  it('should close the modal', () => {
    element.closeModal();
    expect(element.opened).toBe(false);
  });

  it('should not open the modal/ should not render, if the modal is already opened', () => {
    element.opened = true;
    expect(element.root).toBeFalsy();
  });

  it('should handle css classes', () => {
    element.customClass = 'custom';
    expect(element.getCssClassMap()).toContain('custom');

    element.size = 'small';
    stylesheet.addRule('modal--size-small', {});
    expect(element.getCssClassMap()).toContain(
      stylesheet.classes['modal--size-small']
    );

    element.variant = 'primary';
    stylesheet.addRule('modal--variant-primary', {});
    expect(element.getCssClassMap()).toContain(
      stylesheet.classes['modal--variant-primary']
    );

    element.opened = true;
    expect(element.getCssClassMap()).toContain(
      stylesheet.classes['modal--opened']
    );
  });
});
