import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'app-icon',
  styleUrl: 'app-icon.css'
})
export class AppIcon {

  @Prop() name?: string;

  render() {
    return (
      <svg class={`icon icon-${this.name}`} width="96" height="23">
        <use xlinkHref={`#icon-${this.name}`}/>
      </svg>
    );
  }
}
