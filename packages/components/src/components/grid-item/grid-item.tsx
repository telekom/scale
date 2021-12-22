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
import { columnSizes, Sizes } from './grid-item.interfaces';

@Component({
  tag: 'scale-grid-item',
  shadow: false,
})
export class Col {
  @Element() hostElement: HTMLElement;

  /** (optional)  */
  @Prop() sizes?: string;

  @Prop() sm?: columnSizes;

  @Prop() md?: columnSizes;

  @Prop() lg?: columnSizes;

  @Prop() xl?: columnSizes;

  @Prop() xxl?: columnSizes;

  /** (optional) Injected CSS styles */
  @Prop() styles?: string;

  render() {
    const sizesProps = (this.sizes
      ? this.sizes.split(',')
      : [this.sm, this.md, this.lg, this.xl, this.xxl]) as Array<columnSizes>;

    const sizes = propsToSizesArray(sizesProps);

    if (!isSizesEmpty(sizes)) {
      const filledArray = fillEmptySizes(sizes);
      const sizesObj = transformSizesData(filledArray);
      const stringSizesArray = Object.entries(sizesObj).map(
        ([key, value]) => `--size-${key}:${value}`
      );
      this.hostElement.setAttribute('style', stringSizesArray.join(';'));
    }
    return (
      <Host>
        <slot />
      </Host>
    );
  }
}
function transformSizesData(sizes: Array<Sizes>) {
  return sizes.reduce(
    (a, v) => ({
      ...a,
      ...{ [v.name]: v.size },
    }),
    {}
  );
}

function fillEmptySizes(sizes: Array<Sizes>) {
  const filledArray = [...sizes];
  for (let i = 1; i < filledArray.length; i++) {
    if (!filledArray[i].size) filledArray[i].size = filledArray[i - 1].size;
  }
  return filledArray;
}

function isSizesEmpty(sizes: Array<Sizes>) {
  let isEmpty = true;
  for (let size of sizes) {
    if (size.size) {
      isEmpty = false;
      break;
    }
  }
  return isEmpty;
}

function propsToSizesArray(sizes: Array<columnSizes>) {
  return [
    { name: 'sm', size: sizes[0] },
    { name: 'md', size: sizes[1] },
    { name: 'lg', size: sizes[2] },
    { name: 'xl', size: sizes[3] },
    { name: 'xxl', size: sizes[4] },
  ] as Array<Sizes>;
}
