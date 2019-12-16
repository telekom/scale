import { r as registerInstance, h } from './core-9beb9895.js';
import { c as classNames } from './index-3d967629.js';

const Badge = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.size = '';
        this.variant = '';
        this.pill = false;
        this.link = '';
    }
    render() {
        if (!!this.link) {
            return (h("a", { href: this.link, class: this.getCssClassMap() }, h("slot", null)));
        }
        return (h("span", { class: this.getCssClassMap() }, h("slot", null)));
    }
    getCssClassMap() {
        return classNames('badge', this.size && `badge--size-${this.size}`, this.variant && `badge--variant-${this.variant}`, this.pill && `badge--pill`, !!this.link && 'badge--link');
    }
    static get style() { return ".badge {\n  display: var(--badge-display, inline-block);\n  padding: var(--badge-padding, 0.25em 0.4em);\n  font-size: var(--badge-font-size, 90%);\n  font-weight: var(--badge-font-weight, 700);\n  line-height: var(--badge-line-height, 1);\n  text-align: var(--badge-text-allign, center);\n  white-space: var(--badge-white-space, nowrap);\n  vertical-align: var(--badge-vertical-align, baseline);\n  border-radius: var(--badge-border-radius, 0.25rem);\n  -webkit-transition: var(\n    --badge-transition,\n    color 0.15s ease-in-out,\n    background-color 0.15s ease-in-out,\n    border-color 0.15s ease-in-out,\n    box-shadow 0.15s ease-in-out\n  );\n  transition: var(\n    --badge-transition,\n    color 0.15s ease-in-out,\n    background-color 0.15s ease-in-out,\n    border-color 0.15s ease-in-out,\n    box-shadow 0.15s ease-in-out\n  );\n  background-color: var(--badge-background-color, #343a40);\n  color: var(--badge-color, #fff);\n}\n.badge--pill {\n  padding-right: var(--badge-pill-padding-right, 0.6em);\n  padding-left: var(--badge-pill-padding-left, 0.6em);\n  border-radius: var(--badge-pill-border-radius, 10rem);\n  background-color: var(--badge-pill-background-color, #343a40);\n  color: var(--badge-pill-color, #fff);\n}\n\n.badge--variant-dark {\n  color: #fff;\n  background-color: #343a40;\n}\n\n.badge--variant-light {\n  color: #212529;\n  background-color: #f8f9fa;\n}\n\n.badge--variant-info {\n  color: #fff;\n  background-color: #17a2b8;\n}\n\n.badge--variant-warning {\n  color: #212529;\n  background-color: #ffc107;\n}\n\n.badge--variant-danger {\n  color: #fff;\n  background-color: #dc3545;\n}\n\n.badge--variant-success {\n  color: #fff;\n  background-color: #28a745;\n}\n\n.badge--variant-secondary {\n  color: #fff;\n  background-color: #6c757d;\n}\n\n.badge--variant-primary {\n  color: #fff;\n  background-color: #007bff;\n}\n.badge--link {\n  -webkit-text-decoration: var(--badge-link-text-decoration, none);\n  text-decoration: var(--badge-link-text-decoration, none);\n}\n\n.badge--link:hover {\n  background: var(--badge-link-hover-background, #1d2124);\n}\n\n.badge--link:active {\n  background: var(--badge-link-active-background, #1d2124);\n}\n\n.badge--link:focus {\n  outline: var(--badge-link-focus-outline, 0);\n  -webkit-box-shadow: var(\n    --badge-link-focus-box-shadow,\n    0 0 0 0.2rem rgba(52, 58, 64, 0.5)\n  );\n  box-shadow: var(\n    --badge-link-focus-box-shadow,\n    0 0 0 0.2rem rgba(52, 58, 64, 0.5)\n  );\n}"; }
};

export { Badge as t_badge };
