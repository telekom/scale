import { Component, h, Prop, Host } from '@stencil/core';
import { CssClassMap } from '../../utils/utils';
import classNames from 'classnames';
import { styles } from './breadcrumb-item.styles';
import { CssInJs } from '../../utils/css-in-js';
import { StyleSheet } from 'jss';
import Base from '../../utils/base-interface';

@Component({
  tag: 'scale-breadcrumb-item',
  shadow: true,
})
export class BreadcrumbItem implements Base {
  @Prop() href: string;
  @Prop() current?: boolean = false;
  @Prop() path?: string =
    'M.793 17.947a1 1 0 01-.058-1.35l.058-.064 7.414-7.411L.793 1.707A1 1 0 01.734.357L.793.293a1 1 0 011.35-.059l.064.059 8.828 8.828-8.828 8.826a1 1 0 01-1.414 0z';
  @Prop() size?: number;
  @Prop() height?: number = 19;
  @Prop() width?: number = 11;
  @Prop() separator?: string;

  /** (optional) Injected jss styles */
  @Prop() styles?: StyleSheet;
  /** decorator Jss stylesheet */
  @CssInJs('BreadcrumbItem', styles) stylesheet: StyleSheet;

  componentWillLoad() {}
  componentWillUpdate() {}

  render() {
    const { classes } = this.stylesheet;
    // Set aria-current="page" to current page
    const current = this.current === true ? { 'aria-current': 'page' } : {};
    // Define separator, either a string in a span or <scale-icon>
    const separator =
      this.separator != null ? (
        <span class={`${classes['breadcrumb__item-icon']}`} aria-hidden>
          {this.separator}
        </span>
      ) : (
        <scale-icon
          class={`${classes['breadcrumb__item-icon']}`}
          path={this.path}
          size={this.size}
          height={this.height}
          width={this.width}
          aria-hidden
        />
      );

    return (
      <Host>
        <style>{this.stylesheet.toString()}</style>
        <li class={this.getCssClassMap()}>
          <a href={this.href} {...current}>
            <slot />
          </a>{' '}
          {this.current !== true ? separator : null}
        </li>
      </Host>
    );
  }

  getCssClassMap(): CssClassMap {
    const { classes } = this.stylesheet;
    return classNames(classes.breadcrumb__item);
  }
}
