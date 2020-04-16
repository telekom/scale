import { Component, h, Prop, Host } from '@stencil/core';
import { CssClassMap } from '../../utils/utils';
import classNames from 'classnames';
import { styles } from './list-item.styles';
import { CssInJs } from '../../utils/css-in-js';
import { StyleSheet } from 'jss';
import Base from '../../utils/base-interface';
@Component({
  tag: 'scale-list-item',
  shadow: true,
})
export class ListItem implements Base {
  /** (optional) List item icon */
  @Prop() icon?: string;
  /** (optional) list Icon size */
  @Prop() iconSize?: number = 16;
  /** (optional) List item style type */
  @Prop() type?: string;
  /** (optional) Injected jss styles */
  @Prop() styles?: StyleSheet;
  /** decorator Jss stylesheet */
  @CssInJs('ListItem', styles) stylesheet: StyleSheet;
  componentWillLoad() {}
  componentWillUpdate() {}

  render() {
    this.stylesheet.update({
      type: this.type,
    });

    return (
      <Host>
        <style>{this.stylesheet.toString()}</style>
        <li class={this.getCssClassMap()}>
          {!!this.icon && (
            <scale-icon path={this.icon} size={this.iconSize}></scale-icon>
          )}
          <slot />
        </li>
      </Host>
    );
  }

  getCssClassMap(): CssClassMap {
    const { classes } = this.stylesheet;
    return classNames(
      classes['list-item'],
      this.type && classes['list-item--type'],
      !!this.icon && classes[`list-item--has-icon`]
    );
  }
}
