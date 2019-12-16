import { r as registerInstance, h } from './core-9beb9895.js';
import { c as classNames } from './index-3d967629.js';

const Link = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        /** (optional) link href */
        this.href = '';
        /** (optional) link disabled */
        this.disabled = false;
        /** (optional) link variant */
        this.underline = false;
        /** (optional) link open a new tag */
        this.openNewTab = false;
        /** (optional) link variant */
        this.variant = '';
    }
    render() {
        if (!!this.href && !this.disabled) {
            return (h("a", { href: this.href, class: this.getCssClassMap(), target: this.openNewTab ? '_blank' : null }, h("slot", null)));
        }
        return (h("div", { class: this.getCssClassMap() }, h("slot", null)));
    }
    getCssClassMap() {
        return classNames('link', this.disabled && `link--disabled`, this.underline && 'link--underline', this.variant && `link--variant-${this.variant}`);
    }
    static get style() { return "/**\n* \@prop --link-display: Display of the link\n* \@prop --link-flex-direction: Flex direction of the link\n* \@prop --link-align-items: Align items of the link\n* \@prop --link-justify-content: Justify content of the link\n* \@prop --link-position: Position of the link\n* \@prop --link-text-decoration: Text decoration of the link\n* \@prop --link-outline: Outline of the link\n* \@prop --link-cursor: Cursor of the link\n* \@prop --link-padding: Padding of the link\n* \@prop --link-font-size: Font size of the link\n* \@prop --link-font-weight: Font weight of the link\n* \@prop --link-color: Color of the link\n* \@prop --link-variant-primary-color: Color of the link variant primary\n* \@prop --link-variant-success-color: Color of the link variant success\n* \@prop --link-variant-warning-color: Color of the link variant warning\n* \@prop --link-variant-danger-color: Color of the link variant danger\n* \@prop --link-variant-info-color: Color of the link variant info\n* \@prop --link-hover-with-underline: Color of the link variant primary\n*\n*/\n.link {\n  display: var(--link-display, inline-flex);\n  -ms-flex-direction: var(--link-flex-direction, row);\n  flex-direction: var(--link-flex-direction, row);\n  -ms-flex-align: var(--link-align-items, center);\n  align-items: var(--link-align-items, center);\n  -ms-flex-pack: var(--link-justify-content, center);\n  justify-content: var(--link-justify-content, center);\n  position: var(--link-position, relative);\n  -webkit-text-decoration: var(--link-text-decoration, none);\n  text-decoration: var(--link-text-decoration, none);\n  outline: var(--link-outline, none);\n  cursor: var(--link-cursor, pointer);\n  padding: var(--link-padding, 0);\n  font-size: var(--link-font-size, 14px);\n  font-weight: var(--link-font-weight, 500);\n  color: var(--link-color, #000);\n}\n\n.link--disabled {\n  cursor: var(--link-disabled-cursor, not-allowed);\n  opacity: var(--link-disabled-opacity, 0.5);\n}\n\n.link--variant-primary {\n  color: var(--link-variant-primary-color, #409eff);\n}\n\n.link--variant-success {\n  color: var(--link-variant-success-color, #67c23a);\n}\n\n.link--variant-warning {\n  color: var(--link-variant-warning-color, #e6a23c);\n}\n\n.link--variant-danger {\n  color: var(--link-variant-danger-color, #f56c6c);\n}\n\n.link--variant-info {\n  color: var(--link-variant-info-color, #909399);\n}\n\n.link--underline:hover {\n  -webkit-text-decoration: var(--link-hover-with-underline, underline);\n  text-decoration: var(--link-hover-with-underline, underline);\n}"; }
};

export { Link as t_link };
