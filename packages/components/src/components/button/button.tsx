import { Component, Prop, h, Method, Host } from '@stencil/core';
import { CssClassMap } from '../../utils/utils';
import classNames from 'classnames';
import { styles } from './button.styles';
import { CssInJs } from '../../utils/css-in-js';
import { StyleSheet } from 'jss';
import Base from '../../utils/base-interface';

@Component({
  tag: 'scale-button',
  shadow: true,
})
export class Button implements Base {
  /** (optional) Button class */
  @Prop() customClass?: string = '';
  /** (optional) Button size */
  @Prop() size?: string = '';
  /** (optional) Button variant */
  @Prop() variant?: string = '';
  /** (optional) Disabled button */
  @Prop() disabled?: boolean = false;
  /** (optional) Link button */
  @Prop() href?: string = '';
  /** (optional) Link target button */
  @Prop() target?: string = '_self';

  @Prop() ariaLabel?: string = '';
  @Prop() focusable?: boolean = true;
  @Prop() role?: string = '';

  /** (optional) Injected jss styles */
  @Prop() styles?: StyleSheet;
  /** decorator Jss stylesheet */
  @CssInJs('Button', styles) stylesheet: StyleSheet;

  /** Button method: disable()  */
  @Method()
  async disable() {
    this.disabled = true;
  }

  /** Button method: enable()  */
  @Method()
  async enable() {
    this.disabled = false;
  }

  componentWillLoad() {}

  componentWillUpdate() {}

  render() {
    return (
      <Host>
        <style>{this.stylesheet.toString()}</style>
        {!!this.href ? (
          <a
            class={this.getCssClassMap()}
            href={this.href}
            target={this.target}
            aria-label={this.ariaLabel}
            tabindex={this.focusable ? 0 : -1}
            role={this.role || 'button'}
          >
            <slot />
          </a>
        ) : (
          <button
            class={this.getCssClassMap()}
            disabled={this.disabled}
            aria-label={this.ariaLabel}
            tabindex={this.focusable ? 0 : -1}
            {...(!!this.role ? { role: this.role } : {})}
          >
            <slot />
          </button>
        )}
      </Host>
    );
  }

  getCssClassMap(): CssClassMap {
    const { classes } = this.stylesheet;
    return classNames(
      classes.button,
      this.customClass && this.customClass,
      this.size && classes[`button--size-${this.size}`],
      this.variant && classes[`button--variant-${this.variant}`],
      this.disabled && classes[`button--disabled`]
    );
  }
}
