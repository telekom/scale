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

  // Temporary, testing
  @Prop() bold: boolean = false;
  @Prop() border: boolean = true;

  @State() expanded: boolean = false;

  componentWillLoad() {
    this.expanded = this.isExpanded;
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
          <button
            class={this.getCssClassMap()}
            onClick={this.handleClick.bind(this)}
            aria-expanded={this.expanded ? 'true' : 'false'}
          >
            {this.label}
            {/* TODO hard-coded for now, scale-icon should be used instead */}
            {this.expanded ? (
              this.bold ? (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14 10.5c0 .25-.1.5-.3.7-.4.4-1.025.4-1.425 0L8 6.925 3.7 11.2c-.4.4-1.025.4-1.425 0a.996.996 0 010-1.425l5-5c.4-.4 1.025-.4 1.425 0l5 5c.2.225.3.475.3.725z"
                    fill="currentColor"
                  />
                </svg>
              ) : (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.624 10.624A.362.362 0 0113 10.9l-5-5-4.975 5a.362.362 0 01-.525 0 .363.363 0 010-.525l5.25-5.25c.15-.15.375-.15.525 0l5.25 5.25c.076.05.1.15.1.25z"
                    fill="currentColor"
                  />
                </svg>
              )
            ) : null}
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
    return classNames(
      classes.collapsible,
      this.bold && classes['collapsible--bold'],
      this.border && classes['collapsible--border']
    );
  }
}
