import { r as registerInstance, h } from './core-9beb9895.js';
import { c as classNames } from './index-3d967629.js';

const Alert = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        /** (required) Alert class */
        this.customClass = '';
        /** (optional) Alert size */
        this.size = '';
        /** (optional) Alert theme */
        this.theme = '';
        /** (optional) Alert variant */
        this.variant = '';
        /** (optional) Alert timeout */
        this.timeout = false;
        /** (optional) Alert icon */
        this.icon = '';
        /** (required) Alert close */
        this.close = '';
        this.defaultTimeout = 2000;
        this.onCloseAlert = () => {
            this.opened = false;
        };
        this.onCloseAlertWithTimeout = () => {
            if (this.timeout !== false) {
                if (typeof this.timeout === 'number') {
                    setTimeout(this.onCloseAlert, this.timeout);
                }
                else {
                    setTimeout(this.onCloseAlert, this.defaultTimeout);
                }
            }
            else {
                return null;
            }
        };
    }
    async open() {
        this.opened = true;
    }
    render() {
        this.onCloseAlertWithTimeout();
        if (!this.opened) {
            return null;
        }
        return (h("div", { class: this.getCssClassMap() }, h("div", { class: "alert__body" }, h("div", { class: "alert__icon" }, this.icon), h("div", { class: "alert__content" }, h("div", { class: "alert__headline" }, this.headline), h("slot", null))), h("a", { class: "alert__close", onClick: this.onCloseAlert }, this.close)));
    }
    getCssClassMap() {
        return classNames('alert', this.customClass && this.customClass, this.size && `alert--size-${this.size}`, this.theme && `alert--theme-${this.theme}`, this.variant && `alert--variant-${this.variant}`);
    }
    static get style() { return "/**\n * \@prop --alert-background: Background color of the alert\n * \@prop --alert-color: Color of the text of the alert\n * \@prop --alert-padding: Padding of the alert\n * \@prop --alert-headline-font-size: Font size of the headline of the alert\n * \@prop --alert-headline-color: Color of the headline of the alert\n * \@prop --alert-headline-margin: Margin of the headline of the alert\n * \@prop --alert-icon-background: Background color of the icon of the alert\n * \@prop --alert-icon-height: Height of the icon of the alert\n * \@prop --alert-icon-width: Width of the icon of the alert\n * \@prop --alert-icon-margin: Margin of the icon of the alert\n * \@prop --alert-icon-border-radius: Border radius of the icon of the alert\n * \@prop --alert-close-width: Width of the close icon of the alert\n * \@prop --alert-close-height: Height of the close icon of the alert\n * \@prop --alert-close-opacity: Opacity of the close icon of the alert\n * \@prop --alert-close-hover-opacity: Hover opacity of the close icon of the alert\n * \@prop --alert-variant-primary-background: Background color of the variant primary alert\n * \@prop --alert-variant-primary-color: Color of the text the variant primary alert\n * \@prop --alert-variant-secondary-background: Background color of the variant secondary alert\n * \@prop --alert-variant-secondary-color: Color of the text of the variant secondary alert\n * \@prop --alert-variant-warning-background: Background color of the variant warning alert\n * \@prop --alert-variant-warning-color: Color of the text of the variant warning alert\n * \@prop --alert-variant-danger-background: Background color of the variant danger alert\n * \@prop --alert-variant-danger-color: Color of the text of the variant danger alert\n * \@prop --alert-variant-success-background: Background color of the variant success alert\n * \@prop --alert-variant-success-color: Color of the text of the variant success alert\n * \@prop --alert-variant-info-background: Background color of the variant info alert\n * \@prop --alert-variant-info-color: Color of the text of the variant info alert\n */\n\n.alert {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  background: var(--alert-background, #eee);\n  color: var(--alert-color, #333);\n  width: 100%;\n  padding: var(--alert-padding, 1rem);\n  text-align: left;\n  position: relative;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-pack: justify;\n  justify-content: space-between;\n}\n\n.alert__body {\n  display: -ms-flexbox;\n  display: flex;\n}\n\n.alert__content {\n}\n\n.alert__headline {\n  font-size: var(--alert-headline-font-size, 1rem);\n  color: var(--alert-headline-color, white);\n  margin: var(--alert-headline-margin, 0);\n}\n\n.alert__icon {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: center;\n  align-items: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  background: var(--alert-icon-background);\n  height: var(--alert-icon-height, 24px);\n  width: var(--alert-icon-width, 24px);\n  margin: var(--alert-icon-margin, 0 0.5rem 0 0);\n  border-radius: var(--alert-icon-border-radius);\n}\n\n.alert__close {\n  width: var(--alert-close-width, 16px);\n  height: var(--alert-close-height, 16px);\n  opacity: var(--alert-close-opacity, 0.5);\n  cursor: pointer;\n}\n\n.alert__close:hover {\n  opacity: var(--alert-close-hover-opacity, 1);\n}\n\n.alert--variant-primary {\n  background: var(--alert-variant-primary-background, blue);\n  color: var(--alert-variant-primary-color, #fff);\n}\n\n.alert--variant-secondary {\n  background: var(--alert-variant-secondary-background, #eee);\n  color: var(--alert-variant-secondary-color, #333);\n}\n\n.alert--variant-variant-warning {\n  background: var(--alert-variant-warning-background, orange);\n  color: var(--alert-variant-warning-color, #fff);\n}\n\n.alert--variant-danger {\n  background: var(--alert-variant-danger-background, red);\n  color: var(--alert-variant-danger-color, #fff);\n}\n\n.alert--variant-success {\n  background: var(--alert-variant-success-background, green);\n  color: var(--alert-variant-success-color, #fff);\n}\n\n.alert--variant-info {\n  background: var(--alert-variant-info-background, lightblue);\n  color: var(--alert-variant-info-color, #fff);\n}"; }
};

export { Alert as t_alert };
