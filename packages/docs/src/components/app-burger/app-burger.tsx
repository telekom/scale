import { Component, Prop, Element, h } from '@stencil/core';
import SiteProviderConsumer from '../../global/site-provider-consumer';

@Component({
  tag: 'app-burger',
  styleUrl: 'app-burger.css'
})
export class AppBurger {
  @Element() el!: HTMLElement;
  @Prop() toggleLeftSidebar: () => void = () => {}

  render() {
    return (
      <div class="burger" onClick={this.toggleLeftSidebar}>
        <app-icon name="menu"></app-icon>
        <app-icon name="close"></app-icon>
      </div>
    );
  }
}

SiteProviderConsumer.injectProps(AppBurger, ['toggleLeftSidebar']);
