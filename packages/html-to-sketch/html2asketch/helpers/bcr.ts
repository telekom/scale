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

// TODO: should probably also take into account children of each node
export function getGroupBCR(nodes: any) {
  const groupBCR = nodes.reduce((result: any, node: any) => {
    const bcr = node.getBoundingClientRect();
    const { left, top, right, bottom } = bcr;
    const width = bcr.right - bcr.left;
    const height = bcr.bottom - bcr.top;

    if (width === 0 && height === 0) {
      return result;
    }

    if (!result) {
      return { left, top, right, bottom };
    }

    if (left < result.left) {
      result.left = left;
    }

    if (top < result.top) {
      result.top = top;
    }

    if (right > result.right) {
      result.right = right;
    }

    if (bottom > result.bottom) {
      result.bottom = bottom;
    }

    return result;
  }, null);

  if (groupBCR === null) {
    return {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      width: 0,
      height: 0,
    };
  }

  return {
    left: groupBCR.left,
    top: groupBCR.top,
    right: groupBCR.right,
    bottom: groupBCR.bottom,
    width: groupBCR.right - groupBCR.left,
    height: groupBCR.bottom - groupBCR.top,
  };
}
