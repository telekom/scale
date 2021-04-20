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

import { h } from '@stencil/core';

interface TagDescriptorInterface {
  tag: string;
  attributes: object;
}

type HTMLStringFunction = () => string;

/**
 * Conditionally render markup for an icon based on data.
 *
 * @param value when a string, will be used as the `name` attribute in a `<scale-icon>`,
 *              when a function it should return a string of HTML
 * @param customContainerClass a custom class for the wrapper of the HTML returned by `value`
 */
export const renderIcon = (
  value: string | HTMLStringFunction | TagDescriptorInterface,
  customContainerClass?: string
): HTMLElement => {
  if (typeof value === 'function') {
    return <span innerHTML={value()} class={customContainerClass} />;
  }
  if (typeof value === 'string') {
    return <scale-icon name={value} />;
  }
  const Tag = value.tag;
  return <Tag {...value.attributes} />;
};
