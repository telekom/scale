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
  @Prop() variant?: string = 'unordered';
  @Prop() type?: string;
  @Prop() listStyleType?: string;
  /** (optional) Injected jss styles */
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
    if (this.variant === 'unordered') {
      this.stylesheet.update({
        listStyleType: this.listStyleType,
      });
    }

    return (
      <Host>
        <style>{this.stylesheet.toString()}</style>
        <Tag class={this.getCssClassMap()} type={this.type}>
          <slot />
        </Tag>
      </Host>
    );
  }
  getCssClassMap(): CssClassMap {
    const { classes } = this.stylesheet;
    return classNames(
      classes.list,
      this.variant && classes[`list--variant-${this.variant}`],
      this.type && classes[`list--type-${this.type}`], // ordered
      this.listStyleType && 'list-style-type' // unordered
    );
  }
}
