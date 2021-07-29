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

import Rectangle from './model/rectangle';
import Bitmap from './model/bitmap';
import SVG from './model/svg';
import ShapeGroup from './model/shapeGroup';
import Group from './model/group';
import Style from './model/style';
import Text from './model/text';
import TextStyle from './model/textStyle';
import { parseBackgroundImage, getActualImageSize } from './helpers/background';
import { splitShadowString, shadowStringToObject } from './helpers/shadow';
import { getSVGString } from './helpers/svg';
import { getGroupBCR } from './helpers/bcr';
import { fixWhiteSpace } from './helpers/text';
import { isNodeVisible, isTextVisible } from './helpers/visibility';
import TextAttributedString from './model/textAttributedString';

import * as SvgPath from 'svgpath';
import Ref from './model/ref';
import { removeJssNameFromClass } from './helpers/utils';

// Converts quadratic bézier curves to cubic bézier curves
//
SvgPath.prototype.unquad = function () {
  var segments = this.segments;
  var nextPointX, nextPointY;
  var curControlX, curControlY;

  this.iterate(function (
    s: [string, ...number[]],
    idx: number,
    x: number,
    y: number
  ) {
    var name = s[0];

    if (name === 'Q') {
      // quadratic curve

      nextPointX = s[3];
      nextPointY = s[4];

      curControlX = s[1];
      curControlY = s[2];

      segments[idx] = [
        'C',
        x + (2 / 3) * (curControlX - x),
        y + (2 / 3) * (curControlY - y),
        nextPointX + (2 / 3) * (curControlX - nextPointX),
        nextPointY + (2 / 3) * (curControlY - nextPointY),
        nextPointX,
        nextPointY,
      ];
    }
  });

  return this;
};

// Converts line segments to cubic bézier curves
//
SvgPath.prototype.unline = function () {
  var segments = this.segments;

  this.iterate(function (
    s: [string, ...number[]],
    idx: number,
    x: number,
    y: number
  ) {
    var name = s[0];

    if (name === 'L') {
      // line segment
      segments[idx] = ['C', x, y, s[1], s[2], s[1], s[2]];
    } else if (name === 'H') {
      // horizontal line segment
      segments[idx] = ['C', x, y, s[1], y, s[1], y];
    } else if (name === 'V') {
      // vertical line segment
      segments[idx] = ['C', x, y, x, s[1], x, s[1]];
    }
  });

  return this;
};

SvgPath.prototype.toCurvePoints = function (
  node: SVGPathElement,
  cornerRadius: number
) {
  const root = node.ownerSVGElement;
  const ctm = node.getCTM();
  if (!root || !ctm) return [];
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;
  for (let i = 0; i < this.segments.length; i++) {
    const segment = this.segments[i];
    for (let j = 1; j < segment.length; j += 2) {
      const point = root.createSVGPoint();
      point.x = segment[j];
      point.y = segment[j + 1];
      const transformedPoint = point.matrixTransform(ctm);
      segment[j] = transformedPoint.x;
      segment[j + 1] = transformedPoint.y;
      if (minX > transformedPoint.x) minX = transformedPoint.x;
      if (maxX < transformedPoint.x) maxX = transformedPoint.x;
      if (minY > transformedPoint.y) minY = transformedPoint.y;
      if (maxY < transformedPoint.y) maxY = transformedPoint.y;
    }
  }
  const bboxX = minX;
  const bboxY = minY;
  const bboxWidth = maxX - minX;
  const bboxHeight = maxY - minY;
  for (let i = 0; i < this.segments.length; i++) {
    const segment = this.segments[i];
    for (let j = 1; j < segment.length; j += 2) {
      segment[j] = (segment[j] - bboxX) / bboxWidth;
      segment[j + 1] = (segment[j + 1] - bboxY) / bboxHeight;
    }
  }
  let c0x = 0;
  let c0y = 0;
  if (this.segments.length > 0) {
    let startSeg = this.segments[0];
    c0x = startSeg[1];
    c0y = startSeg[2];
  }
  let hasCurveFrom = false;
  let lastX = 0;
  let lastY = 0;
  const segments: any[] = [];
  let curvePoints: any[] = [];
  let isClosed = false;
  this.iterate(function (
    s: [string, ...number[]],
    idx: number,
    x: number,
    y: number
  ) {
    const [command, ...coords] = s;
    idx;
    if (command === 'M') {
      if (hasCurveFrom) {
        const cmd = {
          _class: 'curvePoint',
          cornerRadius,
          curveFrom: `{${c0x}, ${c0y}}`,
          curveMode: 5,
          curveTo: `{${lastX}, ${lastY}}`,
          hasCurveFrom: hasCurveFrom,
          hasCurveTo: false,
          point: `{${lastX}, ${lastY}}`,
        };
        curvePoints.push(cmd);
        lastX = 0;
        lastY = 0;
        c0x = coords[0];
        c0y = coords[1];
      }
      if (curvePoints.length > 0) {
        segments.push({ isClosed, points: curvePoints });
      }
      hasCurveFrom = false;
      isClosed = false;
      curvePoints = [];
    } else if (command === 'C') {
      isClosed = false;
      const cmd = {
        _class: 'curvePoint',
        cornerRadius,
        curveFrom: `{${c0x}, ${c0y}}`,
        curveMode: 5,
        curveTo: `{${coords[0]}, ${coords[1]}}`,
        hasCurveFrom: hasCurveFrom,
        hasCurveTo: true,
        point: `{${x}, ${y}}`,
      };
      hasCurveFrom = true;
      c0x = coords[2];
      c0y = coords[3];
      lastX = coords[4];
      lastY = coords[5];
      curvePoints.push(cmd);
    } else if (command === 'z' || command === 'Z') {
      isClosed = true;
    }
  });
  if (hasCurveFrom) {
    const cmd = {
      _class: 'curvePoint',
      cornerRadius,
      curveFrom: `{${c0x}, ${c0y}}`,
      curveMode: 5,
      curveTo: `{${lastX}, ${lastY}}`,
      hasCurveFrom: hasCurveFrom,
      hasCurveTo: false,
      point: `{${lastX}, ${lastY}}`,
    };
    curvePoints.push(cmd);
  }
  if (curvePoints.length > 0) {
    segments.push({ isClosed, points: curvePoints });
  }
  segments.reverse();
  segments.forEach((s) => s.points.reverse());
  return {
    bbox: { x: bboxX, y: bboxY, width: bboxWidth, height: bboxHeight },
    segments,
  };
};

function getRectanglePoints(cornerRadius: number) {
  return [
    {
      _class: 'curvePoint',
      cornerRadius,
      curveFrom: `{0,0}`,
      curveMode: 1,
      curveTo: `{0,0}`,
      hasCurveFrom: false,
      hasCurveTo: false,
      point: `{0,0}`,
    },
    {
      _class: 'curvePoint',
      cornerRadius,
      curveFrom: `{1,0}`,
      curveMode: 1,
      curveTo: `{1,0}`,
      hasCurveFrom: false,
      hasCurveTo: false,
      point: `{1,0}`,
    },
    {
      _class: 'curvePoint',
      cornerRadius,
      curveFrom: `{1,1}`,
      curveMode: 1,
      curveTo: `{1,1}`,
      hasCurveFrom: false,
      hasCurveTo: false,
      point: `{1,1}`,
    },
    {
      _class: 'curvePoint',
      cornerRadius,
      curveFrom: `{0,1}`,
      curveMode: 1,
      curveTo: `{0,1}`,
      hasCurveFrom: false,
      hasCurveTo: false,
      point: `{0,1}`,
    },
  ];
}

function parseSVGGradientStops(
  node: SVGLinearGradientElement | SVGRadialGradientElement
) {
  const stopArray = [] as { position: number; color: string }[];
  const stops = node.getElementsByTagName('stop');
  for (let i = 0; i < stops.length; i++) {
    const stopEl = stops[i];
    const stop = { position: 0, color: '#000000' };
    stop.position = stopEl.offset.baseVal;
    stop.color =
      getComputedStyle(stopEl).getPropertyValue('stop-color') || '#000000';
    stopArray.push(stop);
  }
  return stopArray;
}

function convertSVGPointToObjectBoundingBox(
  point: DOMPoint,
  x: SVGAnimatedLength,
  y: SVGAnimatedLength,
  node: SVGElement,
  bbox: { x: number; y: number; width: number; height: number }
) {
  if (x.baseVal.unitType === 2) {
    // Percent value, scale to bbox.
    point.x =
      bbox.x +
      (point.x - bbox.x) / (node.ownerSVGElement!.getBBox().width / bbox.width);
  } else {
    // pixel value, move origin to bbox
    point.x = bbox.x + point.x * bbox.width;
  }
  if (y.baseVal.unitType === 2) {
    // Percent value, scale to bbox.
    point.y =
      bbox.y +
      (point.y - bbox.y) /
        (node.ownerSVGElement!.getBBox().height / bbox.height);
  } else {
    point.y = bbox.y + point.y * bbox.height;
  }
}

function parseSVGLinearGradient(
  node: SVGLinearGradientElement,
  ctm: DOMMatrix,
  bbox: { x: number; y: number; width: number; height: number }
) {
  const template = {
    fillType: 1,
    gradient: {
      gradientType: 0,
      from: { x: 0, y: 0 },
      to: { x: 0, y: 0 },
      stops: [] as { position: number; color: string }[],
    },
  };
  ctm;
  const gtm = new DOMMatrix(getComputedStyle(node).transform);
  const point = new DOMPoint(
    node.x1.baseVal.value,
    node.y1.baseVal.value
  ).matrixTransform(gtm); // .matrixTransform(ctm);
  if (node.gradientUnits.baseVal === 2) {
    // Object bounding box units.
    convertSVGPointToObjectBoundingBox(point, node.x1, node.y1, node, bbox);
  }
  template.gradient.from.x = (point.x - bbox.x) / bbox.width;
  template.gradient.from.y = (point.y - bbox.y) / bbox.height;
  const point2 = new DOMPoint(
    node.x2.baseVal.value,
    node.y2.baseVal.value
  ).matrixTransform(gtm); // .matrixTransform(ctm);
  if (node.gradientUnits.baseVal === 2) {
    // Object bounding box units.
    convertSVGPointToObjectBoundingBox(point2, node.x2, node.y2, node, bbox);
  }
  template.gradient.to.x = (point2.x - bbox.x) / bbox.width;
  template.gradient.to.y = (point2.y - bbox.y) / bbox.height;
  template.gradient.stops = parseSVGGradientStops(node);
  return template;
}

function parseSVGRadialGradient(
  node: SVGRadialGradientElement,
  ctm: DOMMatrix,
  bbox: { x: number; y: number; width: number; height: number }
) {
  const template = {
    fillType: 1,
    gradient: {
      gradientType: 1,
      from: { x: 0, y: 0 },
      to: { x: 0, y: 0 },
      stops: [] as { position: number; color: string }[],
    },
  };
  ctm; // Do we need to use the node CTM for anything?
  const style = getComputedStyle(node) as any;
  const gtm = new DOMMatrix(style.transform);
  //.matrixTransform(ctm);
  const center = new DOMPoint(
    node.cx.baseVal.value,
    node.cy.baseVal.value
  ).matrixTransform(gtm);
  if (node.gradientUnits.baseVal === 2) {
    // Object bounding box units.
    convertSVGPointToObjectBoundingBox(center, node.cx, node.cy, node, bbox);
  }
  template.gradient.from.x = (center.x - bbox.x) / bbox.width;
  template.gradient.from.y = (center.y - bbox.y) / bbox.height;
  //.matrixTransform(ctm);
  const radiusPoint = new DOMPoint(node.r.baseVal.value, 0).matrixTransform(
    gtm
  );
  if (node.gradientUnits.baseVal === 2 && node.r.baseVal.unitType === 2) {
    // Percent value in OBB units.
    let d = new DOMPoint(
      node.r.baseVal.valueInSpecifiedUnits * 0.01 * bbox.width,
      0
    ).matrixTransform(gtm);
    radiusPoint.x = center.x + d.x;
    radiusPoint.y = center.y + d.y;
  } else if (node.gradientUnits.baseVal === 2) {
    // Add radius vector to center point.
    radiusPoint.x = radiusPoint.x * bbox.width + center.x;
    radiusPoint.y = radiusPoint.y * bbox.height + center.y;
  } else {
    // Add radius vector to center point.
    radiusPoint.x += center.x;
    radiusPoint.y += center.y;
  }
  template.gradient.to.x = (radiusPoint.x - bbox.x) / bbox.width;
  template.gradient.to.y = (radiusPoint.y - bbox.y) / bbox.height;
  template.gradient.stops = parseSVGGradientStops(node);
  return template;
}

const DEFAULT_VALUES = {
  backgroundColor: 'rgba(0, 0, 0, 0)',
  backgroundImage: 'none',
  borderWidth: '0px',
  boxShadow: 'none',
};

const ALIGNMENTS = {
  left: 0,
  right: 1,
  center: 2,
  justify: 3,
  'flex-start': 0,
  'flex-end': 1,
  start: 0,
  end: 1,
};

function hasOnlyDefaultStyles(styles: object) {
  return Object.keys(DEFAULT_VALUES).every((key) => {
    const defaultValue = DEFAULT_VALUES[key];
    const value = styles[key];

    return defaultValue === value;
  });
}

function fixBorderRadius(borderRadius: string, width: number, height: number) {
  const matches = borderRadius.match(/^([0-9.]+)(.+)$/);

  // Sketch uses 'px' units for border radius, so we need to convert % to px
  if (matches && matches[2] === '%') {
    const baseVal = Math.max(width, height);
    const percentageApplied = baseVal * (parseInt(matches[1], 10) / 100);

    return Math.round(percentageApplied);
  }
  return parseInt(borderRadius, 10);
}

function isSVGDescendant(node: HTMLElement) {
  return node instanceof SVGElement && node.matches('svg *');
}

const PSEUDO_ELEMENTS = [':after', ':before'];

function gatherCSSRules(
  rules: CSSStyleRule[],
  styleSheet: StyleSheet | CSSMediaRule
): CSSStyleRule[] {
  if (styleSheet instanceof CSSStyleSheet && !styleSheet.disabled) {
    Array.from(styleSheet.cssRules)
      .reverse()
      .forEach((rule) => {
        if (
          rule instanceof CSSStyleRule &&
          /::?-webkit-slider-/.test(rule.selectorText)
        ) {
          rules.push(rule);
        } else if (
          rule instanceof CSSMediaRule &&
          window.matchMedia(rule.media.mediaText).matches
        ) {
          rules = gatherCSSRules([], rule).concat(rules);
        } else if (rule instanceof CSSImportRule) {
          rules = gatherCSSRules([], rule.styleSheet).concat(rules);
        }
      });
  }
  return rules;
}

let CSSRules: CSSStyleRule[] | undefined = undefined;

function findSliderThumbCSSRules(el: Element): CSSStyleRule[] {
  if (!CSSRules) return [];
  return CSSRules.filter(
    (r) =>
      el.matches(r.selectorText.replace(/::?(-webkit-slider-thumb)/g, '')) &&
      !el.matches(r.selectorText)
  );
}

function findSliderTrackCSSRules(el: Element): CSSStyleRule[] {
  if (!CSSRules) return [];
  return CSSRules.filter(
    (r) =>
      el.matches(
        r.selectorText.replace(/::?(-webkit-slider-runnable-track)/g, '')
      ) && !el.matches(r.selectorText)
  );
}

const MODES = {
  ESCAPE: '\\'.charCodeAt(0),
  OPENPAREN: '('.charCodeAt(0),
  CLOSEPAREN: ')'.charCodeAt(0),
  DOUBLEQUOTE: '"'.charCodeAt(0),
  QUOTE: "'".charCodeAt(0),
  TOP: -1,
};

function parseContentString(content: string) {
  let astStack = [];
  let currentMode = null;
  let currentNode = { mode: MODES.TOP, name: '', children: [] as any[] };
  const top = currentNode;
  const re = /[^"'()\\\s]*.?/y;
  while (true) {
    const match = re.exec(content);
    if (match === null || match[0].length === 0) break;
    const mode = match[0].charCodeAt(match[0].length - 1);
    let str = match[0].slice(0, -1);
    let treeEnd = false;
    if (currentMode === MODES.ESCAPE) {
      currentNode.children.push(match[0][0]);
      currentMode = currentNode.mode;
      str = str.slice(1);
      if (str.length === 0) continue;
    }
    if (str.length > 0) currentNode.children.push(str);
    if (mode === MODES.ESCAPE) {
      currentMode = MODES.ESCAPE;
      continue;
    }

    if (currentMode === MODES.DOUBLEQUOTE || currentMode === MODES.QUOTE) {
      if (mode === currentMode) {
        treeEnd = true;
      } else {
        currentNode.children.push(match[0].charAt(match.length - 1));
      }
    } else if (currentMode === MODES.OPENPAREN) {
      if (mode === MODES.CLOSEPAREN) {
        treeEnd = true;
      } else {
        astStack.push({ node: currentNode, mode: currentMode });
        currentNode = { mode, name: '', children: [] as any[] };
        currentMode = mode;
      }
    } else if (mode !== 32 && mode !== 9 && mode !== 10) {
      astStack.push({ node: currentNode, mode: currentMode });
      currentNode = {
        mode,
        name: mode === MODES.OPENPAREN ? currentNode.children.pop() : '',
        children: [] as any[],
      };
      currentMode = mode;
    } else {
      currentNode.children.push(match[0].charAt(match[0].length - 1));
    }
    if (treeEnd) {
      const frame = astStack.pop();
      if (frame) {
        frame.node.children.push(currentNode);
        currentNode = frame.node;
        currentMode = frame.mode;
      }
    }
  }
  return top;
}

// https://developer.mozilla.org/en-US/docs/Web/CSS/image
const IMAGE_FUNCS = [
  'url',
  'element',
  'linear-gradient',
  'radial-gradient',
  'repeating-linear-gradient',
  'repeating-radial-gradient',
  'conic-gradient',
  'image',
  'cross-fade',
  'image-set',
];

function astToString(node: HTMLElement, ast: any): string {
  if (typeof ast === 'string') return ast;
  let string = '';
  if (ast.mode === MODES.QUOTE || ast.mode === MODES.DOUBLEQUOTE) {
    return JSON.stringify(ast.children.join(''));
  }
  if (ast.name) {
    if (ast.name === 'attr') {
      return (
        node.getAttribute(
          ast.children.map((c: any) => astToString(node, c)).join('')
        ) || ''
      );
    }
    string += ast.name;
  }
  if (ast.mode === MODES.OPENPAREN) {
    string += '(';
  }
  string += ast.children.map((c: any) => astToString(node, c)).join('');
  if (ast.mode === MODES.OPENPAREN) {
    string += ')';
  }
  return string;
}

function applyAST(element: HTMLElement, node: HTMLElement, ast: any) {
  if (typeof ast === 'string') {
    if (ast === 'open-quote') element.textContent += '"';
    if (ast === 'close-quote') element.textContent += '"';
    return;
  }
  if (ast.mode === MODES.QUOTE || ast.mode === MODES.DOUBLEQUOTE) {
    element.textContent += ast.children.join('');
  } else if (ast.mode === MODES.OPENPAREN) {
    if (IMAGE_FUNCS.includes(ast.name)) {
      element.style.backgroundImage = astToString(node, ast);
    } else if (ast.name === 'attr') {
      element.textContent += astToString(node, ast);
    }
  }
}

function resolveCSSContentString(
  element: HTMLElement,
  node: HTMLElement,
  content: string
): void {
  const ast = parseContentString(content);
  for (let i = 0; i < ast.children.length; i++) {
    let child = ast.children[i];
    applyAST(element, node, child);
  }
}

function applyStyle(element: HTMLElement, style: CSSStyleDeclaration) {
  for (let k in style) {
    try {
      element.style[k] = style[k];
    } catch (e) {}
  }
}

function getNameForNode(node: Element | null): string {
  if (node === null) {
    return 'custom';
  }
  const id = node.getAttribute('id');
  if (id) return id;
  const className = node.getAttribute('class');
  if (className) return removeJssNameFromClass(className.split(' ')[0]);
  return getNameForNode(node.parentElement);
}

export default function nodeToSketchLayers(
  node: HTMLElement,
  group: Group,
  options: any
) {
  if (CSSRules === undefined) {
    CSSRules = Array.from(document.styleSheets).reduce(gatherCSSRules, []);
  }

  const layers: any[] = [];
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

  let hidePseudo = false;
  PSEUDO_ELEMENTS.forEach((pseudo) => {
    const pseudoStyle = getComputedStyle(node, pseudo);
    if (pseudoStyle.content !== 'normal' && pseudoStyle.content !== 'none') {
      const element = document.createElement('span');
      applyStyle(element, pseudoStyle);
      element.style.content = 'normal';
      resolveCSSContentString(element, node, pseudoStyle.content);
      if (
        element.style.backgroundImage !== '' &&
        element.style.display !== 'block'
      ) {
        element.style.display = 'inline-block';
      }
      if (pseudo === ':before') {
        node.insertBefore(element, node.firstChild);
      } else if (pseudo === ':after') {
        node.appendChild(element);
      }
      hidePseudo = true;
    }
  });
  if (hidePseudo) {
    // Hide pseudo elements after recreating them.
    node.classList.add('hide-pseudo');
  }

  if (node instanceof HTMLSelectElement) {
    const selectedOption = Array.from(node.getElementsByTagName('option')).find(
      (o) => o.selected
    );
    const textValue = selectedOption?.textContent;
    if (textValue) {
      const element = document.createElement('div');
      element.appendChild(document.createTextNode('Dropdown Value'));
      applyStyle(element, getComputedStyle(node));
      element.style.background = 'none';
      element.style.left = '0';
      element.style.top =
        // parseInt(element.style.borderTopWidth) -
        // parseInt(element.style.marginTop) +
        '0';
      element.style.lineHeight =
        parseInt(element.style.height) -
        (parseInt(element.style.borderTopWidth) +
          parseInt(element.style.borderBottomWidth) +
          parseInt(element.style.paddingTop)) +
        'px';
      // element.style.border = '1px solid transparent';
      element.style.outline = '0px';
      element.style.textShadow = 'none';
      element.style.boxShadow = 'none';
      element.style.webkitBoxShadow = 'none';
      element.style.position = 'absolute';
      element.style.display = 'block';
      if (node.style.position === 'static') {
        node.style.position = 'relative';
        node.style.left = node.style.top = '0px';
      }
      node.parentElement?.appendChild(element);
    }
  }

  if (node instanceof HTMLInputElement || node instanceof HTMLTextAreaElement) {
    const textValue = node.value;
    if (textValue) {
      const element = document.createElement('div');
      element.appendChild(document.createTextNode('Input Value'));
      applyStyle(element, getComputedStyle(node));
      element.style.background = 'none';
      element.style.left =
        parseInt(element.style.borderLeftWidth) -
        parseInt(element.style.marginLeft) +
        'px';
      element.style.top =
        parseInt(element.style.borderTopWidth) -
        parseInt(element.style.marginTop) +
        4 +
        'px';
      element.style.border = '0px';
      element.style.outline = '0px';
      element.style.textShadow = 'none';
      element.style.boxShadow = 'none';
      element.style.webkitBoxShadow = 'none';
      element.style.position = 'absolute';
      element.style.display = 'block';
      if (node.style.position === 'static') {
        node.style.position = 'relative';
        node.style.left = node.style.top = '0px';
      }
      node.parentElement?.appendChild(element);
    }
  }

  let haveTrack = false;
  const sliderTrackCSSRules = findSliderTrackCSSRules(node);
  if (sliderTrackCSSRules.length > 0) {
    const track = document.createElement('div');
    const rules = [];
    let rule: false | CSSStyleDeclaration = sliderTrackCSSRules[0].style;
    while (rule) {
      rules.unshift(rule);
      rule =
        rule.parentRule instanceof CSSStyleRule &&
        rule.parentRule.style !== rule &&
        rule.parentRule.style;
    }
    rules.forEach((rule) => applyStyle(track, rule));
    track.style.boxSizing = 'border-box';
    track.style.display = 'block';
    track.style.position = 'absolute';
    track.style.minWidth = '0px';
    track.style.alignSelf = 'center';
    track.style.flex = '1 1 0%';
    if (node.parentElement) {
      if (
        !/^(relative|absolute|fixed)$/.test(node.parentElement.style.position)
      ) {
        node.parentElement.style.position = 'relative';
      }
      track.style.top = node.offsetTop - node.offsetHeight / 2 + 'px';
      track.style.left = node.offsetLeft + 'px';
      track.style.width = node.getBoundingClientRect().width + 'px';
      haveTrack = true;
      node.parentElement.appendChild(track);
    }
  }

  const sliderThumbCSSRules = findSliderThumbCSSRules(node);
  if (sliderThumbCSSRules.length > 0) {
    const thumb = document.createElement('div');
    const rules = [];
    let rule: false | CSSStyleDeclaration = sliderThumbCSSRules[0].style;
    while (rule) {
      rules.unshift(rule);
      rule =
        rule.parentRule instanceof CSSStyleRule &&
        rule.parentRule.style !== rule &&
        rule.parentRule.style;
    }
    rules.forEach((rule) => applyStyle(thumb, rule));
    thumb.style.boxSizing = 'border-box';
    thumb.style.display = 'block';
    thumb.style.position = 'absolute';
    if (node.parentElement) {
      if (
        !/^(relative|absolute|fixed)$/.test(node.parentElement.style.position)
      ) {
        node.parentElement.style.position = 'relative';
      }
      thumb.style.top =
        node.offsetTop -
        node.offsetHeight / 2 -
        (haveTrack
          ? 0
          : parseFloat(thumb.style.height) / 2 - node.offsetHeight) +
        'px';
      thumb.style.left = node.offsetLeft + 'px';
      node.parentElement.appendChild(thumb);
    }
  }

  const styles = getComputedStyle(node);
  const {
    backgroundColor,
    backgroundImage,
    backgroundPositionX,
    backgroundPositionY,
    backgroundSize,
    borderColor,
    borderWidth,
    borderTopWidth,
    borderRightWidth,
    borderBottomWidth,
    borderLeftWidth,
    borderTopColor,
    borderRightColor,
    borderBottomColor,
    borderLeftColor,
    borderTopLeftRadius,
    borderTopRightRadius,
    borderBottomLeftRadius,
    borderBottomRightRadius,
    textAlign,
    justifyContent,
    fontFamily,
    fontSize,
    lineHeight,
    color,
    boxShadow,
    opacity,
    whiteSpace,
  }: any = styles;

  // skip SVG child nodes as they are already covered by `new SVG(…)`
  if (isSVGDescendant(node)) {
    // return layers;
  }

  if (!isNodeVisible(node, bcr, styles)) {
    return layers;
  }

  const shapeGroup = new ShapeGroup({ x: left, y: top, width, height });

  if (options && options.getRectangleName) {
    shapeGroup.setName(options.getRectangleName(node));
  } else {
    shapeGroup.setName('custom');
  }

  const isImage =
    node.nodeName === 'IMG' && (node as HTMLImageElement).currentSrc;
  const isSVG = node.nodeName === 'svg';

  if (node instanceof SVGElement) {
    if (
      node instanceof SVGLinearGradientElement ||
      node instanceof SVGRadialGradientElement ||
      node instanceof SVGStopElement
    ) {
      return layers;
    }
    (node as any).shapeGroup = group;

    if (!isSVG && node.ownerSVGElement) {
      // Use the SVG viewbox as the frame for SVG elements.
      // We transform the path points to viewbox coordinates in SvgPath$toCurvePoints,
      // so e.g. <g> with transform need to be skipped.
      const svgBCR = node.ownerSVGElement.getBoundingClientRect();

      shapeGroup._x = svgBCR.left;
      shapeGroup._y = svgBCR.top;
      shapeGroup._width = svgBCR.width;
      shapeGroup._height = svgBCR.height;
    } else if (isSVG) {
      // Create a clip rect for the SVG viewbox
      const clip = new ShapeGroup({ x: left, y: top, width, height });
      clip._class = 'shapePath';
      clip.setHasClippingMask(true);
      clip._points = getRectanglePoints(0);
      clip._isClosed = true;
      layers.push(clip);
    }
    const parseStyleNumber = (s: string = '', defaultValue: number = 0) => {
      let num = parseFloat(s);
      if (isNaN(num)) return defaultValue;
      return num;
    };
    const ellipseAttrsToPath = (
      rx: number,
      cx: number,
      ry: number,
      cy: number
    ) =>
      `M${cx - rx},${cy}a${rx},${ry} 0 1,0 ${rx * 2},0a${rx},${ry} 0 1,0 -${
        rx * 2
      },0`;
    let pathSegments: string | null = null;
    let cornerRadiusPx = 0;
    let classOverride = 'shapePath';
    const anyStyles = styles as any;
    switch (node.tagName) {
      case 'rect':
        classOverride = 'rectangle';
        const x = parseStyleNumber(anyStyles.x),
          y = parseStyleNumber(anyStyles.y);
        const rectWidth = parseStyleNumber(anyStyles.width),
          rectHeight = parseStyleNumber(anyStyles.height);
        pathSegments = `M ${x} ${y} L ${x + rectWidth} ${y} L ${
          x + rectWidth
        } ${y + rectHeight} L ${x} ${y + rectHeight} z`;
        cornerRadiusPx = parseStyleNumber(anyStyles.rx || anyStyles.ry);
        break;
      case 'polygon':
      case 'polyline':
        const points = (node.getAttribute('points') || '')
          .trim()
          .split(/\s*[,\s]\s*/);
        if (points.length > 2) {
          pathSegments = `M ${points[0]} ${points[1]}`;
          for (let i = 2; i < points.length; i += 2) {
            pathSegments += `L ${points[i]} ${points[i + 1]}`;
          }
          if (node.tagName === 'polygon') {
            pathSegments += 'z';
          }
        }
        break;
      case 'circle': {
        const r = parseStyleNumber(anyStyles.r);
        const cx = parseStyleNumber(anyStyles.cx);
        const cy = parseStyleNumber(anyStyles.cy);
        pathSegments = ellipseAttrsToPath(r, cx, r, cy);
        break;
      }
      case 'ellipse': {
        const rx = parseStyleNumber(anyStyles.rx);
        const ry = parseStyleNumber(anyStyles.ry);
        const cx = parseStyleNumber(anyStyles.cx);
        const cy = parseStyleNumber(anyStyles.cy);
        pathSegments = ellipseAttrsToPath(rx, cx, ry, cy);
        break;
      }
      case 'line': {
        const x1 = parseStyleNumber(anyStyles.x1);
        const x2 = parseStyleNumber(anyStyles.x2);
        const y1 = parseStyleNumber(anyStyles.y1);
        const y2 = parseStyleNumber(anyStyles.y2);
        pathSegments = `M ${x1} ${y1} L ${x2} ${y2}`;
        break;
      }
      case 'path':
        pathSegments = node.getAttribute('d');
        break;
      case 'text':
        break;
    }
    if (pathSegments) {
      const path = (new SvgPath(pathSegments) as any)
        .abs()
        .unshort()
        .unarc()
        .unquad()
        .unline();
      node.setAttribute('d', path.toString());
      const style = new Style();
      shapeGroup._isClosed = true;
      style._borderOptions = {
        _class: 'borderOptions',
        isEnabled: true,
        dashPattern: [],
        lineCapStyle: 0,
        lineJoinStyle: 0,
      };
      const ctm = (node as unknown as SVGPathElement).getCTM();
      // Do we need to deal with X-Y scales separately?
      // Sketch doesn't support transform matrices, so can't do full SVG transform stack.
      // Well, you could SVD the matrix into a rotate-scale-rotate sequence if really needed.
      const nodeScale = ctm ? ctm.a : 1;
      const curveSegments = path.toCurvePoints(node, cornerRadiusPx);
      const bbox = curveSegments.bbox;
      bbox.x += shapeGroup._x;
      bbox.y += shapeGroup._y;

      // Set stroke parameters
      if (anyStyles.stroke && anyStyles.stroke !== 'none') {
        style.addBorder({
          color: anyStyles.stroke,
          alpha: parseStyleNumber(anyStyles.strokeOpacity, 1),
          thickness: parseStyleNumber(anyStyles.strokeWidth) * nodeScale,
        });
        style._borders[style._borders.length - 1].position = 0;
        switch (anyStyles.strokeLinecap) {
          case 'round':
            style._borderOptions.lineCapStyle = 1;
            break;
          case 'square':
            style._borderOptions.lineCapStyle = 2;
            break;
          case 'butt':
          default:
            style._borderOptions.lineCapStyle = 0;
            break;
        }
        switch (anyStyles.strokeLinejoin) {
          case 'bevel':
            style._borderOptions.lineJoinStyle = 2;
            break;
          case 'round':
            style._borderOptions.lineJoinStyle = 1;
            break;
          case 'arcs':
            style._borderOptions.lineJoinStyle = 1;
            break;
          case 'miter-clip':
          case 'miter':
          default:
            style._borderOptions.lineJoinStyle = 0;
            break;
        }
        const dashArray = (anyStyles.strokeDasharray || '')
          .split(' ')
          .map((c: string) => parseInt(c));
        if (dashArray.length > 0 && dashArray.every((c: number) => !isNaN(c))) {
          style._borderOptions.dashPattern = dashArray.join('-');
        }
        style._miterLimit = parseStyleNumber(anyStyles.strokeMiterlimit);
      }
      // Set fill parameters
      if (anyStyles.fill && anyStyles.fill !== 'none') {
        const fill = anyStyles.fill.trim();
        if (/^url\s*\(/.test(fill)) {
          const selector = fill.replace(
            /(^url\s*\(\s*["']?)|(["']?\s*\)$)/g,
            ''
          );
          const fillElement = node.ownerSVGElement?.querySelector(
            selector.replace(/"/g, '')
          );
          if (fillElement instanceof SVGLinearGradientElement) {
            const gradient = parseSVGLinearGradient(
              fillElement,
              ctm || new DOMMatrix(),
              { ...bbox, x: bbox.x - shapeGroup._x, y: bbox.y - shapeGroup._y }
            );
            style.addSVGGradientFill(
              gradient,
              parseStyleNumber(anyStyles.fillOpacity, 1)
            );
          } else if (fillElement instanceof SVGRadialGradientElement) {
            const gradient = parseSVGRadialGradient(
              fillElement,
              ctm || new DOMMatrix(),
              { ...bbox, x: bbox.x - shapeGroup._x, y: bbox.y - shapeGroup._y }
            );
            style.addSVGGradientFill(
              gradient,
              parseStyleNumber(anyStyles.fillOpacity, 1)
            );
          }
        } else {
          style.addColorFill(
            anyStyles.fill,
            parseStyleNumber(anyStyles.fillOpacity, 1)
          );
        }
        style._windingRule = anyStyles.fillRule === 'nonzero' ? 0 : 1;
        if (node.getAttribute('clip-rule') !== null) {
          style._windingRule =
            node.getAttribute('clip-rule') === 'nonzero' ? 0 : 1;
        }
      }
      shapeGroup._x = bbox.x;
      shapeGroup._y = bbox.y;
      shapeGroup._width = bbox.width;
      shapeGroup._height = bbox.height;
      shapeGroup.setStyle(style);
      // Create shapePaths from the curve segments.
      curveSegments.segments.forEach(
        (segment: { isClosed: boolean; points: any[] }) => {
          const sg = new ShapeGroup({
            x: 0,
            y: 0,
            width: bbox.width,
            height: bbox.height,
          });
          sg.setStyle(style);
          sg._class = classOverride;
          sg._points = segment.points;
          if (classOverride === 'rectangle') {
            sg._points.forEach((p: { curveMode: number }) => (p.curveMode = 1));
          }
          sg._isClosed = segment.isClosed;
          shapeGroup._layers.push(sg);
        }
      );

      shapeGroup.setName(getNameForNode(node));
      layers.push(shapeGroup);
    }

    if (anyStyles.clipPath && anyStyles.clipPath !== 'none') {
      const clipPath = anyStyles.clipPath.trim();
      if (/^url\s*\(/.test(clipPath)) {
        const selector = clipPath.replace(
          /(^url\s*\(\s*["']?)|(["']?\s*\)$)/g,
          ''
        );
        let clipElement = node.ownerSVGElement?.querySelector(
          selector.replace(/"/g, '')
        );
        while (clipElement instanceof SVGUseElement) {
          const href = clipElement.href.baseVal;
          clipElement = node.ownerSVGElement?.querySelector(
            href.trim().replace(/"/g, '')
          );
        }
        if (clipElement) {
          group._layers.unshift(new Ref(clipElement.shapeGroup, group, true));
        }
      }
    }

    if (pathSegments) {
      return layers;
    }
  }

  // if layer has no background/shadow/border/etc. skip it
  if (isImage || !hasOnlyDefaultStyles(styles)) {
    const style = new Style();

    if (backgroundColor) {
      style.addColorFill(backgroundColor);
    }

    if (isImage) {
      const absoluteUrl = new URL(
        (node as HTMLImageElement).currentSrc,
        location.href
      );

      style.addImageFill(absoluteUrl.href);
      shapeGroup.setFixedWidthAndHeight();
    }

    if (boxShadow !== DEFAULT_VALUES.boxShadow) {
      const shadowStrings = splitShadowString(boxShadow);

      shadowStrings.forEach((shadowString: string) => {
        const shadowObject: any = shadowStringToObject(shadowString);

        if (shadowObject.inset) {
          if (borderWidth.indexOf(' ') === -1) {
            shadowObject.spread += parseFloat(borderWidth);
          }
          style.addInnerShadow(shadowObject);
        } else {
          style.addShadow(shadowObject);
        }
      });
    }

    // support for one-side borders (using inner shadow because Sketch doesn't support that)
    if (borderWidth.indexOf(' ') === -1) {
      const bw = parseFloat(borderWidth);
      if (!isNaN(bw) && bw > 0) {
        style.addBorder({
          color: borderColor,
          thickness: bw,
        });
      }
    } else {
      const borderTopWidthFloat = parseFloat(borderTopWidth);
      const borderRightWidthFloat = parseFloat(borderRightWidth);
      const borderBottomWidthFloat = parseFloat(borderBottomWidth);
      const borderLeftWidthFloat = parseFloat(borderLeftWidth);

      if (borderTopWidthFloat !== 0) {
        const rectangle = new Rectangle({
          width,
          height: borderTopWidthFloat,
          cornerRadius: 0,
          x: left,
          y: top,
        });
        rectangle.setName('border-top');
        const borderStyle = new Style();

        borderStyle.addColorFill(borderTopColor);
        rectangle.setStyle(borderStyle);
        layers.push(rectangle);
      }
      if (borderRightWidthFloat !== 0) {
        const rectangle = new Rectangle({
          width: borderRightWidthFloat,
          height,
          cornerRadius: 0,
          x: left + width,
          y: top,
        });
        rectangle.setName('border-right');
        const borderStyle = new Style();

        borderStyle.addColorFill(borderRightColor);
        rectangle.setStyle(borderStyle);
        layers.push(rectangle);
      }
      if (borderBottomWidthFloat !== 0) {
        const rectangle = new Rectangle({
          width,
          height: borderBottomWidthFloat,
          cornerRadius: 0,
          x: left,
          y: top + height,
        });
        rectangle.setName('border-bottom');
        const borderStyle = new Style();

        borderStyle.addColorFill(borderBottomColor);
        rectangle.setStyle(borderStyle);
        layers.push(rectangle);
      }
      if (borderLeftWidthFloat !== 0) {
        const rectangle = new Rectangle({
          width: borderLeftWidthFloat,
          height,
          cornerRadius: 0,
          x: left,
          y: top,
        });
        rectangle.setName('border-left');
        const borderStyle = new Style();

        borderStyle.addColorFill(borderLeftColor);
        rectangle.setStyle(borderStyle);
        layers.push(rectangle);
      }
    }

    const ow = parseFloat(styles.outlineWidth);
    if (!isNaN(ow) && ow > 0) {
      style.addBorder({
        color: styles.outlineColor,
        thickness: ow,
        position: 2,
      });
    }

    if (!options || options.layerOpacity !== false) {
      style.addOpacity(opacity);
    }

    shapeGroup.setStyle(style);

    //TODO borderRadius can be expressed in different formats and use various units - for simplicity we assume "X%"
    const cornerRadius = {
      topLeft: fixBorderRadius(borderTopLeftRadius, width, height),
      topRight: fixBorderRadius(borderTopRightRadius, width, height),
      bottomLeft: fixBorderRadius(borderBottomLeftRadius, width, height),
      bottomRight: fixBorderRadius(borderBottomRightRadius, width, height),
    };

    const rectangle = new Rectangle({ width, height, cornerRadius });
    const borderAddWidth = Math.max(
      parseFloat(borderLeftWidth),
      parseFloat(borderRightWidth),
      parseFloat(borderTopWidth),
      parseFloat(borderBottomWidth)
    );
    rectangle.setStyle(style);
    rectangle.setName('Background');

    const overflowHidden =
      styles.overflow === 'hidden' || node.tagName == 'IFRAME';

    if (overflowHidden && borderAddWidth > 0) {
      const borderRect = new Rectangle({
        width: rectangle._width,
        height: rectangle._height,
        x: rectangle._x,
        y: rectangle._y,
        cornerRadius,
      });
      const borderStyle = new Style();
      borderStyle._borders = style._borders;
      borderStyle._shadows = style._shadows;
      borderStyle._innerShadows = style._innerShadows;
      borderStyle._borderOptions = style._borderOptions;
      borderStyle._opacity = style._opacity;
      borderRect.setStyle(borderStyle);
      style._borders = [];
      const sg2 = new ShapeGroup({});
      for (var i in shapeGroup) {
        sg2[i] = shapeGroup[i];
      }
      sg2._layers = [];
      sg2.setStyle(borderStyle);
      layers.push(sg2);
      (sg2 as any)._onTop = true;
      borderRect.setName('Border');
      sg2.addLayer(borderRect);
    }

    shapeGroup.setName('Background');
    shapeGroup.addLayer(rectangle);

    if (overflowHidden) {
      shapeGroup.setHasClippingMask(true);
    }

    // This should return a array once multiple background-images are supported
    const backgroundImageResult = parseBackgroundImage(backgroundImage);

    let layer: any = shapeGroup;

    if (backgroundImageResult) {
      switch (backgroundImageResult.type) {
        case 'Image': {
          const img: any = new Image();

          img.src = backgroundImageResult.value;

          // TODO add support for % values
          const bitmapX = parseFloat(backgroundPositionX);
          const bitmapY = parseFloat(backgroundPositionY);

          const actualImgSize = getActualImageSize(
            backgroundSize,
            { width: img.width, height: img.height },
            { width, height }
          );

          if (
            bitmapX === 0 &&
            bitmapY === 0 &&
            actualImgSize.width === img.width &&
            actualImgSize.height === img.height
          ) {
            // background image fits entirely inside the node, so we can represent it with a (cheaper) image fill
            style.addImageFill(backgroundImageResult.value);
          } else {
            // use a Group(Shape + Bitmap) to correctly represent clipping of the background image
            const bm = new Bitmap({
              url: backgroundImageResult.value,
              x: bitmapX,
              y: bitmapY,
              width: actualImgSize.width,
              height: actualImgSize.height,
            });

            bm.setName('background-image');
            shapeGroup.setHasClippingMask(true);

            const group = new Group({ x: left, y: top, width, height });

            // position is relative to the group
            shapeGroup.setPosition({ x: 0, y: 0 });
            group.addLayer(shapeGroup);
            group.addLayer(bm);

            layer = group;
          }

          break;
        }
        case 'LinearGradient':
          style.addGradientFill(backgroundImageResult.value);
          break;
        default:
          // Unsupported types:
          // - radial gradient
          // - multiple background-image
          break;
      }
    }

    layers.push(layer);
  } else {
    if (styles.overflow === 'hidden') {
      const clip = new ShapeGroup({ x: left, y: top, width, height });
      clip._class = 'shapePath';
      clip.setHasClippingMask(true);
      clip._points = getRectanglePoints(0);
      clip._isClosed = true;
      layers.push(clip);
    }
  }

  if (isSVG) {
    // sketch ignores padding and centering as defined by viewBox and preserveAspectRatio when
    // importing SVG, so instead of using BCR of the SVG, we are using BCR of its children
    const childrenBCR = getGroupBCR(Array.from(node.children));
    const svgLayer = new SVG({
      x: childrenBCR.left,
      y: childrenBCR.top,
      width: childrenBCR.width,
      height: childrenBCR.height,
      rawSVGString: getSVGString(node),
    });

    layers.push(svgLayer);

    return layers;
  }

  if (!isTextVisible(styles)) {
    return layers;
  }

  const textStyle = new TextStyle({
    fontFamily,
    fontSize: parseInt(fontSize, 10),
    textTransform: styles.textTransform,
    fontWeight: styles.fontWeight,
    fontStyle: styles.fontStyle,
    color,
    skipSystemFonts: options && options.skipSystemFonts,
  });

  const fullFontFamily = textStyle.getFontFamily();

  const alignment = ALIGNMENTS[justifyContent] || ALIGNMENTS[textAlign] || 0;

  const textAttributedString = (text: string) =>
    new TextAttributedString({
      text,
      fontFamily: fullFontFamily,
      fontSize: parseInt(fontSize, 10),
      textTransform: styles.textTransform,
      skipSystemFonts: options && options.skipSystemFonts,
      color,
      alignment,
    });

  const rangeHelper = document.createRange();

  if (
    node.tagName === 'INPUT' &&
    (node as HTMLInputElement).type.toLowerCase() == 'text'
  ) {
    const inputEl = node as HTMLInputElement;
    // const div = document.createElement('div');
    if (inputEl.value === '' && inputEl.placeholder !== '') {
      inputEl.value = inputEl.placeholder;
      // 	div.textContent = inputEl.placeholder;
      // 	div.setAttribute('pseudo', "-webkit-input-placeholder");
      // 	div.id = "placeholder";
      // 	div.style.display = "block !important";
      // } else {
      // 	div.textContent = inputEl.value;
    }
    // node.appendChild(div);
  }

  // Text
  Array.from(node.childNodes)
    .filter(
      (child: HTMLElement) =>
        child.nodeType === 3 &&
        child.nodeValue &&
        child.nodeValue.trim().length > 0
    )
    .forEach((textNode: HTMLElement) => {
      rangeHelper.selectNodeContents(textNode);
      const textRanges = Array.from(rangeHelper.getClientRects());
      const numberOfLines = textRanges.length;
      const textBCR = rangeHelper.getBoundingClientRect();
      const lineHeightInt = parseInt(lineHeight, 10);
      const textBCRHeight = Math.ceil(textBCR.bottom - textBCR.top);
      let fixY = 0;

      // center text inside a box
      // TODO it's possible now in sketch - fix it!
      if (
        false &&
        lineHeightInt &&
        textBCRHeight !== lineHeightInt * numberOfLines
      ) {
        fixY = (textBCRHeight - lineHeightInt * numberOfLines) / 2;
      }

      const textValue = fixWhiteSpace(textNode.nodeValue || '', whiteSpace);

      const text = new Text({
        x: textBCR.left,
        y: textBCR.top + fixY,
        width: Math.ceil(textBCR.right - textBCR.left) + 3,
        height: textBCRHeight,
        text: textValue,
        style: textStyle,
        attributedString: textAttributedString(textValue),
        multiline: numberOfLines > 1,
      });

      if (options && options.onTextGenerate) {
        options.onTextGenerate({ layer: text, node: textNode });
      }

      layers.push(text);
    });

  return layers;
}
