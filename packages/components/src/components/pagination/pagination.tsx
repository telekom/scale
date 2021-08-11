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

import {
  Component,
  Prop,
  h,
  Host,
  Element,
  Event,
  EventEmitter,
  Watch,
} from '@stencil/core';
import classNames from 'classnames';
import statusNote from '../../utils/status-note';

/*
  TODO
  ====
  [ ] Support pages text as well as elements eg `page 1 / 5` vs `1 - 12 / 100`
  [ ] Add Pages drop-down (awaiting menu and menu-list components)
  [ ] Add text input option for choosing currernt page/start element
  [ ] Add events for specific button interactions (first, prev, next, last)
  [ ] Add :focus-visible support to avoid focus upon click in chrome
  [ ] Add accessibility attributes
  [ ] Add icons to the icon components ?
*/

const name = 'pagination';
@Component({
  tag: 'scale-pagination',
  styleUrl: 'pagination.css',
  shadow: true,
})
export class Pagination {
  /* 1. Host HTML Element */
  @Element() hostElement: HTMLElement;

  /* 2. State Variables (alphabetical) */

  /* 3. Public Properties (alphabetical) */
  /** (optional) Set to true to hide top and bottom borders */
  @Prop() hideBorders?: boolean = false;
  /** (optional) Set number of rows/elements to show per page */
  @Prop() pageSize?: number = 10;
  /** (optional) Index of first element to display */
  @Prop() startElement?: number = 0;
  /** (optional) Total number of rows/elements used to calculate page displays */
  @Prop() totalElements?: number = 1;
  /** (optional) Injected styles */
  @Prop() styles?: string;
  /** (optional) small  */
  @Prop() small = false;
  /** (optional) translation to 'Go to first page'  */
  @Prop() langGoFirst = 'Go to first page';
  /** (optional) translation to 'Go to next page'  */
  @Prop() langGoNextt = 'Go to next page';
  /** (optional) translation to 'Go to previous page'  */
  @Prop() langGoPrevious = 'Go to previous page';
  /** (optional) translation to 'Go to last page'  */
  @Prop() langGoLast = 'Go to last page';

  /* 4. Events (alphabetical) */
  /** Event triggered every time the data is edited, changing original rows data */
  @Event() scalePagination: EventEmitter<{
    startElement?: number;
    currentPage?: number;
  }>;

  /* 5. Private Properties (alphabetical) */
  /** Calculated width of largest text so buttons don't move while changing pages */
  maxWidth: number = 100;

  /* 6. Lifecycle Events (call order) */
  constructor() {}
  connectedCallback() {
    statusNote({ source: this.hostElement, tag: 'beta' });
  }
  componentWillLoad() {
    this.calculateWidth();
  }
  componentWillUpdate() {}
  componentDidRender() {}
  componentDidLoad() {}
  componentDidUpdate() {}
  disconnectedCallback() {}

  /* 7. Listeners */
  @Watch('totalElements')
  calculateWidth() {
    // calculate max possible width
    this.maxWidth = (this.totalElements.toString().length * 3 + 3) * 9;
  }

  /* 8. Public Methods */

  /* 9. Local Methods */
  goFirstPage() {
    this.startElement = 0;
    this.emitUpdate();
  }

  goPreviousPage() {
    // Min to prevent going below 0
    this.startElement -= Math.min(this.pageSize, this.startElement);
    this.emitUpdate();
  }

  goNextPage() {
    this.startElement += this.pageSize;
    this.emitUpdate();
  }

  goLastPage() {
    const p = this.pageSize;
    // Make sure startElement is multiple of pageSize
    this.startElement = Math.ceil((this.totalElements - p) / p) * p;
    this.emitUpdate();
  }

  emitUpdate() {
    const data = {
      startElement: this.startElement,
    };
    this.scalePagination.emit(data);
  }

  /* 10. Render */
  render() {
    const total = this.totalElements;
    const start = this.startElement + 1;
    const end = Math.min(this.startElement + this.pageSize, total);
    const isAtStart = start === 1;
    const isAtEnd = end === total;
    return (
      <Host>
        {this.styles && <style>{this.styles}</style>}
        <div part={this.getBasePartMap()} class={this.getCssClassMap()}>
          <div part="info-responsive" class={`${name}__info-responsive`}>
            <span>
              {start}-{end}
            </span>{' '}
            / {total}
          </div>
          <div class={`${name}__button-wrapper`}>
            <div
              part="info"
              class={`${name}__info`}
              style={{ width: `${this.maxWidth}px` }}
            >
              <span>
                {start}-{end}
              </span>{' '}
              / {total}
            </div>
            <button
              class={`${name}__first-prompt`}
              part="first-prompt"
              disabled={isAtStart}
              onClick={() => this.goFirstPage()}
              aria-label={this.goFirstPage}
            >
              <svg
                height="16"
                viewBox="0 0 48 52"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#cacaca"
              >
                <path
                  d="M44.5 48.5L21.5 26L44.5 3.5M27.5 48.5L4.5 26L27.5 3.5"
                  stroke-width="6"
                  stroke-linecap="round"
                />
              </svg>
            </button>
            <button
              class={`${name}__prev-prompt`}
              part="prev-prompt"
              disabled={isAtStart}
              onClick={() => this.goPreviousPage()}
              aria-label={this.goPreviousPage}
            >
              <svg
                height="16"
                viewBox="0 0 37 52"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#cacaca"
              >
                <path
                  d="M33 48L6 26L33 4"
                  stroke-width="7"
                  stroke-linecap="round"
                />
              </svg>
            </button>
            <button
              class={`${name}__next-prompt`}
              part="next-prompt"
              disabled={isAtEnd}
              onClick={() => this.goNextPage()}
              aria-label={this.goNextPage}
            >
              <svg
                height="16"
                viewBox="0 0 37 52"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#cacaca"
              >
                <path
                  d="M4 4L31 26L4 48"
                  stroke-width="7"
                  stroke-linecap="round"
                />
              </svg>
            </button>
            <button
              class={`${name}__last-prompt`}
              part="last-prompt"
              disabled={isAtEnd}
              onClick={() => this.goLastPage()}
              aria-label={this.goLastPage}
            >
              <svg
                height="16"
                viewBox="0 0 48 52"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#cacaca"
              >
                <path
                  d="M3.5 3.5L26.5 26L3.5 48.5M20.5 3.5L43.5 26L20.5 48.5"
                  stroke-width="6"
                  stroke-linecap="round"
                />
              </svg>
            </button>
          </div>
        </div>
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
    const prefix = mode === 'basePart' ? '' : `${name}--`;

    return classNames(
      name,
      this.hideBorders && `${prefix}hide-borders`,
      this.small && `${prefix}small`
    );
  }
}
