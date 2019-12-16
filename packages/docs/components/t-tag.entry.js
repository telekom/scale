import { r as registerInstance, h } from './core-9beb9895.js';
import { c as classNames } from './index-3d967629.js';

const Tag = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        /** (optional) Tag variant */
        this.variant = '';
        /** (optional) Tag pill */
        this.pill = false;
        /** (optional) Tag on an <a> element */
        this.link = '';
    }
    render() {
        if (!!this.link) {
            return (h("a", { href: this.link, class: this.getCssClassMap() }, h("slot", null)));
        }
        return (h("div", { class: this.getCssClassMap() }, h("slot", null)));
    }
    getCssClassMap() {
        return classNames('tag', this.variant && `tag--variant-${this.variant}`, this.pill && `tag--pill`, !!this.link && 'tag--link');
    }
    static get style() { return "/**\n* \@prop --tag-color: Color of the tag\n* \@prop --tag-background: Background of the tag\n* \@prop --tag-border: Border of the tag\n* \@prop --tag-border-color: Border color of the tag\n* \@prop --tag-border-radius: Border radius of the tag\n* \@prop --tag-padding: Padding of the tag\n* \@prop --tag-font-size: Font size of the tag\n* \@prop --tag-variant-primary-color: Color of the tag variant primary\n* \@prop --tag-variant-primary-background: Background of the tag variant primary\n* \@prop --tag-variant-primary-border-color: Border color of the tag variant primary\n* \@prop --tag-pill-border-radius: Large border radius of the tag pill\n* \@prop --tag-pill-padding: Additional horizontal padding of the tag pill\n* \@prop --tag-link-text-decoration: Text decoration of the tag with link\n* \@prop --tag-link-hover-background: Background color of the tag with link when hover \n* \@prop --tag-link-active-background: Background color of the tag with link when active \n* \@prop --tag-link-visited-background: Background color of the tag with link when visited \n* \@prop --tag-link-focus-outline: outline of the tag with link when focus \n* \@prop --tag-link-focus-box-shadow: Box shadow of the tag with link when focus \n*/\n.tag {\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  color: var(--tag-color, #fff);\n  background: var(--tag-background, #333);\n  border: var(--tag-border, 1px solid);\n  border-color: var(--tag-border-color, #dfdfdf);\n  border-radius: var(--tag-border-radius, 0.25rem);\n  padding: var(--tag-padding, 0.5rem);\n  font-size: var(--tag-font-size, 0.8rem);\n}\n\n.tag--variant-primary {\n  color: var(--tag-variant-primary-color, #fff);\n  background: var(--tag-variant-primary-background, #007bff);\n  border-color: var(--tag-variant-primary-border-color, #007bff);\n}\n\n.tag--pill {\n  border-radius: var(--tag-pill-border-radius, 1rem);\n  padding: var(--tag-pill-padding, 0.6rem);\n}\n\n.tag--link {\n  -webkit-text-decoration: var(--tag-link-text-decoration, none);\n  text-decoration: var(--tag-link-text-decoration, none);\n}\n\n.tag--link:hover {\n  background: var(--tag-link-hover-background, #1d2124);\n}\n\n.tag--link:active {\n  background: var(--tag-link-active-background, #1d2124);\n}\n\n.tag--link:focus {\n  outline: var(--tag-link-focus-outline, 0);\n  -webkit-box-shadow: var(\n    --tag-link-focus-box-shadow,\n    0 0 0 0.2rem rgba(52, 58, 64, 0.5)\n  );\n  box-shadow: var(\n    --tag-link-focus-box-shadow,\n    0 0 0 0.2rem rgba(52, 58, 64, 0.5)\n  );\n}"; }
};

export { Tag as t_tag };
