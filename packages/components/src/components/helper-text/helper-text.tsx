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

 import { Component, h, Prop, Host } from '@stencil/core';

 /**
  * This is a superset of the default anchor `<a>` element.
  * @part anchor - the native achor element wrapping all contents
  * @part content - a wrapper around the default slot with the underline
  *
  * @slot default - here goes the actual text of the
  * @slot icon - a slot that will not be underlined and which position can be changed
  */
 @Component({
   tag: 'scale-helper-text',
   styleUrl: './helper-text.css',
   shadow: false,
 })
 export class Link {
    /** (optional) Helper text */
    @Prop() helperText?: string;
    /** (optional) Injected CSS styles */
    @Prop() styles?: string;
    /** (optional) Injected CSS styles */
    @Prop() variant?: 'neutral' | 'informational' | 'warning' | 'danger' | 'success' = 'informational';   
 
   renderHelperIcon() {
        const variant = this.variant;
        if (variant === 'informational' || variant === 'warning') {
            return <scale-icon-alert-information color={
                variant === 'informational' ?
                'var(--telekom-color-text-and-icon-functional-informational)' : 'var(--telekom-color-text-and-icon-functional-warning)'
            } size={11}></scale-icon-alert-information>
        }
        if (variant === "danger") {
            return <scale-icon-alert-error color="var(--telekom-color-text-and-icon-functional-danger)" size={11}></scale-icon-alert-error>
        }
        if (variant === 'success') {
            return <scale-icon-alert-success color="var(--telekom-color-text-and-icon-functional-success)" size={11}></scale-icon-alert-success>
        }
        if (variant === 'neutral') {
            return 
        }        
    }
   
   render() {
     return (
       <Host
         class={{
            'helper-text': true,
            'helper-text--informational': this.variant === 'informational',
            'helper-text--warning': this.variant === 'warning',
            'helper-text--danger': this.variant === 'danger',
            'helper-text--success': this.variant === 'success',
            'helper-text--neutral': this.variant === 'neutral',
         }}
       >
         {this.styles && <style>{this.styles}</style>}
            <span>{this.helperText}</span>
            {this.renderHelperIcon()}
       </Host>
     );
   }
 }
 