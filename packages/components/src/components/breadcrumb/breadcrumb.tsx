import { Component, h, Prop, Host } from '@stencil/core';
import { CssClassMap } from '../../utils/utils';
import classNames from 'classnames';
import { styles } from './breadcrumb.styles';
import { CssInJs } from '../../utils/css-in-js';
import { StyleSheet } from 'jss';
import Base from '../../utils/base-interface';

/*
  @see https://www.w3.org/TR/wai-aria-practices/examples/breadcrumb/index.html

  TODO
  ----
  - [ ] try and use an <ol>
  - [ ] how to make separator customizable via props?
  - [ ] add styles for hover state (themable)
  - [ ] add styles for focus state (themable)
  - [ ] add "styles for pressed" (active) state (themable)
  - [ ] add tests
*/

@Component({
  tag: 'scale-breadcrumb',
  shadow: true,
})
export class Breadcrumb implements Base {
  /** (optional) Injected jss styles */
  @Prop() styles?: StyleSheet;
  /** decorator Jss stylesheet */
  @CssInJs('Breadcrumb', styles) stylesheet: StyleSheet;

  componentWillLoad() {}
  componentWillUpdate() {}

  render() {
    // const { classes } = this.stylesheet;

    return (
      <Host>
        <style>{this.stylesheet.toString()}</style>
        <nav aria-label="Breadcrumb" class={this.getCssClassMap()}>
          {/* <a class={`${classes['breadcrumb__link']}`} href="/first">The very beginning</a> */}
          <slot />
        </nav>
      </Host>
    );
  }

  getCssClassMap(): CssClassMap {
    const { classes } = this.stylesheet;
    return classNames(classes.breadcrumb);
  }
}
