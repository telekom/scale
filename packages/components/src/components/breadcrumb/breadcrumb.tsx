import { Component, h, State, Element, Prop, Host } from '@stencil/core';
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
  - [x] refactor using slots
  - [x] allow customizing the separator (string or icon), once
  - [ ] add styles for link states (hover, focus, pressed)
  - [ ] is breadcrumb-item really needed?
  - [ ] add tests
  - [ ] test styling links from outside (depends on theming strategy)
*/

@Component({
  tag: 'scale-breadcrumb',
  shadow: true,
})
export class Breadcrumb implements Base {
  @Element() hostElement: HTMLElement;

  @Prop() separator?: string = '\\';

  /** (optional) Injected jss styles */
  @Prop() styles?: StyleSheet;
  /** decorator Jss stylesheet */
  @CssInJs('Breadcrumb', styles) stylesheet: StyleSheet;

  @State() linksArray = [];
  @State() separatorSlot: HTMLElement = null;

  componentWillLoad() {
    if (this.linksArray.length === 0) {
      this.setLinksArray();
    }
    this.separatorSlot = this.hostElement.querySelector('[slot="separator"]');
  }

  componentWillUpdate() {}

  setLinksArray() {
    this.linksArray = Array.from(this.hostElement.children).filter(
      element => element.slot === ''
    );
  }

  render() {
    const { classes } = this.stylesheet
    const isLast = index => index === this.linksArray.length - 1;
    const getCurrentAttr = index =>
      isLast(index) === true ? { 'aria-current': 'page' } : undefined;

    return (
      <Host>
        <style>{this.stylesheet.toString()}</style>
        <nav aria-label="Breadcrumb" class={this.getCssClassMap()}>
          <ol>
            {this.linksArray.map((element, index) => {
              const separator =
                this.separatorSlot != null ? (
                  <span class={classes.separator} innerHTML={this.separatorSlot.innerHTML} />
                ) : (
                  <span class={classes.separator}>{this.separator}</span>
                );
              return (
                <li>
                  {element.href ? (
                    <a href={element.href} class={classNames(isLast(index) && classes.current, classes.link)} {...getCurrentAttr(index)}>
                      {element.textContent}
                    </a>
                  ) : (
                    <span class={classNames(isLast(index) && classes.current)}>{element.textContent}</span>
                  )}
                  {!isLast(index) ? separator : null}
                </li>
              );
            })}
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
