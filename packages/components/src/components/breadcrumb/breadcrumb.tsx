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
  - [x] try and use an <ol>
  - [x] allow customizing the separator
  - [ ] add themable styles for link states (hover, focus, pressed)
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
    return (
      <Host>
        <style>{this.stylesheet.toString()}</style>
        <nav aria-label="Breadcrumb" class={this.getCssClassMap()}>
          <ol>
            <slot />
          </ol>
        </nav>
      </Host>
    );
  }

  getCssClassMap(): CssClassMap {
    const { classes } = this.stylesheet;
    return classNames(classes.breadcrumb);
  }
}
