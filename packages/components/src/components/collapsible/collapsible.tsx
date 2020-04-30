import { Component, h, Prop, Host, State } from '@stencil/core';
import { CssClassMap } from '../../utils/utils';
import classNames from 'classnames';
import { styles } from './collapsible.styles';
import { CssInJs } from '../../utils/css-in-js';
import { StyleSheet } from 'jss';
import Base from '../../utils/base-interface';

@Component({
  tag: 'scale-collapsible',
  shadow: true,
})
export class Collapsible implements Base {
  /** (optional) Injected jss styles */
  @Prop() styles?: StyleSheet;
  /** decorator Jss stylesheet */
  @CssInJs('Collapsible', styles) stylesheet: StyleSheet;

  @Prop() wrapper?: string = 'div';
  @Prop() label: string;
  @Prop() isExpanded?: boolean;

  @State() expanded: boolean = false;

  componentWillLoad() {
    this.expanded = this.isExpanded
  }
  componentWillUpdate() {}

  handleClick() {
    this.expanded = !this.expanded;
  }

  render() {
    const WrapperTag = this.wrapper;

    return (
      <Host>
        <style>{this.stylesheet.toString()}</style>
        <WrapperTag>
          <button class={this.getCssClassMap()} onClick={this.handleClick.bind(this)} aria-expanded={this.expanded ? 'true' : 'false'}>
            {this.label}
            {/* TODO scale-icon should be used instead */}
            <svg
              width="18"
              height="10"
              viewBox="0 0 18 10"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M.563 1.063A.544.544 0 011.5.65l7.499 7.499L16.462.687a.544.544 0 01.788 0 .544.544 0 010 .788L9.375 9.35a.544.544 0 01-.787 0L.713 1.475a.564.564 0 01-.15-.413z"
                fill="currentColor"
                fill-rule="nonzero"
              />
            </svg>
          </button>
          <div hidden={!this.expanded}>
            <slot />
          </div>
        </WrapperTag>
      </Host>
    );
  }

  getCssClassMap(): CssClassMap {
    const { classes } = this.stylesheet;
    return classNames(classes.collapsible);
  }
}
