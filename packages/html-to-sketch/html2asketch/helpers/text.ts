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

export function fixWhiteSpace(text: string, whiteSpace: string) {
  switch (whiteSpace) {
    case 'normal':
    case 'nowrap':
      return text
        .trim()
        .replace(/\n/g, ' ') // replace newline characters with space
        .replace(/\s+/g, ' '); // collapse whitespace
    case 'pre-line':
      return text
        .replace(/(^[^\S\n]+)|([^\S\n]+$)/g, '') // trim but leave \n
        .replace(/[^\S\n]+/g, ' ') // collapse whitespace (except \n)
        .replace(/[^\S\n]?\n[^\S\n]?/g, '\n'); // remove whitespace before & after \n
    default:
    // pre, pre-wrap
  }

  return text;
}
