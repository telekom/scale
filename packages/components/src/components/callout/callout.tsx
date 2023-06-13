import { Component, h, Host, Prop, Element, Watch } from '@stencil/core';
import statusNote from '../../utils/status-note';

/**
 * Adds the `px` suffix to a string number
 * but leaves other units untouched.
 * 1  -> 1px
 * 5% -> 5%
 */
const numToPx = (val: string) => (Number.isNaN(Number(val)) ? val : val + 'px');

@Component({
  tag: 'scale-callout',
  styleUrl: 'callout.css',
  shadow: true,
})
export class Callout {
  @Element() hostElement: HTMLElement;
  
  /** (optional) Color variant of the callout */
  @Prop() variant?: 'primary' | 'blue' | 'white' | 'black' | string;
  /** (optional) Degree of rotation */
  @Prop() rotation?: number = 0;
  /** (optional) CSS `top` value for absolute position */
  @Prop() top?: string;
  /** (optional) CSS `right` value for absolute position */
  @Prop() right?: string;
  /** (optional) CSS `bottom` value for absolute position */
  @Prop() bottom?: string;
  /** (optional) CSS `left` value for absolute position */
  @Prop() left?: string;
  /** (optional) Injected CSS styles */
  @Prop() styles?: string;

  connectedCallback() {
    statusNote({ source: this.hostElement, tag: 'beta' });
    this.syncPropsToCSS();
  }

  @Watch('rotation')
  @Watch('top')
  @Watch('right')
  @Watch('bottom')
  @Watch('left')
  rotationChanged() {
    this.syncPropsToCSS();
  }

  syncPropsToCSS() {
    this.hostElement.style.setProperty('--rotation', `${this.rotation}deg`);

    if (
      this.top != null ||
      this.right != null ||
      this.bottom != null ||
      this.left != null
    ) {
      Object.assign(this.hostElement.style, {
        top: numToPx(this.top),
        right: numToPx(this.right),
        bottom: numToPx(this.bottom),
        left: numToPx(this.left),
      });
    }
  }

  render() {
    return (
      <Host>
        {this.styles && <style>{this.styles}</style>}
        <div part="base">
          <slot></slot>
        </div>
      </Host>
    );
  }
}
