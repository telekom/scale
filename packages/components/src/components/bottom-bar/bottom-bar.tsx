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
 @Component({
   tag: 'scale-bottom-bar',
   styleUrl: 'bottom-bar.css',
   shadow: true,
 })
 export class Card {
  @Element() hostElement: HTMLElement;

   /** (optional) Elements label */
   @Prop() elements?: any = []

   /** (optional) Injected CSS styles */
   @Prop() styles?: string;
 
   @Listen('click')
   handleClick(event: MouseEvent) {
    const selected = event.target as HTMLElement
    if (selected.tagName !== 'SCALE-BOTTOM-BAR-ITEM') {
      return 
    }
    const allBottomBarItems = Array.from(this.hostElement.querySelectorAll('scale-bottom-bar-item'));
    allBottomBarItems.forEach(el => {
      el.removeAttribute('selected')
      if (el === event.target) {
        el.setAttribute('selected', '')
      }
    })
   }

   render() {
    console.log('this.elements', this.elements)
     return (
       <Host>
         {this.styles && <style>{this.styles}</style>}
           <div
             class={this.getCssClassMap()}
           >
              <slot />
           </div>
       </Host>
     );
   }
 
   getCssClassMap() {
     return classNames('bottom-bar', 'bottom-bar');
   }
 }
 