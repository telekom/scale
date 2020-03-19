import { Component, Prop, h, Method, Host, Element } from '@stencil/core';
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
  hasSlotBefore: boolean;
  hasSlotAfter: boolean;

  @Element() hostElement: HTMLElement;
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

  componentWillLoad() {
    this.hasSlotBefore = !!this.hostElement.querySelector('[slot="before"]');
    this.hasSlotAfter = !!this.hostElement.querySelector('[slot="after"]');
  }

  componentWillUpdate() {}

  render() {
    const { classes } = this.stylesheet;
    const Tag = this.href ? 'a' : 'button';
    const role = this.href
      ? { role: this.role || 'button' }
      : this.role
      ? { role: this.role }
      : {};

    return (
      <Host>
        <style>{this.stylesheet.toString()}</style>
        <Tag
          class={this.getCssClassMap()}
          tabindex={this.focusable ? 0 : -1}
          {...(!!!this.href ? { disabled: this.disabled } : {})}
          {...(!!this.ariaLabel ? { 'aria-label': this.ariaLabel } : {})}
          {...role}
        >
          {this.hasSlotBefore && (
            <div class={classes.button__before}>
              <slot name="before" />
            </div>
          )}
          <slot />
          {this.hasSlotAfter && (
            <div class={classes.button__after}>
              <slot name="after" />
            </div>
          )}
        </Tag>
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
