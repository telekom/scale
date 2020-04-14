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
  /** (optional) Tag link */
  @Prop() link?: string = '';
  /** (optional) Tag target */
  @Prop() target?: string = '_self';
  /** (optional) Tag target */
  @Prop() dismissable?: boolean = false;

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
    const Tag = !!this.link ? 'a' : 'span';
    const linkProps = !!this.link
      ? {
          href: this.link,
          target: this.target,
        }
      : {};
    const theme = (window as any).scale && (window as any).scale.theme;
    const { icons } = theme || defaultTheme;
    return (
      <Host>
        <style>{this.stylesheet.toString()}</style>
        <Tag class={this.getCssClassMap()} {...linkProps}>
          <slot />
          {this.dismissable && (
            <scale-icon
              focusable
              size={16}
              path={icons.close}
              onClick={event => this.handleClose(event)}
            />
          )}
        </Tag>
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
      !!this.link && classes[`tag--link`],
      !!this.dismissable && classes[`tag--dismissable`]
    );
  }
}
