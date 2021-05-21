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

import Group from './model/group';
import Style from './model/style';
import nodeToSketchLayers from './nodeToSketchLayers';
import { isNodeVisible } from './helpers/visibility';
import { removeJssNameFromClass } from './helpers/utils';
import createXPathFromElement from './helpers/createXPathFromElement';

(console as any).debugObjs = [];

export default function nodeTreeToSketchGroup(node: HTMLElement, options: any) {
  let bcr = node.getBoundingClientRect();
  if (bcr.width === 0 && bcr.height === 0) {
    // Possibly broken getBoundingClientRect, let's try selecting the node.
    const rangeHelper = document.createRange();
    rangeHelper.selectNodeContents(node);
    bcr = rangeHelper.getBoundingClientRect();
  }
  const { left, top } = bcr;
  const width = bcr.right - bcr.left;
  const height = bcr.bottom - bcr.top;

  const group = new Group({ x: left, y: top, width, height });

  // Collect layers for the node level itself
  const layers =
    nodeToSketchLayers(node, group, { ...options, layerOpacity: false }) || [];

  const printLayers = (l: any) =>
    l._name + '[ ' + (l._layers || []).map(printLayers).join(', ') + ' ]';

  const replaceSlotsWithLayers = (node: any, layers: any[]) => {
    if (layers.length === 0) return;
    if (node._name === 'slot') {
      const l = layers.shift();
      if (l._isShadow) {
        if (node._layers.length > 0) {
          l._x = node._layers[0]._x;
          l._y = node._layers[0]._y;
          l._style = node._layers[0]._style;
          l._width = node._layers[0]._width;
          l._height = node._layers[0]._height;
        }
        node._layers = [l];
        // console.log('replacing', node._layers[0], l);
      }
    } else {
      node._layers.forEach((l: any) => replaceSlotsWithLayers(l, layers));
    }
  };

  const overrideOutline = function (n: HTMLElement) {
    const style = getComputedStyle(n);
    if (
      style.outlineColor === 'rgb(0, 0, 0)' ||
      style.outlineColor === 'rgba(0, 103, 244, 0.247)'
    ) {
      n.style.outline = '0';
    }
    Array.from(n.children).forEach(overrideOutline);
  };

  const materializeStyle = function (n: HTMLElement) {
    const style = getComputedStyle(n);
    for (const k in style) {
      try {
        n.style[k] = style[k];
      } catch (e) {}
    }
    Array.from(n.children).forEach(materializeStyle);
  };

  const processChild = (childNode: HTMLElement) => {
    if (childNode.shadowRoot) {
      // Get parent shadow root element
      overrideOutline(childNode);
      Array.from(childNode.shadowRoot.children).forEach(overrideOutline);
      const root = nodeTreeToSketchGroup(childNode, options);
      // Remove slotted content as it is already assigned
      // console.log(printLayers(root));
      // The issue here is that the slotted content doesn't have its shadow roots expanded
      const previousLayers = root._layers;
      (root as any)._isShadow = true;
      // console.log("Throwing away " + root._layers.length + " layers");
      root._layers = [];
      // Process children
      const children = Array.from(childNode.shadowRoot.children)
        .filter(isNodeVisible)
        .map((c) => nodeTreeToSketchGroup(c as HTMLElement, options));
      // Replace slot content with expanded layers
      replaceSlotsWithLayers({ _name: '', _layers: children }, previousLayers);
      // Align child and root positioning
      let minX = Infinity,
        maxX = -Infinity,
        minY = Infinity,
        maxY = -Infinity;
      children.forEach((layer) => {
        minX = Math.min(minX, layer._x);
        minY = Math.min(minY, layer._y);
        maxX = Math.max(maxX, layer._x + layer._width);
        maxY = Math.max(maxY, layer._y + layer._height);
        root._layers.push(layer);
      });
      // console.log(printLayers(root));
      if (minX !== Infinity) {
        root._x = minX;
        root._y = minY;
        root._width = maxX - minX;
        root._height = maxY - minY;
      }
      root._layers.forEach((layer: any) => {
        layer._x -= root._x;
        layer._y -= root._y;
        {
          // console.log('layer', layer._x, layer._y, layer._width, layer._height);
        }
      });
      // console.log('shadowRoot', root._x, root._y, root._width, root._height);

      layers.push(root);
    } else if (
      childNode.tagName == 'IFRAME' &&
      (childNode as HTMLIFrameElement).contentDocument
    ) {
      const iframe = childNode as HTMLIFrameElement;
      if (iframe.contentDocument !== null) {
        const root = nodeTreeToSketchGroup(iframe, options);
        if (iframe.contentDocument.body.parentElement) {
          iframe.contentDocument.body.parentElement.style.height = '100%';
          iframe.contentDocument.body.style.height = '100%';

          var cc = iframe.contentDocument.body.offsetHeight;
          iframe.contentDocument.body.dataset.height = String(cc);

          var cc = iframe.contentDocument.body.parentElement.offsetHeight;
          iframe.contentDocument.body.parentElement.dataset.height = String(cc);

          const iframeOptions = { ...options, debugStyle: true };
          const children = Array.from(iframe.contentDocument.children)
            .filter(isNodeVisible)
            .map((c) => nodeTreeToSketchGroup(c as HTMLElement, iframeOptions));
          children.forEach((c) => {
            c._x -= root._x;
            c._y -= root._y;
            root._layers.push(c);
            {
              // const layer = c;
              // console.log('layer', layer._x, layer._y, layer._width, layer._height);
            }
          });
        }
        // console.log('<slot>', root._x, root._y, root._width, root._height);
        layers.push(root);
      }
    } else if (childNode.tagName === 'SLOT') {
      // Push slotted text nodes directly into the slot
      materializeStyle(childNode);
      const childNodes = Array.from(
        (childNode as HTMLSlotElement).assignedNodes()
      ).filter((n) => {
        if (n instanceof HTMLElement) {
          // FIXME add the pseudo-element creation from nodeToSketchLayers.
          materializeStyle(n);
        }
        childNode.appendChild(n);
        return false;
      });
      // Get parent shadow root element
      const root = nodeTreeToSketchGroup(childNode, options);
      // Process children
      if (childNodes.length > 0) {
        const children = childNodes
          .filter(isNodeVisible)
          .map((c) => nodeTreeToSketchGroup(c as HTMLElement, options));
        // Align child and root positioning
        let minX = Infinity,
          maxX = -Infinity,
          minY = Infinity,
          maxY = -Infinity;
        children.forEach((layer) => {
          if (layer._width > 0 && layer._height > 0) {
            minX = Math.min(minX, layer._x);
            minY = Math.min(minY, layer._y);
            maxX = Math.max(maxX, layer._x + layer._width);
            maxY = Math.max(maxY, layer._y + layer._height);
            root._layers.push(layer);
          }
        });
        if (minX !== Infinity) {
          root._x = minX;
          root._y = minY;
          root._width = maxX - minX;
          root._height = maxY - minY;
        }
        root._layers.forEach((layer: any) => {
          layer._x -= root._x;
          layer._y -= root._y;
          // console.log('>slot', root._x, root._y, layer._x, layer._y, layer._width,  layer._height);
        });
        // console.log('>>slot', root._x, root._y, root._width, root._height);
      }
      layers.push(root);
    } else {
      layers.push(nodeTreeToSketchGroup(childNode, options));
    }
  };
  const children = Array.from(node.children);
  children
    .filter(isNodeVisible)
    // .map(getAssignedNodes)
    // sort the children by computed z-index so that nodes with lower z-indexes are added
    // to the group first, "beneath" those with higher z-indexes
    .sort((a, b) => {
      const computedA: string = getComputedStyle(a).zIndex;
      const computedB: string = getComputedStyle(b).zIndex;
      const zIndexA: number = isNaN(Number(computedA)) ? 0 : +computedA;
      const zIndexB: number = isNaN(Number(computedB)) ? 0 : +computedB;
      return zIndexA - zIndexB;
    })
    .forEach(processChild);
  // Process the added children. This is used for range input -webkit-slider-thumb and -webkit-slider-runnable-track.
  for (let i = children.length, l = node.children.length; i < l; i++) {
    processChild(node.children[i] as HTMLElement);
  }

  // Now build a group for all these children
  const styles = getComputedStyle(node);
  const { opacity } = styles;

  const debugObj = {
    node,
    symbol: node.dataset.sketchSymbol,
    xpath: createXPathFromElement(node),
    styles,
  };
  (console as any).debugObjs.push(debugObj);

  const groupStyle = new Style();

  groupStyle.addOpacity(opacity);
  group.setStyle(groupStyle);

  layers.forEach((layer: any) => {
    // Layer positions are relative, and as we put the node position to the group,
    // we have to shift back the layers by that distance.
    if (layer._width > 0 && layer._height > 0) {
      layer._x -= left;
      layer._y -= top;
      group.addLayer(layer);
    }
  });

  // Set group name from a name provider in the options
  if (options && options.getGroupName) {
    group.setName(options.getGroupName(node));
  }

  // Rotate the group by the element's CSS transform.
  // Doing a full rotate-scale-rotate SVD would require some more work (create a couple extra levels of pivot layers).
  // If there's a way to directly apply the transform matrix, that'd be great.
  if (styles.transform !== 'none') {
    const m = new WebKitCSSMatrix(styles.transform);
    m.e = 0;
    m.f = 0;
    const p = new DOMPoint(1, 0);
    const v = p.matrixTransform(m);
    const rotation = Math.atan2(-v.y, v.x);
    if (rotation ** 2 > 0.0001) {
      group._rotation = rotation * (180.0 / Math.PI);
    }
  }

  // set group name from data-sketch-symbol if exists
  if (
    node.getAttribute('data-sketch-symbol') &&
    node.getAttribute('data-sketch-symbol') !== ''
  ) {
    group.setIsSymbol(true);
    const variant = node.getAttribute('data-sketch-variant');
    if (variant !== null && variant !== '') {
      const state = node.getAttribute('data-sketch-state');
      group.setVariant(variant + (state ? `:${state}` : ''));
    }
    group.setName(node.getAttribute('data-sketch-symbol')); // + " / " + variant);
    const stableSymbolName = node.getAttribute('data-sketch-key');
    if (stableSymbolName && stableSymbolName !== '') {
      group.setStableSymbolName(stableSymbolName);
    }
  } else if (
    node.getAttribute('data-sketch-name') &&
    node.getAttribute('data-sketch-name') !== ''
  ) {
    group.setName(node.getAttribute('data-sketch-name'));
  } else if (/^H\d$/i.test(node.tagName) && node.textContent != '') {
    group.setName(node.textContent);
  } else if (node.id && node.id !== '') {
    group.setName(`${node.nodeName.toLowerCase()}#${node.id}`);
  }
  // set group name from jss class if exists
  else if (node.classList[0] && node.classList[0] !== 'hydrated') {
    group.setName(
      `${node.nodeName.toLowerCase()}.${removeJssNameFromClass(
        node.classList[0]
      )}`
    );
  }
  // set group name from node name
  else {
    group.setName(`${node.nodeName.toLowerCase()}`);
  }

  if (node instanceof SVGClipPathElement || node instanceof SVGDefsElement) {
    // Hide clipPaths
    group._isVisible = false;
  }

  // group._layers.forEach((layer:any) =>
  // console.log(group._name, layer._name, left, top, layer._x, layer._y, layer._width, layer._height));

  return group;
}
