import { r as registerInstance, h, c as getElement } from './core-9beb9895.js';
import { c as classNames } from './index-3d967629.js';

const Card = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.size = '';
        this.theme = '';
        this.variant = '';
        this.disabled = false;
        this.deselected = false;
        this.imageTopAlt = '';
    }
    componentWillLoad() {
        this.hasSlotHeader = !!this.hostElement.querySelector('[slot="header"]');
        this.hasSlotFooter = !!this.hostElement.querySelector('[slot="footer"]');
    }
    render() {
        return (h("div", { class: this.getCssClassMap() }, this.hasSlotHeader && (h("div", { class: "card__header" }, h("slot", { name: "header" }))), this.imageTop && (h("img", { class: "card__img-top", src: this.imageTop, alt: this.imageTopAlt })), h("div", { class: "card__body" }, h("slot", null)), this.hasSlotFooter && (h("div", { class: "card__footer" }, h("slot", { name: "footer" })))));
    }
    getCssClassMap() {
        return classNames('card', this.size && `card--size-${this.size}`, this.theme && `card--theme-${this.theme}`, this.variant && `card--variant-${this.variant}`, this.disabled && `card--disabled`, this.deselected && `card--deselected`);
    }
    get hostElement() { return getElement(this); }
    static get style() { return "/**\n * \@prop --card-color: Color of the card\n * \@prop --card-background: Background color of the card\n * \@prop --card-border: Border of the card\n * \@prop --card-border-color: Border color of the card\n * \@prop --card-border-radius: Border radius of the card\n * \@prop --card-width: Width of the card\n * \@prop --card-max-width: Max-width of the card\n * \@prop --card-box-shadow: Box shadow of the card\n * \@prop --card-body-padding: Padding of the card body\n * \@prop --card-header-padding: Padding of the card header\n * \@prop --card-header-border-bottom: Border bottom of the card header\n * \@prop --card-header-border-bottom-color: Border bottom color of the card header\n * \@prop --card-header-background: Background of the card header\n * \@prop --card-header-font-size: Font size of the card header\n * \@prop --card-header-padding: Padding of the card header\n * \@prop --card-footer-border-top: Border top of the card footer\n * \@prop --card-footer-border-top-color: Border top color of the card footer\n * \@prop --card-footer-background: Background of the card footer\n * \@prop --card-footer-font-size: Font size of the card footer\n */\n\n.card {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  overflow: hidden;\n  color: var(--card-color, #333);\n  background: var(--card-background, #fff);\n  border: var(--card-border, 1px solid);\n  border-color: var(--card-border-color, rgba(0, 0, 0, 0.1));\n  border-radius: var(--card-border-radius, 4px);\n  width: var(--card-width, 400px);\n  max-width: var(--card-max-width, 550px);\n  -webkit-box-shadow: var(--card-box-shadow, 0 2px 4px 0 rgba(0, 0, 0, 0.12));\n  box-shadow: var(--card-box-shadow, 0 2px 4px 0 rgba(0, 0, 0, 0.12));\n}\n\n.card__body {\n  padding: var(--card-body-padding, 1rem);\n}\n\n.card__header {\n  padding: var(--card-header-padding, 0.5rem 1rem);\n  border-bottom: var(--card-header-border-bottom, 1px solid);\n  border-bottom-color: var(\n    --card-header-border-bottom-color,\n    var(--card-border-color, #dfdfdf)\n  );\n  background: var(--card-header-background, #eee);\n  font-size: var(--card-header-font-size, 0.8rem);\n}\n\n.card__header ::slotted(*) {\n  margin: 0;\n}\n\n.card__footer {\n  padding: var(--card-footer-padding, 0.5rem 1rem);\n  border-top: var(--card-footer-border-top, 1px solid);\n  border-top-color: var(\n    --card-footer-border-top-color,\n    var(--card-border-color, #dfdfdf)\n  );\n  background: var(--card-footer-background, #eee);\n  font-size: var(--card-footer-font-size, 0.8rem);\n}\n\n.card__footer ::slotted(*) {\n  margin: 0;\n}"; }
};

export { Card as t_card };
