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

import { Component, Prop, h, Host, Listen, Element } from '@stencil/core';
import classNames from 'classnames';
import { hasShadowDom } from '../../utils/utils';

@Component({
  tag: 'scale-button',
  styleUrl: 'button.css',
  shadow: true,
})
export class Button {
  @Element() hostElement: HTMLElement;

  /** (optional) The size of the button */
  @Prop() size?: 'small' | 'large' = 'large';
  /** (optional) Button variant */
  @Prop() variant?: string = 'primary';
  /** (optional) If `true`, the button is disabled */
  @Prop() disabled?: boolean = false;
  /** (optional) Button type */
  @Prop() type?: 'reset' | 'submit' | 'button';
  /** (optional) Set to `true` when the button contains only an icon */
  @Prop() iconOnly?: boolean = false;
  /** (optional) Icon position related to the label */
  @Prop({ reflect: true }) iconPosition: 'before' | 'after' = 'before';
  /** (optional) aria-label attribute needed for icon-only buttons */
  @Prop() ariaLabel: string;
  /** (optional) When present, an <a> tag will be used */
  @Prop() href?: string;
  /** (optional) The target attribute for the <a> tag */
  @Prop() target?: string = '_self';
  /** (optional) Injected CSS styles */
  @Prop() styles?: string;
  /** (optional) If `true`, a download is triggrered */
  @Prop() download?: boolean = false;

  /**
   * Prevent clicks from being emitted from the host
   * when the component is `disabled`.
   */
  @Listen('click', { capture: true })
  handleHostClick(event: Event) {
    if (this.disabled === true) {
      event.stopImmediatePropagation();
    }
  }

  /**
   * Hack to make the button behave has expected when inside forms.
   * @see https://github.com/ionic-team/ionic-framework/blob/master/core/src/components/button/button.tsx#L155-L175
   */
  handleClick = (ev: Event) => {
    // No need to check for `disabled` because disabled buttons won't emit clicks
    if (hasShadowDom(this.hostElement)) {
      const form = this.hostElement.closest('form');
      if (form) {
        ev.preventDefault();

        const fakeButton = document.createElement('button');
        if (this.type) {
          fakeButton.type = this.type;
        }
        fakeButton.style.display = 'none';
        form.appendChild(fakeButton);
        fakeButton.click();
        fakeButton.remove();
      }
    }
  };

  connectedCallback() {
    this.setIconPositionProp();
  }

  /**
   * Detect whether the last node is an element (not text).
   * If so, it's probably an icon, so we set `iconPosition` to `after`.
   */
  setIconPositionProp() {
    const nodes = Array.from(this.hostElement.childNodes).filter((node) => {
      // ignore empty text nodes, which are probably due to formatting
      return !(node.nodeType === 3 && node.nodeValue.trim() === '');
    });
    if (
      !this.iconOnly &&
      nodes[nodes.length - 1].nodeName.substr(0, 10) === 'SCALE-ICON'
    ) {
      this.iconPosition = 'after';
    }
  }

  render() {
    const basePart = classNames(
      'base',
      this.variant && `variant-${this.variant}`,
      this.iconOnly && 'icon-only',
      !this.iconOnly && this.iconPosition,
      this.disabled && 'disabled'
    );

    return (
      <Host>
        {this.styles && <style>{this.styles}</style>}

        {this.href ? (
          <a
            class={this.getCssClassMap()}
            href={this.href}
            download={this.download}
            target={this.target}
            rel={this.target === '_blank' ? 'noopener noreferrer' : undefined}
            aria-label={this.ariaLabel}
            part={basePart}
          >
            <slot />
          </a>
        ) : (
          <button
            class={this.getCssClassMap()}
            onClick={this.handleClick}
            disabled={this.disabled}
            type={this.type}
            aria-label={this.ariaLabel}
            part={basePart}
          >
            <slot />
          </button>
        )}
      </Host>
    );
  }

  getCssClassMap() {
    return classNames(
      'button',
      this.size && `button--size-${this.size}`,
      this.variant && `button--variant-${this.variant}`,
      this.iconOnly && `button--icon-only`,
      !this.iconOnly &&
        this.iconPosition &&
        `button--icon-${this.iconPosition}`,
      this.disabled && !this.href && `button--disabled`
    );
  }
}
