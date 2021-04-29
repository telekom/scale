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

const splitShadowString = (boxShadow: any) => {
  const shadowStrings = boxShadow
    .split(/x, |t, /)
    .map((str: string, i: number, array: any[]) => {
      if (i + 1 < array.length) {
        if (str.match(/inse$/)) {
          return `${str}t`;
        } else if (str.match(/p$/)) {
          return `${str}x`;
        }
      }
      return str;
    })
    .filter((shadow: string) => shadow.length > 0);

  return shadowStrings;
};

const shadowStringToObject = (shadowString: string) => {
  const matches = shadowString.match(
    /^([a-z0-9#., ()]+) ([-]?[0-9.]+)px ([-]?[0-9.]+)px ([-]?[0-9.]+)px ([-]?[0-9.]+)px ?(inset)?$/i
  );

  if (matches && matches.length === 7) {
    return {
      color: matches[1],
      offsetX: parseFloat(matches[2]),
      offsetY: parseFloat(matches[3]),
      blur: parseFloat(matches[4]),
      spread: parseFloat(matches[5]),
      inset: matches[6] !== undefined,
    };
  }
  return;
};

export { splitShadowString, shadowStringToObject };
