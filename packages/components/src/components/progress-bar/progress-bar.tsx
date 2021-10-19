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
let i = 0;
@Component({
  tag: 'scale-progress-bar',
  styleUrl: './progress-bar.css',
  shadow: true,
})
export class ProgressBar {
  /** (optional) Progress bar busy switch */
  @Prop() busy?: boolean = false;
  /** (required) Progress bar percentage */
  @Prop() percentage: number = 0;
  /** (optional) Progress bar customColor */
  @Prop() customColor?: string;
  /** (optional) Progress bar stroke width */
  @Prop() strokeWidth?: number = 6;
  /** (optional) Progress bar percentage text */
  @Prop() showStatus?: boolean;
  /** (optional) Progress bar icon indicator */
  @Prop() icon?: string;
  /** (optional) Progress bar status description text */
  @Prop() statusDescription?: string;
  /** (optional) Progress text display inside bar */
  @Prop() statusInside?: boolean;
  /** (optional) Progress bar error */
  @Prop() hasError?: boolean;
  /** (optional) Progress bar disabled */
  @Prop() disabled?: boolean;
  /** (optional) Progress bar id */
  @Prop() progressBarId?: string;
  /** (optional) Progress bar label */
  @Prop() label?: string;
  /** (optional) disables aria-live */
  @Prop() mute?: boolean;
  /** (optional) Injected CSS styles */
  @Prop() styles?: string;

  componentWillLoad() {
    if (this.progressBarId == null) {
      this.progressBarId = 'progress-bar-' + i++;
    }
  }
  componentWillUpdate() {}
  disconnectedCallback() {}

  transitions = (width: number) => `
    @keyframes showProgress {
      from {
        width: 0;
      }
      to {
        width: ${width}%;
      }
    }
  `;

  progressStyle = () => {
    return {
      width: `${this.percentage}%`,
      border: '1px solid transparent',
      background: this.customColor,
      animation: 'showProgress 3s ease-in-out',
    };
  };

  render() {
    return (
      <Host>
        {this.styles && <style>{this.styles}</style>}
        <style>{this.transitions(this.percentage)}</style>

        <div part={this.getBasePartMap()} class={this.getCssClassMap()}>
          {!!this.label && (
            <label
              part="label"
              class="progress-bar__label"
              htmlFor={this.progressBarId}
            >
              {this.label}
            </label>
          )}
          <div part="wrapper" class="progress-bar-wrapper">
            <div
              part="outer"
              class="progress-bar__outer"
              style={{ height: `${this.strokeWidth}px` }}
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={this.percentage}
              aria-busy={this.busy}
              aria-valuetext={`${this.percentage}%`}
              aria-label={this.label}
              id={this.progressBarId}
            >
              <div
                part="inner"
                class="progress-bar__inner"
                style={this.progressStyle()}
              >
                {!!this.statusInside && (
                  <div
                    part="inner-status"
                    class="progress-bar__inner-status"
                    aria-hidden="true"
                  >
                    {this.percentage}%
                  </div>
                )}
              </div>
            </div>

            {!!this.showStatus && (
              <div
                part="status"
                class="progress-bar__status"
                aria-hidden="true"
              >
                {this.percentage}%
              </div>
            )}

            <slot name="icon"></slot>
          </div>
        </div>
        {!!this.statusDescription && (
          <div
            part="status-description"
            class="progress-bar__status-description"
            role="alert"
          >
            {this.statusDescription}
          </div>
        )}
        {!this.mute && (
          <span aria-live="polite" class="progress-bar__aria-live">
            {this.percentage !== Math.round(this.percentage / 10) * 10
              ? `${Math.round(this.percentage / 10) * 10}%`
              : null}
          </span>
        )}
      </Host>
    );
  }

  getBasePartMap() {
    return this.getCssOrBasePartMap('basePart');
  }

  getCssClassMap() {
    return this.getCssOrBasePartMap('css');
  }

  getCssOrBasePartMap(mode: 'basePart' | 'css') {
    const component = 'progress-bar';
    const prefix = mode === 'basePart' ? '' : `${component}--`;

    return classNames(
      component,
      this.hasError && `${prefix}has-error`,
      this.disabled && `${prefix}disabled`
    );
  }
}
