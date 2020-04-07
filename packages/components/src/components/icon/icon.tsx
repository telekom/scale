import { Component, Prop, h, Host } from '@stencil/core';
import { CssClassMap } from '../../utils/utils';
import classNames from 'classnames';
import { styles } from './icon.styles';
import { CssInJs } from '../../utils/css-in-js';
import { StyleSheet } from 'jss';
import Base from '../../utils/base-interface';

@Component({
  tag: 'scale-icon',
  shadow: true,
})
export class Icon implements Base {
  /** (optional) Tag class */
  @Prop() customClass?: string = '';
  /** (optional) Tag theme */
  @Prop() name?: string;
  @Prop() path: string;
  @Prop() size?: number;
  @Prop() height?: number = 24;
  @Prop() width?: number = 24;

  /** (optional) Injected jss styles */
  @Prop() styles?: StyleSheet;
  /** decorator Jss stylesheet */
  @CssInJs('Icon', styles) stylesheet: StyleSheet;

  componentWillLoad() {}
  componentWillUpdate() {}

  render() {
    const hostStyles = `
:host {
  height: auto;
  width: auto;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}
path {
  transition: all .2s ease-in-out;
}
`;

    return (
      <Host>
        <style>
          {hostStyles}
          {this.stylesheet.toString()}
        </style>
        <svg
          class={this.getCssClassMap()}
          width={this.size || this.height}
          height={this.size || this.width}
          viewBox={`0 0 26 26`}
        >
          <path d={this.path} stroke="transparent" fill="transparent" />
        </svg>
      </Host>
    );
  }

  getCssClassMap(): CssClassMap {
    const { classes } = this.stylesheet;
    return classNames(
      classes.icon,
      this.name && this.name,
      this.customClass && this.customClass
    );
  }
}
