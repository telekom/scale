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

export function isTextVisible({ textIndent, overflowX, overflowY }: any) {
  // NOTE overflow:hidden is not needed if text-indent is huge, but how to define 'huge'?
  if (
    parseFloat(textIndent) < 0 &&
    overflowX === 'hidden' &&
    overflowY === 'hidden'
  ) {
    return false;
  }

  return true;
}

export function isNodeVisible(
  node: any,
  { width, height } = node.getBoundingClientRect(),
  {
    position,
    overflowX,
    overflowY,
    opacity,
    visibility,
    display,
    clip,
  }: any = getComputedStyle(node)
) {
  if (node instanceof SVGClipPathElement || node instanceof HTMLSlotElement)
    return true;

  // skip node when display is set to none for itself or an ancestor
  // helps us catch things such as <noscript>
  // HTMLSlotElement has a null offsetParent, but should still be visible
  if (
    node.tagName !== 'BODY' &&
    node.tagName !== 'HTML' &&
    node.offsetParent === null &&
    !node.parentElement &&
    position !== 'fixed' &&
    node.tagName.toLowerCase() !== 'slot'
  ) {
    return false;
  }
  if (
    node.tagName.toLowerCase() === 'option' ||
    node.tagName.toLowerCase() === 'optgroup'
  ) {
    return false;
  }

  if (
    (width === 0 || height === 0) &&
    overflowX === 'hidden' &&
    overflowY === 'hidden'
  ) {
    return false;
  }

  if (
    display === 'none' ||
    visibility === 'hidden' ||
    visibility === 'collapse' ||
    parseFloat(opacity) < 0.1
  ) {
    return false;
  }

  if (clip === 'rect(0px, 0px, 0px, 0px)' && position === 'absolute') {
    return false;
  }

  // node is detached from the DOM
  if (!node.isConnected) {
    return false;
  }

  if (
    node instanceof SVGLinearGradientElement ||
    node instanceof SVGRadialGradientElement ||
    node instanceof SVGStopElement
  ) {
    return false;
  }

  const parent = node.parentElement;

  if (parent && parent.nodeName !== 'HTML' && !isNodeVisible(parent)) {
    return false;
  }

  return true;
}
