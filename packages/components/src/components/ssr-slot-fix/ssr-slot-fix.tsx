import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'scale-ssr-slot-fix',
})
export class SsrSlotFix {
  render() {
    return (
      <Host>
        <slot />
      </Host>
    );
  }
}
