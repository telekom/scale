import { r as registerInstance, h, c as getElement } from './core-9beb9895.js';
import { c as classNames } from './index-3d967629.js';

const Modal = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        /** (optional) Modal size */
        this.size = '';
        /** (optional) Modal theme */
        this.theme = '';
        /** (optional) Modal variant */
        this.variant = '';
        /** (optional) Modal opened */
        this.opened = false;
        /** (optional) Modal close */
        this.close = 'x';
        this.closeModal = () => {
            this.opened = false;
        };
    }
    async openModal() {
        this.opened = true;
    }
    async onCloseModal() {
        this.opened = false;
    }
    componentWillLoad() {
        this.hasSlotHeader = !!this.hostElement.querySelector('[slot="header"]');
        this.hasSlotActions = !!this.hostElement.querySelector('[slot="modal-actions"]');
    }
    render() {
        if (!this.opened) {
            return null;
        }
        return (h("div", { class: this.getCssClassMap() }, h("div", { class: "modal__backdrop", onClick: this.closeModal }), h("div", { class: "modal" }, this.hasSlotHeader /* istanbul ignore next */ && (h("div", { class: "modal__header" }, h("slot", { name: "header" }), h("a", { class: "modal__close", onClick: this.closeModal }, this.close))), h("div", { class: "modal__body" }, h("slot", null), !this.hasSlotHeader && (h("a", { class: "modal__close", onClick: this.closeModal }, this.close))), this.hasSlotActions /* istanbul ignore next */ && (h("div", { class: "modal__actions" }, h("slot", { name: "modal-actions" }))))));
    }
    getCssClassMap() {
        return classNames('modal', this.size && `modal--size-${this.size}`, this.theme && `modal--theme-${this.theme}`, this.variant && `modal--variant-${this.variant}`);
    }
    get hostElement() { return getElement(this); }
    static get style() { return "/** \n* \@prop --modal-backdrop-background: Color of the backdrop of the modal\n* \@prop --modal-opened-top: Top position of the modal when it is opened\n* \@prop --modal-background: Background color of the modal\n* \@prop --modal-color: Color of the text in the modal\n* \@prop --modal-padding: Padding of the modal\n* \@prop --modal-max-width: Max width of the modal\n* \@prop --modal-border-radius: Border radius of the modal\n* \@prop --modal-box-shadow: Box shadow of the modal\n* \@prop --modal-header-font-size: Font size of the modal header \n* \@prop --modal-header-color: Color of the text of the modal header\n* \@prop --modal-header-margin: Margin of the modal header\n* \@prop --modal-header-border-bottom: Border bottom of the modal header\n* \@prop --modal-header-padding: Padding of the modal header\n* \@prop --modal-header-slot-margin: Margin of the modal header slot\n* \@prop --modal-header-slot-font-size: Font size of the modal header slot\n* \@prop --modal-header-slot-color: Color of the text of the modal header slot\n* \@prop --modal-header-slot-font-weight: Font weight of the modal header slot\n* \@prop --modal-body-padding: Padding of the modal body\n* \@prop --modal-body-border-bottom: Border bottom of the modal body\n* \@prop --modal-close-font-size: Font size of the modal close button\n* \@prop --modal-close-height: Height of the modal close button\n* \@prop --modal-close-opacity: Opacity of the modal close button\n* \@prop --modal-close-hover-opacity: Hover opacity of the modal close button\n* \@prop --modal-actions-padding: Padding of the modal actions\n\n*/\n\n.modal__backdrop {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100vh;\n  background: var(--modal-backdrop-background, rgba(0, 0, 0, 0.75));\n  z-index: 10;\n  opacity: 0;\n  pointer-events: none;\n}\n\n:host([opened]) .modal__backdrop,\n:host([opened]) .modal {\n  opacity: 1;\n  pointer-events: all;\n}\n\n:host([opened]) .modal {\n  top: var(--modal-opened-top, 15vh);\n}\n\n.modal {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  overflow: hidden;\n  position: fixed;\n  background: var(--modal-background, white);\n  color: var(--modal-color, #333);\n  padding: var(--modal-padding, 1rem);\n  text-align: left;\n  position: fixed;\n  top: 10vh;\n  left: 25%;\n  width: 50%;\n  max-width: var(--modal-max-width, 550px);\n  border-radius: var(--modal-border-radius, 3px);\n  -webkit-box-shadow: var(--modal-box-shadow, 0 2px 8px rgba(0, 0, 0, 0.26));\n  box-shadow: var(--modal-box-shadow, 0 2px 8px rgba(0, 0, 0, 0.26));\n  z-index: 100;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  -ms-flex-pack: justify;\n  justify-content: space-between;\n  opacity: 0;\n  pointer-events: none;\n  -webkit-transition: all 0.5s ease-out;\n  transition: all 0.5s ease-out;\n}\n\n.modal__header {\n  font-size: var(--modal-header-font-size, 0.8rem);\n  color: var(--modal-header-color, #333);\n  margin: var(--modal-header-margin, 0);\n  border-bottom: var(--modal-header-border-bottom, 1px solid #333);\n  padding: var(--modal-header-padding, 0.5rem 0);\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-pack: justify;\n  justify-content: space-between;\n}\n.modal__header ::slotted(*) {\n  margin: var(--modal-header-slot-margin, 0);\n  font-size: var(--modal-header-slot-font-size, 1rem);\n  color: var(--modal-header-slot-color, #262626);\n  font-weight: var(--modal-header-slot-font-weight, bold);\n}\n\n.modal__body {\n  padding: var(--modal-body-padding, 1rem 0);\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-pack: justify;\n  justify-content: space-between;\n}\n\n.modal__close {\n  font-size: var(--modal-close-font-size, 1rem);\n  height: var(--modal-close-height, 16px);\n  opacity: var(--modal-close-opacity, 0.5);\n  cursor: pointer;\n}\n\n.modal__close:hover {\n  opacity: var(--modal-close-hover-opacity, 1);\n}\n\n.modal__actions {\n  border-top: var(--modal-body-border-bottom, 1px solid #ccc);\n  padding: var(--modal-actions-padding, 1rem 0);\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-pack: end;\n  justify-content: flex-end;\n}\n\n.modal__actions t-button {\n  margin: 0.25rem;\n}"; }
};

export { Modal as t_modal };
