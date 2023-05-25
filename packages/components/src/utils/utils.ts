import { ComponentInterface } from '@stencil/core';

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
export const isPseudoClassSupported = (pseudoClass) => {
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

/**
 * Call `emit` on component events twice.
 * One for the legacy camel-cased event, one for the new kebab-cased.
 * e.g. for the event `scaleChange` it will do `instance.scaleChange.emit()` and `instance.scaleChangeLegacy.emit()`.
 * It expects both `scaleChange` and `scaleChangeLegacy` event-decorated properties to exist on the component.
 *
 * @param instance {ComponentInterface} - The component instance, aka `this`
 * @param eventKey {string} - The event property, e.g. `scaleChange`
 * @param detail {any} - The custom event `detail`
 * @returns {CustomEvent[]} - The events emitted
 */
export function emitEvent(
  instance: ComponentInterface,
  eventKey: string,
  detail?: any
): CustomEvent[] {
  const legacyKey = eventKey + 'Legacy';
  const emitted = [];
  if (typeof instance[legacyKey] !== 'undefined') {
    // Emit legacy camel case event, e.g. `scaleClose`
    emitted.push(instance[legacyKey].emit(detail));
  }
  // Emit now-standard kebab-case event, e.g. `scale-close`
  emitted.push(instance[eventKey].emit(detail));
  // Return both
  return emitted;
}

export function isClickOutside(event: MouseEvent, host: HTMLElement) {
  let target = event.target as Node;
  const hasShadow = (target as HTMLElement).shadowRoot != null;
  const composedPath = hasShadow ? event.composedPath() : [];
  do {
    if (target === host) {
      return false;
    }
    if (hasShadow) {
      // @ts-ignore
      target = composedPath.shift();
    } else {
      target = target.parentNode;
    }
  } while (target);
  return true;
}

export interface ScaleIcon extends Node {
  size?: number;
}

export const isScaleIcon = (el: Node) => {
  if (el == null || el.nodeType !== 1) {
    return false;
  }
  return el.nodeName.toUpperCase().substring(0, 10) === 'SCALE-ICON';
};

/** Creating global ids for different component helper-texts */
let id = 0;
export function generateUniqueId(): number {
  return id++;
}

export function readMaybeJSONData(data) {
  let parsedData;

  try {
    parsedData = JSON.parse(data);
  } catch (error) {
    parsedData = data;
  }

  return parsedData;
}

/**
 * Useful for waiting for animations to finish before doing something.
 *
 * @param el {HTMLElement | ShadowRoot} - The element to call `getAnimations` on
 * @returns {Promise} - Resolves when all animations are finished
 */
export const animationsFinished = (el: HTMLElement | ShadowRoot) => {
  return Promise.all(
    el.getAnimations({ subtree: true }).map((x) => x.finished)
  );
};
