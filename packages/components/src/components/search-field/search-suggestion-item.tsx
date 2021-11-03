/**
 * @license
 * Scale https://github.com/telekom/scale
 *
 * Copyright (c) 2021, Deutsche Telekom AG
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

 import { Component, Prop, h, Host, Element } from '@stencil/core';
 import classNames from 'classnames';
 
 @Component({
   tag: 'scale-search-suggestion-item',
   styleUrl: 'search-suggestion-item.css',
   shadow: false,
 })
 export class SearchField {
   @Element() hostElement: HTMLElement;
 
   /** (optional) Injected CSS styles */
   @Prop() styles?: string;

 
   render() {
     return (
       <Host>

         {this.styles && <style>{this.styles}</style>}
         <li class={this.getCssClassMap()}>
           <slot/>  
        </li>
       </Host>
     );
   }
 
   getCssClassMap() {
     return classNames(
       'element',
     );
   }
 }
 