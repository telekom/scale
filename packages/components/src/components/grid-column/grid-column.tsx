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

import { Component, Prop, h, Host, /*Listen,*/ Element } from '@stencil/core';
import classNames from 'classnames';
// import { hasShadowDom } from '../../utils/utils';

@Component({
  tag: 'scale-grid-column',
  styleUrl: 'grid-column.css',
  shadow: false,
})
export class Col {
  @Element() hostElement: HTMLElement;

  /** (optioanl) Amount of columns */
  @Prop() amount?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | '13' | '14' | '15' | '16';

  /** (optioanl) Horizontal offset of column */
  @Prop() offset?: | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | '13' | '14' | '15' | '16';
	
	/** (optional) Amount in small container */
	@Prop() sm?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | '13' | '14' | '15' | '16';

	/** (optional) Amount in medium container */
	@Prop() md?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | '13' | '14' | '15' | '16';

	/** (optional) Amount in large container */
	@Prop() lg?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | '13' | '14' | '15' | '16';

	/** (optional) Amount in x-large container */
	@Prop() xl?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | '13' | '14' | '15' | '16';

	/** (optional) Amount in xx-large container */
	@Prop() xxl?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | '13' | '14' | '15' | '16';

  /** (optional) Verical offset */
  @Prop() row?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | '13' | '14' | '15' | '16';

  /** (optional) Injected CSS styles */
  @Prop() styles?: string;

  render() {
    return (
      <Host class={this.getCssClassMap()}>
        {this.styles && <style>{this.styles}</style>}
          <slot />
      </Host>
    );
  }

  getCssClassMap() {
    return classNames(
      this.amount && `col--size-${this.amount}`,
      this.offset && `col--horizontal-offset-${this.offset}`,
      this.row && `col--vertical-offset-${this.row}`,
			this.sm && `sm:\size-${this.sm}`,
			this.md && `md:\size-${this.md}`,
			this.lg && `lg:\size-${this.lg}`,
			this.xl && `xl:\size-${this.xl}`,
			this.xxl && `xxl:\size-${this.xxl}`,
    );
  }
}
