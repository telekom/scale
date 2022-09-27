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

import { Component, Element, h, Prop, Host } from '@stencil/core';
import classNames from 'classnames';
import statusNote from '../../utils/status-note';
@Component({
  tag: 'scale-chart-stack-card',
  styleUrl: 'chart-stack-card.css',
})
export class ChartStackCard {
  @Element() hostElement: HTMLElement;
  /** Chart Data */
  @Prop() data: string | Array<Record<'type' | 'value' | 'percentage', string>>;
  /** Chart Title */
  @Prop() heading: string;

  readData = (data) => {
    try {
      return Array.isArray(JSON.parse(data)) ? JSON.parse(data) : [];
    } catch (error) {
      return Array.isArray(data) ? data : [];
    }
  };

  getOpacity(item, index) {
    return JSON.stringify(index === 0 ? 1 : +item.percentage / 100);
  }

  getCardStyle() {
    return `
      .card:after {
          content: '';
          display: block;
          background: linear-gradient(0deg, white, rgba(255,255,255, 0));
          height: 2rem;
          margin-top: -2rem;
          position: relative;
        }

      .card__body: {
        padding-bottom: 0 !important;
      }
  `;
  }

  connectedCallback() {
    statusNote({ source: this.hostElement, type: 'warn' });
  }

  render() {
    return (
      <Host>
        <div class={this.getCssClassMap()}>
          <scale-card>
            <div class="header">{this.heading}</div>
            <div class="bar">
              {this.readData(this.data)
                .sort((a, b) => b.percentage - a.percentage)
                .map((item, index) => {
                  if (+item.percentage > 0) {
                    return (
                      <div
                        class="bar__item"
                        style={{
                          opacity: this.getOpacity(item, index),
                          flex: JSON.stringify(+item.percentage),
                        }}
                      />
                    );
                  }
                })}
            </div>

            <div class="legend">
              {this.readData(this.data)
                .sort((a, b) => b.percentage - a.percentage)
                .map((item, index) => (
                  <div class="legend__row">
                    <div class="legend__row__item">
                      <div
                        class="legend__item"
                        style={{
                          opacity: this.getOpacity(item, index),
                        }}
                      />
                      <div class="legend__label spacer">{item.type}</div>
                    </div>
                    <div class="legend__row__item">
                      <div class="spacer">{item.value}</div>
                      <div class="spacer">{item.percentage}%</div>
                    </div>
                  </div>
                ))}
            </div>
          </scale-card>
        </div>
      </Host>
    );
  }

  getCssClassMap() {
    return classNames('chart-stack-card');
  }
}
