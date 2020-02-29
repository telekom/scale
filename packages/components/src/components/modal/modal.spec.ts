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
      html: `<t-modal>Label</t-modal>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('should match snapshot with header slot', async () => {
    const page = await newSpecPage({
      components: [Modal],
      html: `
			<t-modal>
				<span slot="header">Header content</span>
				A title
			</t-modal>
			`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('should match snapshot with actions slot', async () => {
    const page = await newSpecPage({
      components: [Modal],
      html: `
			<t-modal>
				<span slot="modal-actions">Action buttons</span>
				Content
			</t-modal>
			`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('should match snapshot when opened', async () => {
    const page = await newSpecPage({
      components,
      html: `<t-modal opened=true >Label</t-modal>`,
    });
    expect(page.root.shadowRoot).toBeTruthy();
    expect(page.root).toMatchSnapshot();
  });

  // it('should handle size css class', () => {
  //   element.size = 'small';
  //   expect(element.getCssClassMap()).toContain('modal--size-small');
  // });

  // it('should handle theme css class', () => {
  //   element.theme = 'default';
  //   expect(element.getCssClassMap()).toContain('modal--theme-default');
  // });

  // it('should handle variant css class', () => {
  //   element.variant = 'primary';
  //   expect(element.getCssClassMap()).toContain('modal--variant-primary');
  // });

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
});
