import { Component, Prop, h, Host, Event, EventEmitter } from '@stencil/core';
import { CssClassMap } from '../../utils/utils';
import classNames from 'classnames';
import { styles } from './tag.styles';
import { CssInJs } from '../../utils/css-in-js';
import { StyleSheet } from 'jss';
import Base from '../../utils/base-interface';
import { defaultTheme } from '../../theme/defaultTheme';

@Component({
  tag: 'scale-tag',
  shadow: true,
})
export class Tag implements Base {
  /** (optional) Tag class */
  @Prop() customClass?: string = '';
  /** (optional) Tag size */
  @Prop() size?: string = '';
  /** (optional) Tag variant */
  @Prop() variant?: string = '';
  /** (optional) Tag href */
  @Prop() href?: string = '';
  /** (optional) Tag target */
  @Prop() target?: string = '_self';
  /** (optional) Tag dismissable */
  @Prop() dismissable?: boolean = false;
  /** (optional) Tag disabled */
  @Prop() disabled?: boolean = false;

  /** (optional) Injected jss styles */
  @Prop() styles?: StyleSheet;
  /** decorator Jss stylesheet */
  @CssInJs('Tag', styles) stylesheet: StyleSheet;

  @Event() close: EventEmitter<any>;

  componentWillLoad() {}
  componentWillUpdate() {}

  handleClose(event) {
    event.preventDefault();
    event.stopPropagation();
    this.close.emit(event);
  }

  render() {
    const Element = !!this.href && !this.disabled ? 'a' : 'span';
    const linkProps = !!this.href
      ? {
          href: this.href,
          target: this.target,
        }
      : {};
    const iconProps = !this.disabled
      ? {
          focusable: true,
          onClick: event => this.handleClose(event),
        }
      : {};
    const theme =
      typeof window !== 'undefined' &&
      (window as any).scale &&
      (window as any).scale.theme;

    const { icons } = theme || defaultTheme;
    return (
      <Host>
        <style>{this.stylesheet.toString()}</style>
        <Element class={this.getCssClassMap()} {...linkProps}>
          <slot />
          {this.dismissable && (
            <scale-icon size={16} path={icons.close} {...iconProps} />
          )}
        </Element>
      </Host>
    );
  }

  getCssClassMap(): CssClassMap {
    const { classes } = this.stylesheet;
    return classNames(
      classes.tag,
      this.customClass && this.customClass,
      this.size && classes[`tag--size-${this.size}`],
      this.variant && classes[`tag--variant-${this.variant}`],
      !!this.href && classes[`tag--link`],
      !!this.dismissable && classes[`tag--dismissable`],
      !!this.disabled && classes[`tag--disabled`]
    );
  }
}
