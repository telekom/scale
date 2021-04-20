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

export const hasShadowDom = (el: HTMLElement) => {
  return !!el.shadowRoot && !!(el as any).attachShadow;
};

// eg isPseudoClassSupported(':focus-visible') // true for chrome, false for safari
export const isPseudoClassSupported = pseudoClass => {
  // Get the document stylesheet1
  let ss = document.styleSheets[0] as CSSStyleSheet;

  // Create a stylesheet if one doesn't exist
  if (!ss) {
    const el = document.createElement('style') as HTMLStyleElement;
    document.head.appendChild(el);
    ss = document.styleSheets[0] as CSSStyleSheet;
    document.head.removeChild(el);
  }

  // Test the pseudo-class by trying to style with it
  function testPseudo() {
    try {
      if (!/^:/.test(pseudoClass)) {
        pseudoClass = ':' + pseudoClass;
      }
      ss.insertRule('html' + pseudoClass + '{}', 0);
      ss.deleteRule(0);
      return true;
    } catch (e) {
      return false;
    }
  }

  // Run the test
  return testPseudo();
};
