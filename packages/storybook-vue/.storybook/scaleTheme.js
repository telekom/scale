import { create } from "@storybook/theming/create";

const PRIMARY = "hsl(329.20000000000005, 100%, 44.3%)";
const WHITE = "hsl(0, 0%, 100%)";
const TEXT = "hsl(0, 0%, 9.8%)";
const GREY = "hsl(0, 0%, 94.9%)";

export default create({
  base: "light",

  colorPrimary: PRIMARY,
  colorSecondary: PRIMARY, // :)

  // UI
  appBg: GREY,
  appContentBg: WHITE,
  appBorderColor: GREY,
  appBorderRadius: 4,

  // Typography
  // TODO sizes are too small with TeleNeo, check if tweaking sizes is possible
  fontBase: "TeleNeoWeb, TeleNeo, sans-serif",
  fontCode: "monospace",

  // Text colors
  textColor: TEXT,
  textInverseColor: WHITE,

  // Toolbar default and active colors
  barTextColor: TEXT,
  barSelectedColor: PRIMARY,
  barBg: WHITE,

  // Form colors
  inputBg: WHITE,
  inputBorder: GREY,
  inputTextColor: TEXT,
  inputBorderRadius: 4,

  brandTitle: "Telekom Scale Design System",
  // TODO add URL
  // brandUrl: 'https://example.com',
  brandImage: "assets/Telekom-Logo-Magenta.svg",
});
