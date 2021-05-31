import { Component, Element, h, Host, Prop } from '@stencil/core';
import classNames from 'classnames';

@Component({
  tag: 'scale-tooltip',
  styleUrl: './tooltip.css',
  shadow: true,
})
export class Tooltip {
  @Prop() alignment: 'left' | 'right' | 'top' | 'bottom' = 'top';
  @Element() hostElement: HTMLElement;
  componentDidLoad() {
    let box = this.hostElement.shadowRoot.getElementById('slot_container_id');
    console.log(box.offsetHeight);
    console.log(box.offsetWidth);
  }

  render() {
    return (
      <Host>
        <div part={this.getBasePartMap()} class={this.getCssClassMap()}>
          <div id="slot_container_id">
            <slot></slot>
          </div>
          <span part="text" class="tooltiptext">
            Tooltip
          </span>
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
    const name = 'tooltip';
    const prefix = mode === 'basePart' ? '' : `${name}--`;

    return classNames(
      name,
      this.alignment && `${prefix}alignment-${this.alignment}`
    );
  }
}
