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

 import { Component, Prop, h, Host } from '@stencil/core';
 import classNames from 'classnames';
import { renderIcon } from '../../utils/render-icon';
 @Component({
   tag: 'scale-bottom-bar-item',
   styleUrl: 'bottom-bar-item.css',
   shadow: true,
 })
 export class Card {
   /** (optional) Icon label */
   @Prop() icon?: string;      
   /** (optional) Icon label */
   @Prop() label?: string;
   /** (optional) Selected state */
   @Prop() selected: boolean = false;     
   /** (optional) Injected CSS styles */
   @Prop() styles?: string;
 
   render() {
     return (
       <Host>
         {this.styles && <style>{this.styles}</style>}
           <div
             class={this.getCssClassMap()}
            //  part={classNames('base', !!this.to && 'interactive')}
           >
              <slot name="icon"/>
                    {this.icon && renderIcon({
                    tag: `scale-icon-${this.icon}`,
                    attributes: {
                        size:"18",
                        selected: this.selected,
                        color: this.selected ? `var(--selected-color)` : `var(--telekom-color-text-and-icon-standard)`
                    }})
                }
              {this.label && <span class="bottom-bar-item__label"> {this.label} </span>}
               
           </div>
       </Host>
     );
   }
 
   getCssClassMap() {
     return classNames('bottom-bar-item', 
     this.selected && 'bottom-bar-item--selected');
   }
 }
 