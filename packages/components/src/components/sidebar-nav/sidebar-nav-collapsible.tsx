import { Component, h, Prop, Host } from '@stencil/core';
import { CssClassMap } from '../../utils/utils';
import classNames from 'classnames';
import { styles } from './sidebar-nav-collapsible.styles';
import { CssInJs } from '../../utils/css-in-js';
import { StyleSheet } from 'jss';
import Base from '../../utils/base-interface';

@Component({
  tag: 'scale-sidebar-nav-collapsible',
  shadow: true,
})
export class SidebarNavCollapsible implements Base {
  /** (optional) Injected jss styles */
  @Prop() styles?: StyleSheet;
  /** decorator Jss stylesheet */
  @CssInJs('SidebarNavCollapsible', styles) stylesheet: StyleSheet;

  @Prop() label: string;
  @Prop() level: number = 2; // TODO validate this is a num between 2 and 6

  componentWillLoad() {}
  componentWillUpdate() {}

  handleClick(event) {
    const button = event.target.closest('button');
    if (button == null) {
      return;
    }
    const expanded = button.getAttribute('aria-expanded') === 'true';
    const target = button.parentElement.nextElementSibling;
    button.setAttribute('aria-expanded', !expanded);
    target.hidden = expanded;
  }

  render() {
    // This is basically a reset
    const hostStyles = `
      button {
        appearance: none;
        padding: 0;
        color: inherit;
        background: transparent;
        font: inherit;
        font-weight: inherit;
        border: none;
        border-radius: 0;
        cursor: pointer;
      }
      h2, h3, h4, h5 {
        margin: 0;
        font-size: inherit;
        font-weight: inherit;
      }
      ul {
        margin: 0;
        list-style-type: none;
        padding-left: 0;
      }
    `;
    const HeadingTag = 'h' + this.level;
    const { classes } = this.stylesheet;

    return (
      <Host>
        <style>
          {hostStyles}
          {this.stylesheet.toString()}
        </style>
        <li class={this.getCssClassMap()}>
          <HeadingTag class={classes.heading}>
            <button
              class={classes.button}
              onClick={this.handleClick}
              aria-expanded="false"
            >
              {this.label}
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
          </HeadingTag>
          <ul hidden>
            <slot />
          </ul>
        </li>
      </Host>
    );
  }

  getCssClassMap(): CssClassMap {
    const { classes } = this.stylesheet;
    return classNames(classes.collapsible);
  }
}
