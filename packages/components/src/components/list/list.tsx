import { Component, h, Prop, Host } from '@stencil/core';
import { CssClassMap } from '../../utils/utils';
import classNames from 'classnames';
import { styles } from './list.styles';
import { CssInJs } from '../../utils/css-in-js';
import { StyleSheet } from 'jss';
import Base from '../../utils/base-interface';
@Component({
  tag: 'scale-list',
  shadow: true,
})
export class List implements Base {
  /** (optional) List variant */
  @Prop() variant?: string = 'unordered';
  @Prop() styles?: StyleSheet;
  /** decorator Jss stylesheet */
  @CssInJs('List', styles) stylesheet: StyleSheet;
  componentWillLoad() {}
  componentWillUpdate() {}
  render() {
    let Tag;

    switch (this.variant) {
      case 'ordered':
        Tag = 'ol';
        break;
      case 'definition':
        Tag = 'dl';
        break;
      default:
        Tag = 'ul';
        break;
    }

    return (
      <Host>
        <style>{this.stylesheet.toString()}</style>
        <Tag class={this.getCssClassMap()}>
          <slot />
        </Tag>
      </Host>
    );
  }
  getCssClassMap(): CssClassMap {
    const { classes } = this.stylesheet;
    return classNames(
      classes.list,
      this.variant && classes[`list--variant-${this.variant}`]
    );
  }
}
