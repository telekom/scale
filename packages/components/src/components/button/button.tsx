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
  /** (optional) Icon only */
  @Prop() iconSize?: number = 24;
  /** (optional) Icon only */
  @Prop() icon?: string;
  /** (optional) Icon before */
  @Prop() iconBefore?: string;
  /** (optional) Icon after */
  @Prop() iconAfter?: string;
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
  @CssInJs('Button', styles, {
    // this assigns button 'color' to nested icon if '--icon-color' is not provided
    'button.--icon-color': 'button.color',
    'button.&:hover.--icon-color': 'button.&:hover.color',
  })
  stylesheet: StyleSheet;

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
          {...(!!this.href ? { href: this.href } : {})}
          {...(!!this.href ? { target: this.target } : {})}
          {...(!!!this.href ? { disabled: this.disabled } : {})}
          {...(!!this.ariaLabel ? { 'aria-label': this.ariaLabel } : {})}
          {...role}
        >
          {!!this.icon === false &&
            (!!this.iconBefore === true || this.hasSlotBefore) && (
              <div class={classes.button__before}>
                {!!this.iconBefore ? (
                  <scale-icon path={this.iconBefore} size={this.iconSize} />
                ) : (
                  <slot name="before"></slot>
                )}
              </div>
            )}
          {this.icon && this.icon !== '' ? (
            <scale-icon path={this.icon} size={this.iconSize} />
          ) : (
            <slot />
          )}
          {!!this.icon === false &&
            (!!this.iconAfter === true || this.hasSlotAfter) && (
              <div class={classes.button__after}>
                {!!this.iconAfter ? (
                  <scale-icon path={this.iconAfter} size={this.iconSize} />
                ) : (
                  <slot name="after"></slot>
                )}
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
      this.icon && this.icon !== '' && classes[`button--icon-only`],
      this.disabled && classes[`button--disabled`]
    );
  }
}
