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

/**
 * The tokens are organized in categories, and each category has sections,
 * which include the actual key/value pairs.
 *
 * CATEGORY-SECTION-KEY: VALUE
 *
 * The name of the token is determined by this structure. For example,
 * if we look at the family section within the font category, we'll find
 * at least the sans and mono values, so the tokens —in the CSS output—
 * look like this:
 *
 * ```css
 *   :root {
 *     --{namespace}-{category}-{section}-{key}: {value};
 *     --scl-font-family-sans: TeleNeoWeb, sans-serif;
 *     --scl-font-family-mono: monospace;
 *   }
 * ```
 *
 * Sometimes you don't need a section, for this there's the special
 * keyword DEFAULT we can use to omit the section name in the
 * resulting token name.
 */

import { Color, Shadow } from './factories.js';

export const NAMESPACE_PREFIX = 'scl';
export const SPACING = 'spacing';
export const TYPOGRAPHY = 'font';
export const TYPE_VARIANT = 'font-variant';
export const COLOR = 'color';
export const SHADOW = 'shadow';
export const RADIUS = 'radius';
export const OPACITY = 'opacity';
export const MOTION = 'motion';
export const Z_INDEX = 'z-index';

const tokens = {};

/* SPACING */

tokens[SPACING] = {
  DEFAULT: {
    1: 1,
    2: 2,
    4: 4,
    8: 8,
    12: 12,
    16: 16,
    24: 24,
    32: 32,
    40: 40,
    48: 48,
    64: 64,
    80: 80,
  },
};

/* TYPOGRAPHY */
const family = {
  sans: 'sans-serif',
  mono: 'monospace',
};

const size = {
  10: 10,
  12: 12,
  14: 14,
  16: 16,
  20: 20,
  24: 24,
  32: 32,
  40: 40,
  56: 56,
};
const weight = {
  thin: 200,
  regular: 400,
  medium: 500,
  bold: 700,
  extrabold: 800,
};
const lineHeight = {
  114: '114%',
  120: '120%',
  125: '125%',
  133: '133%',
  150: '150%',
  160: '160%',
};
const letterSpacing = null;

tokens[TYPOGRAPHY] = {
  family,
  size,
  weight,
  lineHeight,
  letterSpacing,
};

const defaultVariant = {
  family: family.sans,
  size: size['16'],
  weight: weight.medium,
  lineHeight: lineHeight['150'],
  letterSpacing: 'normal',
};

tokens[TYPE_VARIANT] = {
  body: {
    ...defaultVariant,
  },
  body_short: {
    ...defaultVariant,
    lineHeight: lineHeight['125'],
  },
  body_large: {
    ...defaultVariant,
    size: size['20'],
    lineHeight: lineHeight['160'],
  },
  smaller: {
    ...defaultVariant,
    size: size['12'],
    lineHeight: lineHeight['125'],
  },
  label: {
    ...defaultVariant,
    size: size['12'],
    lineHeight: lineHeight['120'],
  },
  caption: {
    ...defaultVariant,
    size: size['12'],
    lineHeight: lineHeight['133'],
  },
  heading_6: {
    ...defaultVariant,
    weight: weight.bold,
    lineHeight: lineHeight['150'],
  },
  heading_5: {
    ...defaultVariant,
    size: size['20'],
    lineHeight: lineHeight['120'],
    weight: weight.extrabold,
  },
  heading_4: {
    ...defaultVariant,
    size: size['24'],
    lineHeight: lineHeight['133'],
    weight: weight.extrabold,
  },
  heading_3: {
    ...defaultVariant,
    size: size['32'],
    lineHeight: lineHeight['125'],
    weight: weight.extrabold,
  },
  heading_2: {
    ...defaultVariant,
    size: size['40'],
    lineHeight: lineHeight['120'],
    weight: weight.extrabold,
  },
  heading_1: {
    ...defaultVariant,
    size: size['56'],
    lineHeight: lineHeight['114'],
    weight: weight.extrabold,
  },
};

/* COLOR */

const palette = {
  primary: Color('#5300ff'),
  black: Color('#000000'),
  white: Color('#FFFFFF'),
  grey0: Color('#F2F2F2'),
  grey10: Color('#E5E5E5'),
  grey20: Color('#CCCCCC'),
  grey30: Color('#B2B2B2'),
  grey40: Color('#999999'),
  grey50: Color('#7F7F7F'),
  grey60: Color('#666666'),
  grey70: Color('#4C4C4C'),
  grey80: Color('#333333'),
  grey90: Color('#191919'),
  grey100: Color('#000000'),
  orange0: Color('#FFFCDF'),
  orange10: Color('#FFF4C6'),
  orange20: Color('#FFE9AE'),
  orange30: Color('#FFDA97'),
  orange40: Color('#FFC780'),
  orange50: Color('#FFB26A'),
  orange60: Color('#FC9A55'),
  orange70: Color('#DF6D3F'),
  orange80: Color('#AE461C'),
  orange90: Color('#973209'),
  orange100: Color('#7D1F09'),
  red0: Color('#FFC5CB'),
  red10: Color('#FFAAB6'),
  red20: Color('#FE94A5'),
  red30: Color('#F98093'),
  red40: Color('#F36A80'),
  red50: Color('#EF556E'),
  red60: Color('#ED425B'),
  red70: Color('#D82A48'),
  red80: Color('#C31C3B'),
  red90: Color('#AD0F31'),
  red100: Color('#990024'),
  blue0: Color('#D6F8FF'),
  blue10: Color('#B5EBFF'),
  blue20: Color('#95DAFF'),
  blue30: Color('#77C4FF'),
  blue40: Color('#59AAFF'),
  blue50: Color('#3D8CFF'),
  blue60: Color('#216BFF'),
  blue70: Color('#0D39DF'),
  blue80: Color('#000BBF'),
  blue90: Color('#03009F'),
  blue100: Color('#140080'),
  teal0: Color('#D7F6F4'),
  teal10: Color('#B7EDEC'),
  teal20: Color('#98E4E4'),
  teal30: Color('#79D9DB'),
  teal40: Color('#5CCCD0'),
  teal50: Color('#3EBDC5'),
  teal60: Color('#22ADB9'),
  teal70: Color('#129CA3'),
  teal80: Color('#068788'),
  teal90: Color('#006967'),
  teal100: Color('#005651'),
  green0: Color('#F0F7E0'),
  green10: Color('#E0EFC7'),
  green20: Color('#CFE8AF'),
  green30: Color('#BBDF98'),
  green40: Color('#A4D681'),
  green50: Color('#8DCD6A'),
  green60: Color('#73C354'),
  green70: Color('#52B342'),
  green80: Color('#32A032'),
  green90: Color('#248B31'),
  green100: Color('#187431'),
  clay0: Color('#F2E4DF'),
  clay10: Color('#EDD8CE'),
  clay20: Color('#E9CDBE'),
  clay30: Color('#E3C2AF'),
  clay40: Color('#DEB7A0'),
  clay50: Color('#D9AD92'),
  clay60: Color('#D2A483'),
  clay70: Color('#BB8C6F'),
  clay80: Color('#A3765D'),
  clay90: Color('#87604E'),
  clay100: Color('#6A4D40'),
  rose0: Color('#F6E5EB'),
  rose10: Color('#EED1DA'),
  rose20: Color('#E6BCC9'),
  rose30: Color('#DDA8B8'),
  rose40: Color('#D495A6'),
  rose50: Color('#CB8293'),
  rose60: Color('#C16F81'),
  rose70: Color('#A5566A'),
  rose80: Color('#864054'),
  rose90: Color('#652B3E'),
  rose100: Color('#511F31'),
  lilac0: Color('#F7EFF6'),
  lilac10: Color('#EFE3ED'),
  lilac20: Color('#EAD9E7'),
  lilac30: Color('#E4CCE0'),
  lilac40: Color('#D5B4D5'),
  lilac50: Color('#C59BCA'),
  lilac60: Color('#B682BD'),
  lilac70: Color('#9E6BA5'),
  lilac80: Color('#84558A'),
  lilac90: Color('#6A3E71'),
  lilac100: Color('#502857'),
  pigeon0: Color('#E9ECF6'),
  pigeon10: Color('#D7DCEF'),
  pigeon20: Color('#C5CCE7'),
  pigeon30: Color('#B4BCDE'),
  pigeon40: Color('#A3ABD6'),
  pigeon50: Color('#929BCD'),
  pigeon60: Color('#828AC4'),
  pigeon70: Color('#6D6EB0'),
  pigeon80: Color('#5F5A9B'),
  pigeon90: Color('#534785'),
  pigeon100: Color('#46366D'),
  neptune0: Color('#DEEDEC'),
  neptune10: Color('#CDE5E5'),
  neptune20: Color('#BBDEDD'),
  neptune30: Color('#A9D5D5'),
  neptune40: Color('#98CBCD'),
  neptune50: Color('#88C0C4'),
  neptune60: Color('#77B6BB'),
  neptune70: Color('#66A5A8'),
  neptune80: Color('#579292'),
  neptune90: Color('#4A7B7A'),
  neptune100: Color('#3F6160'),
  olive0: Color('#ECF3E7'),
  olive10: Color('#DCE8D4'),
  olive20: Color('#CCDEC2'),
  olive30: Color('#BBD3AF'),
  olive40: Color('#AAC89D'),
  olive50: Color('#99BD8B'),
  olive60: Color('#88B179'),
  olive70: Color('#709660'),
  olive80: Color('#597949'),
  olive90: Color('#425B33'),
  olive100: Color('#314724'),
};

tokens[COLOR] = {
  DEFAULT: {
    ...palette,
    primaryHover: Color('#7633ff'),
    primaryActive: Color('#5e29cc'),
    focus: palette.blue50,
  },
  text: {
    standard: palette.grey90,
    additional: palette.grey60,
    link: palette.blue70,
    linkHover: palette.blue80,
    linkActive: palette.blue60,
    linkVisited: palette.blue70,
    info: palette.blue70,
    disabled: palette.grey50,
    success: palette.green100,
    error: palette.red70,
  },
  background: {
    standard: palette.white,
    light: palette.grey0,
    darker: palette.grey20,
    overlay: Color('rgba(108, 108, 108, 0.7)'),
    disabled: palette.grey20,
    success: palette.green100,
    error: palette.red70,
  },
  functional: {
    red: palette.red70,
    green: palette.green100,
    blue: palette.blue70,
  },
};

/* SHADOW */

/*
  - ground: 0
  - card: 1
  - dropdown: 2
  - notification: 3
  - navigation: 4
  - modal: 5
*/
tokens[SHADOW] = {
  level: {
    0: [Shadow({ y: 2, blur: 8 }), Shadow({ y: 1, blur: 2 })],
    1: [Shadow({ y: 4, blur: 16 }), Shadow({ y: 2, blur: 4 })],
    '1Hover': [Shadow({ y: 6, blur: 24 }), Shadow({ y: 3, blur: 6 })],
    '1Active': [Shadow({ y: 2, blur: 8 }), Shadow({ y: 1, blur: 2 })],
    2: [Shadow({ y: 8, blur: 32 }), Shadow({ y: 4, blur: 8 })],
    '2Hover': [Shadow({ y: 10, blur: 40 }), Shadow({ y: 5, blur: 10 })],
    '2Active': [Shadow({ y: 6, blur: 24 }), Shadow({ y: 3, blur: 6 })],
    3: [Shadow({ y: 12, blur: 48 }), Shadow({ y: 6, blur: 12 })],
    '3Hover': [Shadow({ y: 14, blur: 56 }), Shadow({ y: 7, blur: 14 })],
    '3Active': [Shadow({ y: 10, blur: 40 }), Shadow({ y: 5, blur: 10 })],
    4: [Shadow({ y: 16, blur: 64 }), Shadow({ y: 8, blur: 16 })],
    '4Hover': [Shadow({ y: 18, blur: 72 }), Shadow({ y: 9, blur: 18 })],
    '4Active': [Shadow({ y: 14, blur: 56 }), Shadow({ y: 7, blur: 14 })],
    5: [Shadow({ y: 20, blur: 80 }), Shadow({ y: 10, blur: 20 })],
    '5Hover': [Shadow({ y: 22, blur: 88 }), Shadow({ y: 11, blur: 22 })],
    '5Active': [Shadow({ y: 18, blur: 72 }), Shadow({ y: 9, blur: 18 })],
  },
};

/* RADIUS */

tokens[RADIUS] = {
  DEFAULT: {
    1: 1,
    2: 2,
    4: 4,
    8: 8,
    12: 12,
  },
};

/* OPACITY */

tokens[OPACITY] = {
  DEFAULT: {
    50: 0.5,
  },
};

/* MOTION */

tokens[MOTION] = {
  duration: {
    immediate: 100,
    fast: 200,
    slower: 600,
    deliberate: 800,
  },
  easing: {
    standard: 'cubic-bezier(0.42, 0, 0.58, 1)',
    enter: 'cubic-bezier(0.390, 0.575, 0.565, 1)',
  },
};

/* Z-INDEX */

tokens[Z_INDEX] = {
  DEFAULT: {
    10: 10,
    20: 20,
    30: 30,
    40: 40,
    50: 50,
    60: 60,
    70: 70,
  },
};

export default function () {
  // a copy to avoid any outputs accidentally mutating it
  return { ...tokens };
}
