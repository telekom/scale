import { r as registerInstance, h } from './core-9beb9895.js';
import { c as classNames } from './index-3d967629.js';

const Button = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        /** (optional) Button size */
        this.size = '';
        /** (optional) Button theme */
        this.theme = '';
        /** (optional) Button variant */
        this.variant = '';
        /** (optional) Disabled button */
        this.disabled = false;
        /** (optional) Deselected button */
        this.deselected = false;
    }
    async disable() {
        this.disabled = true;
    }
    async enable() {
        this.disabled = false;
    }
    render() {
        return (h("button", { class: this.getCssClassMap(), disabled: this.disabled }, h("slot", null)));
    }
    getCssClassMap() {
        return classNames('button', this.size && `button--size-${this.size}`, this.theme && `button--theme-${this.theme}`, this.variant && `button--variant-${this.variant}`, this.disabled && `button--disabled`, this.deselected && `button--deselected`);
    }
    static get style() { return "/**\n\n Default\n * \@prop --button-color: Color of the button\n * \@prop --button-background-color: Background color of the button\n * \@prop --button-border: Border of the button\n * \@prop --button-border-color: Border color of the button\n * \@prop --button-border-radius: Border radius of the button\n * \@prop --button-padding: Padding of the button\n * \@prop --button-box-shadow: Box shadow of the button\n * \@prop --button-line-height: Line height of the button\n * \@prop --button-font-family: Font family of the button\n * \@prop --button-font-size: Font size of the button\n * \@prop --button-font-weight: Font weight of the button\n * \@prop --button-text-transform: Font transform of the button\n * \@prop --button-letter-spacing: Letter spacing of the button\n * \@prop --button-transition: Transition of the button\n * \@prop --button-hover-color: Hover color of the button\n * \@prop --button-hover-background-color: Hover background color of the button\n * \@prop --button-hover-border: Hover border of the button\n * \@prop --button-hover-border-color: Hover border color of the button\n * \@prop --button-hover-border-radius: Hover border radius of the button\n * \@prop --button-hover-padding: Hover padding of the button\n * \@prop --button-hover-box-shadow: Hover box-shadow of the button\n * \@prop --button-hover-line-height: Hover line-height of the button\n * \@prop --button-hover-font-size: Hover font-size of the button\n * \@prop --button-hover-font-weight: Hover font-weight of the button\n * \@prop --button-hover-transition: hover transition of the button\n * \@prop --button-disabled-background-color: Disabled background color of the button\n * \@prop --button-disabled-border: Disabled border of the button\n * \@prop --button-disabled-color: Disabled color of the button\n */\n\n.button {\n  position: relative;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  -ms-flex-pack: center;\n  justify-content: center;\n  -ms-flex-align: center;\n  align-items: center;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n  vertical-align: middle;\n  text-align: center;\n  cursor: pointer;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  color: var(--button-color, #000);\n  background: var(--button-background-color, #fff);\n  border: var(--button-border, 1px solid #000);\n  border-color: var(--button-border-color, #000);\n  border-radius: var(--button-border-radius, 0);\n  padding: var(--button-padding, 0.25rem 1rem);\n  -webkit-box-shadow: var(--button-box-shadow, none);\n  box-shadow: var(--button-box-shadow, none);\n  line-height: var(--button-line-height, 2rem);\n  font-family: var(--button-font-family, unset);\n  font-size: var(--button-font-size, unset);\n  font-weight: var(--button-font-weight, 400);\n  text-transform: var(--button-text-transform, initial);\n  letter-spacing: var(--button-letter-spacing, 0);\n  -webkit-transition: var(--button-transition, all 0.2s ease-in-out);\n  transition: var(--button-transition, all 0.2s ease-in-out);\n}\n\n/*\n * NOTE: Only tested in Chrome and Safari\n * --------------------------------------\n * This compensates for missing left alignment\n * when letter-spacing is applied\n */\n.button:before {\n  width: var(--button-letter-spacing, 0);\n  content: \'\';\n  display: block;\n  height: 100%;\n}\n\n.button:hover,\n.button.active {\n  color: var(--button-hover-color, #fff);\n  background: var(--button-hover-background-color, #000);\n  border: var(--button-hover-border, 1px solid #000);\n  border-color: var(--button-hover-border-color, #000);\n  border-radius: var(--button-hover-border-radius, 0);\n  padding: var(--button-hover-padding, 0.25rem 1rem);\n  -webkit-box-shadow: var(--button-hover-box-shadow, none);\n  box-shadow: var(--button-hover-box-shadow, none);\n  line-height: var(--button-hover-line-height, 2rem);\n  font-size: var(--button-hover-font-size, unset);\n  font-weight: var(--button-hover-font-weight, 400);\n  -webkit-transition: var(--button-hover-transition, all 0.2s ease-in-out);\n  transition: var(--button-hover-transition, all 0.2s ease-in-out);\n  text-decoration: none;\n}\n\n/*\n * TODO: implement accessability\n * -----------------------------\n * Once the user starts tabbing it probably\n * means that a screen-reader is required\n */\n.button:not(.tabbing):focus {\n  outline: 0;\n}\n\n.button--disabled,\n.button--disabled:hover {\n  background: var(\n    --button-disabled-background-color,\n    var(--button-background-color, #fff)\n  );\n  border: var(--button-disabled-border, var(--button-border, 1px solid #000));\n  color: var(--button-disabled-color, var(--button-color, #000));\n  opacity: 0.5;\n  cursor: not-allowed;\n}"; }
};

export { Button as t_button };
