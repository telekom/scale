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

// RAW VALUES

/* Colors */

const MAGENTA = '#E20074';
const MAGENTA_HOVER = '#F90984';
const MAGENTA_ACTIVE = '#CB0068';
const WHITE = '#FFFFFF';
const RED_FUNCTIONAL = '#D90000';
// const GREEN_FUNCTIONAL = '#46A800';
const BLUE = '#007DB3';
const BLUE_FUNCTIONAL = '#009DE0';
const BLUE_DARK = '#0070A0';

/* Grays */

const GRAY_1 = '#262626';
// const GRAY_2 = '#383838';
const GRAY_3 = '#6B6B6B';
const GRAY_4 = '#7C7C7C';
const GRAY_5_DECORATIVE = '#A4A4A4';
const GRAY_6_DECORATIVE = '#D0D0D0';
const GRAY_7_DECORATIVE = '#DCDCDC';
// const GRAY_8_DECORATIVE = '#EDEDED';
const GRAY_9_DECORATIVE = '#F4F4F4';

/* Typography */

const FONT_FAMILY = 'TeleNeoWeb';
const FONT_FAMILY_MONO = 'Office Code Pro D'; // https://github.com/nathco/Office-Code-Pro

const FONT_WEIGHT_THIN = 100;
const FONT_WEIGHT_REGULAR = 400;
const FONT_WEIGHT_MEDIUM = 500;
const FONT_WEIGHT_BOLD = 700;
const FONT_WEIGHT_EXTRABOLD = 800;

const FONT_SIZE_1 = 0.625; // 10px
const FONT_SIZE_2 = 0.75; // 12px
const FONT_SIZE_3 = 1; // 16px
const FONT_SIZE_4 = 1.25; // 20px
const FONT_SIZE_5 = 1.5; // 24px
const FONT_SIZE_6 = 2; // 32px
const FONT_SIZE_7 = 2.5; // 40px
const FONT_SIZE_8 = 3.5; // 56px

const LEADING_1 = 1.1428571429; // 64/56
const LEADING_2 = 1.2; //  40/32, 48/40
const LEADING_3 = 1.25; // 20/16, 25/20
const LEADING_4 = 1.3333; // 16/12, 32/24
const LEADING_5 = 1.5; // 24/16
const LEADING_6 = 1.6; // 32/20, 25/20

/* Spacing, in rem units */

const SPACING_1 = 0.25; // 4px
const SPACING_2 = 0.5; // 8px
const SPACING_3 = 0.75; // 12px
const SPACING_4 = 1; // 16px
const SPACING_5 = 1.5; // 24px
const SPACING_6 = 2; // 32px
const SPACING_7 = 3; // 48px
const SPACING_8 = 4; // 64px
const SPACING_9 = 5; // 80px

/*
  TODO: discuss proposal to remove `size` (Arturo)

  const SPACING_10 = 0.0625; // 1px
  const SPACING_20 = 0.125; // 2px
  const SPACING_30 = 0.25; // 4px
  const SPACING_40 = 0.5; // 8px
  const SPACING_50 = 0.75; // 12px
  const SPACING_60 = 1; // 16px
  const SPACING_70 = 1.5; // 24px
  const SPACING_80 = 2; // 32px
  const SPACING_90 = 2.5 // 40px
  const SPACING_100 = 3; // 48px
  const SPACING_110 = 4; // 64px
  const SPACING_120 = 5; // 80px
*/

/* Shadows */

const SHADOW_LEVEL_0 =
  '0 2px 8px 0 rgba(0,0,0,0.10), 0 1px 2px 0 rgba(0,0,0,0.10)';
const SHADOW_LEVEL_1 =
  '0 4px 16px 0 rgba(0,0,0,0.10), 0 2px 4px 0 rgba(0,0,0,0.10)';
const SHADOW_LEVEL_1_HOVER =
  '0 6px 24px 0 rgba(0,0,0,0.10), 0 3px 6px 0 rgba(0,0,0,0.10)';
const SHADOW_LEVEL_1_ACTIVE =
  '0 2px 8px 0 rgba(0,0,0,0.10), 0 1px 2px 0 rgba(0,0,0,0.10)';
const SHADOW_LEVEL_2 =
  '0 8px 32px 0 rgba(0,0,0,0.10), 0 4px 8px 0 rgba(0,0,0,0.10)';
const SHADOW_LEVEL_2_HOVER =
  '0 10px 40px 0 rgba(0,0,0,0.10), 0 5px 10px 0 rgba(0,0,0,0.10)';
const SHADOW_LEVEL_2_ACTIVE =
  '0 6px 24px 0 rgba(0,0,0,0.10), 0 3px 6px 0 rgba(0,0,0,0.10)';
const SHADOW_LEVEL_3 =
  '0 12px 48px 0 rgba(0,0,0,0.10), 0 6px 12px 0 rgba(0,0,0,0.10)';
const SHADOW_LEVEL_3_HOVER =
  '0 14px 56px 0 rgba(0,0,0,0.10), 0 7px 14px 0 rgba(0,0,0,0.10)';
const SHADOW_LEVEL_3_ACTIVE =
  '0 10px 40px 0 rgba(0,0,0,0.10), 0 5px 10px 0 rgba(0,0,0,0.10)';
const SHADOW_LEVEL_4 =
  '0 16px 64px 0 rgba(0,0,0,0.10), 0 8px 16px 0 rgba(0,0,0,0.10)';
const SHADOW_LEVEL_4_HOVER =
  '0 18px 72px 0 rgba(0,0,0,0.10), 0 9px 18px 0 rgba(0,0,0,0.10)';
const SHADOW_LEVEL_4_ACTIVE =
  '0 14px 56px 0 rgba(0,0,0,0.10), 0 7px 14px 0 rgba(0,0,0,0.10)';
const SHADOW_LEVEL_5 =
  '0 20px 80px 0 rgba(0,0,0,0.10), 0 10px 20px 0 rgba(0,0,0,0.10)';
const SHADOW_LEVEL_5_HOVER =
  '0 22px 88px 0 rgba(0,0,0,0.10), 0 11px 22px 0 rgba(0,0,0,0.10)';
const SHADOW_LEVEL_5_ACTIVE =
  '0 18px 72px 0 rgba(0,0,0,0.10), 0 9px 18px 0 rgba(0,0,0,0.10)';

/* Helpers */

const rem = (x: number) => `${x}rem`;

/**
 * A Type Variant is a set of JSS styles, so we use camelCase for them.
 * This is so to play nice with user-provided themes,
 * where properties other than the ones below can be present
 * and objects get directly merged.
 */
export interface TypeVariant {
  fontFamily: string;
  fontSize: string; // rem
  lineHeight: number;
  fontWeight: number;
  letterSpacing: number | string;
}

export const typeVariant = (
  fontSize: number = FONT_SIZE_3,
  lineHeight: number = LEADING_5,
  fontWeight: number = FONT_WEIGHT_MEDIUM,
  fontFamily: string = FONT_FAMILY,
  letterSpacing: string | number = 'normal'
): TypeVariant => ({
  fontFamily,
  fontSize: rem(fontSize),
  lineHeight,
  fontWeight,
  letterSpacing,
});

// ACTUAL TOKENS

const color = {
  primary: MAGENTA,
  primary_hover: MAGENTA_HOVER,
  primary_active: MAGENTA_ACTIVE,
  text: GRAY_1,
  text_contrast: WHITE,
  text_muted: GRAY_3,
  link: BLUE,
  link_hover: BLUE,
  link_active: BLUE_DARK,
  link_visited: BLUE_DARK,
  disabled: GRAY_4,
  disabled_low_contrast: GRAY_5_DECORATIVE,
  error: RED_FUNCTIONAL,
  focus: BLUE_FUNCTIONAL,
  divider: GRAY_6_DECORATIVE,
  table_line: GRAY_6_DECORATIVE,
  breadcrumb_separator: GRAY_3,
  border_slider_thumb: GRAY_3,
  border_tab: GRAY_6_DECORATIVE,
  slider_track: GRAY_4,
};

const background = {
  default: WHITE,
  light: GRAY_9_DECORATIVE,
  dark: GRAY_7_DECORATIVE,
  action: MAGENTA,
  action_hover: MAGENTA_HOVER,
  action_active: MAGENTA_ACTIVE,
  disabled: GRAY_6_DECORATIVE,
  card: WHITE,
};

const type = {
  family: FONT_FAMILY,
  family_mono: FONT_FAMILY_MONO,
  size_0: 0,
  size_1: rem(FONT_SIZE_1),
  size_2: rem(FONT_SIZE_2),
  size_3: rem(FONT_SIZE_3),
  size_4: rem(FONT_SIZE_4),
  size_5: rem(FONT_SIZE_5),
  size_6: rem(FONT_SIZE_6),
  size_7: rem(FONT_SIZE_7),
  size_8: rem(FONT_SIZE_8),
  leading_1: LEADING_1,
  leading_2: LEADING_2,
  leading_3: LEADING_3,
  leading_4: LEADING_4,
  leading_5: LEADING_5,
  leading_6: LEADING_6,
  weight_thin: FONT_WEIGHT_THIN,
  weight_regular: FONT_WEIGHT_REGULAR,
  weight_medium: FONT_WEIGHT_MEDIUM,
  weight_bold: FONT_WEIGHT_BOLD,
  weight_extrabold: FONT_WEIGHT_EXTRABOLD,
  weight_button: FONT_WEIGHT_BOLD,
};

// tslint:disable-next-line
const type_variants = {
  label: typeVariant(FONT_SIZE_2, LEADING_4),
  label_floating: typeVariant(FONT_SIZE_1, LEADING_2),
  code: typeVariant(FONT_SIZE_2, LEADING_4, FONT_WEIGHT_REGULAR),
  caption: typeVariant(FONT_SIZE_2, LEADING_4),
  helper_text: typeVariant(FONT_SIZE_2, LEADING_4),
  smaller: typeVariant(FONT_SIZE_2, LEADING_4),
  body: typeVariant(FONT_SIZE_3, LEADING_5),
  body_long: typeVariant(FONT_SIZE_3, LEADING_5),
  body_short: typeVariant(FONT_SIZE_3, LEADING_3),
  body_large: typeVariant(FONT_SIZE_4, LEADING_6),
  h6: typeVariant(FONT_SIZE_3, LEADING_5, FONT_WEIGHT_EXTRABOLD),
  h5: typeVariant(FONT_SIZE_4, LEADING_3, FONT_WEIGHT_EXTRABOLD),
  h4: typeVariant(FONT_SIZE_5, LEADING_4, FONT_WEIGHT_EXTRABOLD),
  h3: typeVariant(FONT_SIZE_6, LEADING_2, FONT_WEIGHT_EXTRABOLD),
  h2: typeVariant(FONT_SIZE_7, LEADING_2, FONT_WEIGHT_EXTRABOLD),
  h1: typeVariant(FONT_SIZE_8, LEADING_1, FONT_WEIGHT_EXTRABOLD),
  h6_mobile: typeVariant(FONT_SIZE_3, LEADING_5, FONT_WEIGHT_BOLD),
  h5_mobile: typeVariant(FONT_SIZE_3, LEADING_5, FONT_WEIGHT_EXTRABOLD),
  h4_mobile: typeVariant(FONT_SIZE_4, LEADING_3, FONT_WEIGHT_EXTRABOLD),
  h3_mobile: typeVariant(FONT_SIZE_5, LEADING_4, FONT_WEIGHT_EXTRABOLD),
  h2_mobile: typeVariant(FONT_SIZE_6, LEADING_2, FONT_WEIGHT_EXTRABOLD),
  h1_mobile: typeVariant(FONT_SIZE_7, LEADING_2, FONT_WEIGHT_EXTRABOLD),
};

const spacing = {
  0: 0,
  1: rem(SPACING_1),
  2: rem(SPACING_2),
  3: rem(SPACING_3),
  4: rem(SPACING_4),
  5: rem(SPACING_5),
  6: rem(SPACING_6),
  7: rem(SPACING_7),
  8: rem(SPACING_8),
  9: rem(SPACING_9),
  x_button: rem(SPACING_5),
  y_button: rem(SPACING_3),
  x_chip: rem(SPACING_2),
  y_chip: rem(SPACING_1),
  input: rem(SPACING_3),
  input_min: rem(SPACING_1),
  inline: rem(SPACING_2),
  box: rem(SPACING_5),
  flow: rem(SPACING_5),
  char: rem(SPACING_1),
  y_outer: rem(SPACING_9),
  gutter: rem(SPACING_6),
};

const size = {
  divider: 1,
  underline: 1,
  border: 1,
  border_input: 1,
  border_focus: 2,
  border_tab: 2,
  border_tab_selected: 4,
  modal_narrow: rem(31),
  modal: rem(44),
  modal_wide: rem(64),
  height_tab: rem(SPACING_1 * 10),
  height_tab_small: rem(SPACING_6),
  button: 40,
  button_small: 32,
};

const shadow = {
  level_0: SHADOW_LEVEL_0,
  level_1: SHADOW_LEVEL_1,
  level_1_hover: SHADOW_LEVEL_1_HOVER,
  level_1_active: SHADOW_LEVEL_1_ACTIVE,
  level_2: SHADOW_LEVEL_2,
  level_2_hover: SHADOW_LEVEL_2_HOVER,
  level_2_active: SHADOW_LEVEL_2_ACTIVE,
  level_3: SHADOW_LEVEL_3,
  level_3_hover: SHADOW_LEVEL_3_HOVER,
  level_3_active: SHADOW_LEVEL_3_ACTIVE,
  level_4: SHADOW_LEVEL_4,
  level_4_hover: SHADOW_LEVEL_4_HOVER,
  level_4_active: SHADOW_LEVEL_4_ACTIVE,
  level_5: SHADOW_LEVEL_5,
  level_5_hover: SHADOW_LEVEL_5_HOVER,
  level_5_active: SHADOW_LEVEL_5_ACTIVE,
  ground: SHADOW_LEVEL_0,
  card: SHADOW_LEVEL_1,
  card_hover: SHADOW_LEVEL_1_HOVER,
  card_active: SHADOW_LEVEL_1_ACTIVE,
  dropdown: SHADOW_LEVEL_2,
  dropdown_hover: SHADOW_LEVEL_2_HOVER,
  dropdown_active: SHADOW_LEVEL_2_ACTIVE,
  notification: SHADOW_LEVEL_3,
  notification_hover: SHADOW_LEVEL_3_HOVER,
  notification_active: SHADOW_LEVEL_3_ACTIVE,
  navigation: SHADOW_LEVEL_4,
  navigation_hover: SHADOW_LEVEL_4_HOVER,
  navigation_active: SHADOW_LEVEL_4_ACTIVE,
  modal: SHADOW_LEVEL_5,
  modal_hover: SHADOW_LEVEL_5_HOVER,
  modal_active: SHADOW_LEVEL_5_ACTIVE,
};

const radii = {
  small: rem(SPACING_1),
  medium: rem(SPACING_2),
  input: rem(SPACING_1),
  chip: rem(SPACING_1),
  button: rem(SPACING_2),
  card: rem(SPACING_2),
  modal: rem(SPACING_2),
};

const opacity = {
  disabled: 0.5,
};

const transition = {
  generic: 'all .2s ease-in-out',
};

/**
 * @todo use types to document *all* tokens?
 */
export const tokens = {
  color,
  background,
  type,
  type_variants,
  spacing,
  size,
  shadow,
  radii,
  opacity,
  transition,
};
