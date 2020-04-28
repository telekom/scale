import { Component, h, Prop, Host } from '@stencil/core';
import { CssClassMap } from '../../utils/utils';
import classNames from 'classnames';
import { styles } from './sidebar-nav.styles';
import { CssInJs } from '../../utils/css-in-js';
import { StyleSheet } from 'jss';
import Base from '../../utils/base-interface';

/*
  @see https://inclusive-components.design/collapsible-sections/
  @see https://developers.google.com/web/fundamentals/web-components/examples/howto-tabs
*/

@Component({
  tag: 'scale-sidebar-nav',
  shadow: true,
})
export class SidebarNav implements Base {
  /** (optional) Injected jss styles */
  @Prop() styles?: StyleSheet;
  /** decorator Jss stylesheet */
  @CssInJs('SidebarNav', styles) stylesheet: StyleSheet;

  componentWillLoad() {}
  componentWillUpdate() {}

  render() {
    const { classes } = this.stylesheet;

    return (
      <Host>
        <style>{this.stylesheet.toString()}</style>
        {/* TODO think about possible aria-labeledby with id from heading, if present */}
        <nav class={this.getCssClassMap()}>
          <slot name="heading" />
          <ul class={classes.list}>
            <slot />
          </ul>
        </nav>
      </Host>
    );
  }

  getCssClassMap(): CssClassMap {
    const { classes } = this.stylesheet;
    return classNames(classes.nav);
  }
}
