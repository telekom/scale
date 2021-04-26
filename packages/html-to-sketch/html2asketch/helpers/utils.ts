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

import { FillType } from 'sketch-constants';
const normalizeColor = require('normalize-css-color');
const uuid = require('uuid').v4;

export function generateID() {
  return uuid().toUpperCase();
}

const safeToLower = (input: any) => {
  if (typeof input === 'string') {
    return input.toLowerCase();
  }

  return input;
};

// Takes colors as CSS hex, name, rgb, rgba, hsl or hsla
export const makeColorFromCSS = (input: any, alpha: number = 1) => {
  const nullableColor = normalizeColor(safeToLower(input));
  const colorInt = nullableColor === null ? 0x00000000 : nullableColor;
  const { r, g, b, a } = normalizeColor.rgba(colorInt);

  return {
    _class: 'color',
    red: r / 255,
    green: g / 255,
    blue: b / 255,
    alpha: a * alpha,
  };
};

// Solid color fill
export const makeColorFill = (color: any, alpha: number = 1) => {
  return {
    _class: 'fill',
    isEnabled: true,
    color: makeColorFromCSS(color, alpha),
    fillType: 0,
    noiseIndex: 0,
    noiseIntensity: 0,
    patternFillType: 1,
    patternTileScale: 1,
  };
};

const ensureBase64DataURL = (url: any) => {
  const imageData = url.match(/data:(.+?)(;(.+))?,(.+)/i);

  if (imageData && imageData[3] !== 'base64') {
    // Solve for an NSURL bug that can't handle plaintext data: URLs
    const type = imageData[1];
    const data = decodeURIComponent(imageData[4]);
    const encodingMatch = imageData[3] && imageData[3].match(/^charset=(.*)/);
    let buffer;

    if (encodingMatch) {
      buffer = Buffer.from(data, encodingMatch[1]);
    } else {
      buffer = Buffer.from(data);
    }

    return `data:${type};base64,${buffer.toString('base64')}`;
  }

  return url;
};

// patternFillType - 0 1 2 3
export const makeImageFill = (url: any, patternFillType: number = 1) => ({
  _class: 'fill',
  isEnabled: true,
  fillType: FillType.Pattern,
  image: {
    _class: 'MSJSONOriginalDataReference',
    _ref_class: 'MSImageData',
    _ref: `images/${generateID()}`,
    url: url.indexOf('data:') === 0 ? ensureBase64DataURL(url) : url,
  },
  noiseIndex: 0,
  noiseIntensity: 0,
  patternFillType,
  patternTileScale: 1,
});

const containsAllItems = (needles: any, haystack: any) =>
  needles.every((needle: any) => haystack.includes(needle));

export const calculateResizingConstraintValue = (...args: any) => {
  const noHeight = [
    RESIZING_CONSTRAINTS.TOP,
    RESIZING_CONSTRAINTS.BOTTOM,
    RESIZING_CONSTRAINTS.HEIGHT,
  ];
  const noWidth = [
    RESIZING_CONSTRAINTS.LEFT,
    RESIZING_CONSTRAINTS.RIGHT,
    RESIZING_CONSTRAINTS.WIDTH,
  ];
  const validValues = Object.values(RESIZING_CONSTRAINTS);

  if (!args.every((arg: any) => validValues.includes(arg))) {
    throw new Error('Unknown resizing constraint');
  } else if (containsAllItems(noHeight, args)) {
    throw new Error("Can't fix height when top & bottom are fixed");
  } else if (containsAllItems(noWidth, args)) {
    throw new Error("Can't fix width when left & right are fixed");
  }

  return args.length > 0
    ? args.reduce((acc: any, item: any) => acc & item, args[0])
    : RESIZING_CONSTRAINTS.NONE;
};

export const RESIZING_CONSTRAINTS = {
  TOP: 31,
  RIGHT: 62,
  BOTTOM: 55,
  LEFT: 59,
  WIDTH: 61,
  HEIGHT: 47,
  NONE: 63,
};

export const SMART_LAYOUT = {
  LEFT_TO_RIGHT: 'LEFT_TO_RIGHT',
  HORIZONTALLY_CENTER: 'HORIZONTALLY_CENTER',
  RIGHT_TO_LEFT: 'RIGHT_TO_LEFT',
  TOP_TO_BOTTOM: 'TOP_TO_BOTTOM',
  VERTICALLY_CENTER: 'VERTICALLY_CENTER',
  BOTTOM_TO_TOP: 'BOTTOM_TO_TOP',
};

export const DEFAULT_GROUP_LAYOUT = {
  _class: 'MSImmutableFreeformGroupLayout',
};

const smartLayoutBase = {
  _class: 'MSImmutableInferredGroupLayout',
};

const HORIZONTAL_AXIS = {
  axis: 0,
};

const VERTICAL_AXIS = {
  axis: 1,
};

export const getGroupLayout = (layoutType?: any) => {
  switch (layoutType) {
    case SMART_LAYOUT.LEFT_TO_RIGHT: {
      return Object.assign({}, smartLayoutBase, HORIZONTAL_AXIS, {
        layoutAnchor: 0,
      });
    }

    case SMART_LAYOUT.HORIZONTALLY_CENTER: {
      return Object.assign({}, smartLayoutBase, HORIZONTAL_AXIS, {
        layoutAnchor: 1,
      });
    }

    case SMART_LAYOUT.RIGHT_TO_LEFT: {
      return Object.assign({}, smartLayoutBase, HORIZONTAL_AXIS, {
        layoutAnchor: 2,
      });
    }

    case SMART_LAYOUT.TOP_TO_BOTTOM: {
      return Object.assign({}, smartLayoutBase, VERTICAL_AXIS, {
        layoutAnchor: 0,
      });
    }

    case SMART_LAYOUT.VERTICALLY_CENTER: {
      return Object.assign({}, smartLayoutBase, VERTICAL_AXIS, {
        layoutAnchor: 1,
      });
    }

    case SMART_LAYOUT.BOTTOM_TO_TOP: {
      return Object.assign({}, smartLayoutBase, VERTICAL_AXIS, {
        layoutAnchor: 2,
      });
    }

    default:
      return DEFAULT_GROUP_LAYOUT;
  }
};

export const removeJssNameFromClass = (className: string) =>
  className.replace(/-\d-\d-\d*/g, '');

const SYSTEM_FONTS = [
  // Apple
  '-apple-system',
  'BlinkMacSystemFont',

  // Microsoft
  'Segoe UI',

  // Android
  'Roboto',
];

// INPUT: -apple-system, "Helvetica Neue", Helvetica, Arial, sans-serif
// OUTPUT: Helvetica Neue
export function getFirstFont(fonts: any, skipSystemFonts: any) {
  let regularFont: any = undefined;
  let systemFont: any = undefined;

  fonts.split(',').forEach((font: any) => {
    font = font.trim().replace(/^["']+|["']+$/g, '');
    if (font === '') {
      return;
    }

    // See above for a note on OS-specific fonts
    if (!regularFont && (!skipSystemFonts || SYSTEM_FONTS.indexOf(font) < 0)) {
      regularFont = font;
    }
    if (!systemFont) {
      systemFont = font;
    }
  });

  if (regularFont) {
    return regularFont;
  }

  if (systemFont) {
    return systemFont;
  }

  return '-apple-system';
}
