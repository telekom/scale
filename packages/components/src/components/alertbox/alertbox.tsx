import {
  Component,
  h,
  Host,
  Prop,
  Element,
  State,
  Method,
} from '@stencil/core';
import classNames from 'classnames';
import statusNote from '../../utils/status-note';

@Component({
  tag: 'scale-alertbox',
  styleUrl: 'alertbox.css',
  shadow: true,
})
export class Alertbox {
  // Color to variant rename
  @Prop() variant?: 'informational' | 'success' | 'warning' | 'error' =
    'informational';
  @Prop({ reflect: true }) hasClose?: boolean = false;
  @Prop({ reflect: true }) opened: boolean;
  @Prop() timeout?: boolean | number = false;
  /** (optional) aria-label attribute */
  @Prop() ariaLabel: string;
  /** (optional) aria-description attribute */
  @Prop() ariaDescription: string;
  @State() content: boolean = true;
  @Element() hostElement: HTMLElement;

  defaultTimeout = 3000;

  componentDidLoad() {
    this.content = !!this.hostElement.querySelector("p[slot='text']");
    this.handleSlotAccessibility();
  }

  handleSlotAccessibility() {
    const mainText =
      this.content &&
      this.hostElement.querySelector("p[slot='text']").innerHTML;
    this.hostElement.shadowRoot
      .querySelector('.alertbox__content')
      .setAttribute('aria-description', mainText);

    const headerText = this.hostElement.querySelector("p[slot='header']")
      .innerHTML;
    if (headerText) {
      this.hostElement.shadowRoot
        .querySelector('.alertbox__container-header')
        .setAttribute('aria-label', headerText);
    }
  }

  connectedCallback() {
    statusNote({ source: this.hostElement, type: 'warn' });
  }

  /** Alert method: open() */
  @Method()
  async open() {
    this.opened = true;
  }

  handleIcons() {
    if (this.variant) {
      switch (this.variant) {
        case 'success':
          return (
            <scale-icon-action-success
              class="alertbox__icon-success"
              accessibility-title="success"
            />
          );
        case 'informational':
          return (
            <scale-icon-alert-information
              class="alertbox__icon-information"
              accessibility-title="information"
            />
          );
        case 'error':
        case 'warning':
          return (
            <scale-icon-alert-error
              class="alertbox__icon-error"
              accessibility-title="error"
            />
          );
      }
    }
    return;
  }

  close = () => {
    this.opened = false;
  };

  handleKeyDown = (event) => {
    if (event.keyCode === 13 || 23) {
      this.opened = false;
    }
  };

  onCloseAlertWithTimeout = () => {
    if (this.timeout !== false) {
      if (typeof this.timeout === 'string' && !isNaN(this.timeout)) {
        setTimeout(this.close, this.timeout);
      } else {
        setTimeout(this.close, this.defaultTimeout);
      }
    } else {
      return null;
    }
  };

  render() {
    const title = 'Missing Title';
    this.onCloseAlertWithTimeout();

    if (!this.opened) {
      return null;
    }

    return (
      <Host>
        <div
          part={this.getBasePartMap()}
          class={this.getCssClassMap()}
          aria-label={this.ariaLabel}
          tabindex="0"
        >
          <div part="container" class="alertbox__container">
            {this.handleIcons()}
            <header part="header" class="alertbox__container-header">
              <p>
                <slot name="header">{title}</slot>
              </p>

              {this.hasClose && (
                <scale-icon-action-circle-close
                  tabindex="0"
                  class="alertbox__icon-close"
                  onClick={() => {
                    this.close();
                  }}
                  onKeyDown={(e) => {
                    this.handleKeyDown(e);
                  }}
                  accessibility-title="close"
                />
              )}
            </header>
          </div>
          {this.content && (
            <p part="content" class="alertbox__content">
              <slot name="text" />
            </p>
          )}
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
    const name = 'alertbox';
    const prefix = mode === 'basePart' ? '' : `${name}--`;

    return classNames(name, this.variant && `${prefix}variant-${this.variant}`);
  }
}
