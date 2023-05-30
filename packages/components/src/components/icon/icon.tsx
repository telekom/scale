/**
 * @license
 * Scale https://github.com/telekom/scale
 *
 * Copyright (c) 2021 Egor Kirpichev and contributors, Deutsche Telekom AG
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { Component, Prop, h, Host } from '@stencil/core';
import classNames from 'classnames';

@Component({
  tag: 'scale-icon',
  styleUrl: './icon.css',
})
export class Icon {
  /**
   * A name that will be used to reference an SVG object defined elsewhere,
   * via `<use xlink:href="">`. `icon-` will be prepended to the name, so if
   * you pass `circle`, it will look for for the `icon-circle` id
   * e.g. `<use xlink:href="#icon-circle">`.
   * If there is no element in the document with the id by the name provided,
   * this component will render empty.
   */
  @Prop() name?: string;
  /**
   * A path shape to be used in the `d` attribute of a path element.
   */
  @Prop() path?: string;
  /**
   * Will be used for both `width` and `height`, all icons are square.
   * Keep in mind the `viewBox` attribute is set to "0 0 20 20".
   */
  @Prop({ reflect: true }) size?: number = 20;
  /** The SVG `fill` attribute */
  @Prop() fill?: string = 'var(--icon-color, currentColor)';
  /** The SVG `stroke` attribute */
  @Prop() stroke?: string = 'transparent';
  /** (optional) If `true` the icon can receive focus */
  @Prop() focusable?: boolean = false;
  /** (optional) If `true` the svg element will get aria-hidden="true" */
  @Prop() decorative?: boolean = false;
  /** (optional) When using the icon as standalone, make it meaningful for accessibility */
  @Prop() accessibilityTitle?: string;

  render() {
    const pathAttributes = {
      fill: this.fill,
      stroke: this.stroke,
    };
    const ariaHidden = this.decorative ? { 'aria-hidden': 'true' } : {};
    const focusable = this.focusable ? { tabindex: 0 } : {};
    return (
      <Host>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class={this.getCssClassMap()}
          part="base"
          width={this.size}
          height={this.size}
          viewBox="0 0 24 24"
          role="img"
          {...ariaHidden}
          {...focusable}
        >
          {this.accessibilityTitle && <title>{this.accessibilityTitle}</title>}
          {this.path ? (
            <path d={this.path} {...pathAttributes} part="path" />
          ) : (
            <use xlinkHref={`#icon-${this.name}`} {...pathAttributes} />
          )}
        </svg>
      </Host>
    );
  }

  getCssClassMap() {
    return classNames('icon');
  }
}
