export class Artboard {
  static Model: {
    backgroundColor: {};
    booleanOperation: number;
    do_objectID: string;
    exportOptions: {
      exportFormats: any[];
      includedLayerIds: any[];
      layerOptions: number;
      shouldTrim: boolean;
    };
    frame: {
      constrainProportions: boolean;
      height: number;
      width: number;
      x: number;
      y: number;
    };
    hasBackgroundColor: boolean;
    hasClickThrough: boolean;
    horizontalRulerData: {
      base: number;
      guides: any[];
    };
    includeBackgroundColorInExport: boolean;
    includeInCloudUpload: boolean;
    isFixedToViewport: boolean;
    isFlippedHorizontal: boolean;
    isFlippedVertical: boolean;
    isFlowHome: boolean;
    isLocked: boolean;
    isVisible: boolean;
    layerListExpandedType: number;
    name: string;
    nameIsFixed: boolean;
    resizesContent: boolean;
    resizingConstraint: number;
    resizingType: number;
    rotation: number;
    shouldBreakMaskChain: boolean;
    style: {
      borders: any[];
      contextSettings: {
        blendMode: any;
        opacity: any;
      };
      do_objectID: string;
      endMarkerType: number;
      fills: any[];
      miterLimit: number;
      shadows: any[];
      startMarkerType: number;
      textStyle: {};
      windingRule: number;
    };
    verticalRulerData: {
      base: number;
      guides: any[];
    };
  };
  constructor(args?: any, json?: any);
  addLayer(layer: any): any;
  getGroups(): any;
  getID(): any;
  getLayers(predicate: any): any;
  setSharedStyle(style: any): void;
}
export class Border {
  static Model: {
    color: {
      alpha: number;
      blue: number;
      green: number;
      red: number;
    };
    fillType: number;
    isEnabled: boolean;
    position: number;
    thickness: number;
  };
  static Position: {
    Center: number;
    Inside: number;
    Outside: number;
  };
  constructor(args?: any, json?: any);
}
export class BorderOptions {
  static LineCapStyle: {
    butt: number;
    projecting: number;
    round: number;
  };
  static LineJoinStyle: {
    bevel: number;
    miter: number;
    round: number;
  };
  static Model: {
    dashPattern: any[];
    isEnabled: boolean;
    lineCapStyle: number;
    lineJoinStyle: number;
  };
  constructor(args?: any, json?: any);
}
export class Color {
  static Model: {
    alpha: number;
    blue: number;
    green: number;
    red: number;
  };
  constructor(args?: any, json?: any);
  set(tinyColor: any): any;
}
export class CurvePoint {
  static Model: {
    cornerRadius: number;
    curveFrom: string;
    curveMode: number;
    curveTo: string;
    hasCurveFrom: boolean;
    hasCurveTo: boolean;
    point: string;
  };
  constructor(args?: any, json?: any);
}
export class Document {
  static Model: {
    assets: {
      colors: any[];
      gradients: any[];
      imageCollection: {
        images: any;
      };
      images: any[];
    };
    colorSpace: number;
    currentPageIndex: number;
    do_objectID: string;
    foreignLayerStyles: any[];
    foreignSymbols: any[];
    foreignTextStyles: any[];
    layerStyles: {
      objects: any[];
    };
    layerSymbols: {
      objects: any[];
    };
    layerTextStyles: {
      objects: any[];
    };
    pages: any[];
  };
  constructor(args?: any, json?: any);
  addLayerStyle(style: any): any;
  addPage(pageID: any): any;
  addTextStyle(style: any): any;
  getLayerStyle(name: any): any;
  getLayerStyles(): any;
  getTextStyles(): any;
}
export class ExportFormat {
  static Model: {
    absoluteSize: number;
    fileFormat: string;
    name: string;
    namingScheme: number;
    scale: number;
    visibleScaleType: number;
  };
  constructor(args?: any, json?: any);
}
export class ExportOptions {
  static Model: {
    exportFormats: any[];
    includedLayerIds: any[];
    layerOptions: number;
    shouldTrim: boolean;
  };
  constructor(args?: any, json?: any);
}
export class Fill {
  static FillType: {
    Color: number;
    Gradient: number;
    Noise: number;
    Pattern: number;
  };
  static Model: {
    color: {
      alpha: number;
      blue: number;
      green: number;
      red: number;
    };
    fillType: number;
    gradient: {
      elipseLength: number;
      from: string;
      gradientType: number;
      stops: any[];
      to: string;
    };
    isEnabled: boolean;
    noiseIndex: number;
    noiseIntensity: number;
    patternFillType: number;
    patternTileScale: number;
  };
  constructor(args?: any, json?: any);
  gradient: any;
  color: any;
}
export class Gradient {
  static GradientStop: {
    color: {
      alpha: number;
      blue: number;
      green: number;
      red: number;
    };
    position: number;
  };
  static GradientType: {
    Angular: number;
    Linear: number;
    Radial: number;
  };
  static Model: {
    elipseLength: number;
    from: string;
    gradientType: number;
    stops: any[];
    to: string;
  };
  constructor(args?: any, json?: any);
}
export class Group {
  static Model: {
    booleanOperation: number;
    do_objectID: string;
    exportOptions: {
      exportFormats: any[];
      includedLayerIds: any[];
      layerOptions: number;
      shouldTrim: boolean;
    };
    frame: {
      constrainProportions: boolean;
      height: number;
      width: number;
      x: number;
      y: number;
    };
    hasClickThrough: boolean;
    isFixedToViewport: boolean;
    isFlippedHorizontal: boolean;
    isFlippedVertical: boolean;
    isLocked: boolean;
    isVisible: boolean;
    layerListExpandedType: number;
    name: string;
    nameIsFixed: boolean;
    resizingConstraint: number;
    resizingType: number;
    rotation: number;
    shouldBreakMaskChain: boolean;
    style: {
      borders: any[];
      contextSettings: {
        blendMode: any;
        opacity: any;
      };
      do_objectID: string;
      endMarkerType: number;
      fills: any[];
      miterLimit: number;
      shadows: any[];
      startMarkerType: number;
      textStyle: {};
      windingRule: number;
    };
  };
  constructor(args?: any, json?: any);
  addLayer(layer: any): any;
  getGroups(): any;
  getID(): any;
  getLayers(predicate: any): any;
  setSharedStyle(style: any): void;
}
export class Meta {
  static Model: {
    app: string;
    appVersion: string;
    autosaved: number;
    build: number;
    commit: string;
    compatibilityVersion: number;
    created: {
      app: string;
      appVersion: string;
      build: number;
      commit: string;
      compatibilityVersion: number;
      variant: string;
      version: number;
    };
    fonts: any[];
    pagesAndArtboards: {};
    saveHistory: string[];
    variant: string;
    version: number;
  };
  constructor(args?: any, json?: any);
  addArtboard(pageID: any, artboard: any): void;
  addPage(page: any): void;
}
export class Oval {
  static Model: {
    booleanOperation: number;
    do_objectID: string;
    edited: boolean;
    exportOptions: {
      exportFormats: any[];
      includedLayerIds: any[];
      layerOptions: number;
      shouldTrim: boolean;
    };
    frame: {
      constrainProportions: boolean;
      height: number;
      width: number;
      x: number;
      y: number;
    };
    isClosed: boolean;
    isFixedToViewport: boolean;
    isFlippedHorizontal: boolean;
    isFlippedVertical: boolean;
    isLocked: boolean;
    isVisible: boolean;
    layerListExpandedType: number;
    name: string;
    nameIsFixed: boolean;
    pointRadiusBehaviour: number;
    points: any[];
    resizingConstraint: number;
    resizingType: number;
    rotation: number;
    shouldBreakMaskChain: boolean;
    style: {
      borders: any[];
      contextSettings: {
        blendMode: any;
        opacity: any;
      };
      do_objectID: string;
      endMarkerType: number;
      fills: any[];
      miterLimit: number;
      shadows: any[];
      startMarkerType: number;
      textStyle: {};
      windingRule: number;
    };
  };
  constructor(args?: any, json?: any);
  addLayer(layer: any): any;
  getGroups(): any;
  getID(): any;
  getLayers(predicate: any): any;
  setSharedStyle(style: any): void;
}
export class Page {
  static Model: {
    booleanOperation: number;
    do_objectID: string;
    exportOptions: {
      exportFormats: any[];
      includedLayerIds: any[];
      layerOptions: number;
      shouldTrim: boolean;
    };
    frame: {
      constrainProportions: boolean;
      height: number;
      width: number;
      x: number;
      y: number;
    };
    hasClickThrough: boolean;
    isFixedToViewport: boolean;
    isFlippedHorizontal: boolean;
    isFlippedVertical: boolean;
    isLocked: boolean;
    isVisible: boolean;
    layerListExpandedType: number;
    name: string;
    nameIsFixed: boolean;
    resizingConstraint: number;
    resizingType: number;
    rotation: number;
    shouldBreakMaskChain: boolean;
    style: {
      borders: any[];
      contextSettings: {
        blendMode: any;
        opacity: any;
      };
      do_objectID: string;
      endMarkerType: number;
      fills: any[];
      miterLimit: number;
      shadows: any[];
      startMarkerType: number;
      textStyle: {};
      windingRule: number;
    };
  };
  constructor(args: any, json?: any);
  addArtboard(artboard: any): any;
  addLayer(layer: any): any;
  getArtboard(name: any): any;
  getArtboards(predicate: any): any;
  getGroups(): any;
  getID(): any;
  getLayers(predicate: any): any;
  setSharedStyle(style: any): void;
}
export class Rect {
  static Model: {
    constrainProportions: boolean;
    height: number;
    width: number;
    x: number;
    y: number;
  };
  constructor(args?: any, json?: any);
}
export class Rectangle {
  static Model: {
    booleanOperation: number;
    do_objectID: string;
    edited: boolean;
    exportOptions: {
      exportFormats: any[];
      includedLayerIds: any[];
      layerOptions: number;
      shouldTrim: boolean;
    };
    fixedRadius: number;
    frame: {
      constrainProportions: boolean;
      height: number;
      width: number;
      x: number;
      y: number;
    };
    hasConvertedToNewRoundCorners: boolean;
    isClosed: boolean;
    isFixedToViewport: boolean;
    isFlippedHorizontal: boolean;
    isFlippedVertical: boolean;
    isLocked: boolean;
    isVisible: boolean;
    layerListExpandedType: number;
    name: string;
    nameIsFixed: boolean;
    pointRadiusBehaviour: number;
    points: any[];
    resizingConstraint: number;
    resizingType: number;
    rotation: number;
    shouldBreakMaskChain: boolean;
    style: {
      borders: any[];
      contextSettings: {
        blendMode: any;
        opacity: any;
      };
      do_objectID: string;
      endMarkerType: number;
      fills: any[];
      miterLimit: number;
      shadows: any[];
      startMarkerType: number;
      textStyle: {};
      windingRule: number;
    };
  };
  constructor(args?: any, json?: any);
  addLayer(layer: any): any;
  getGroups(): any;
  getID(): any;
  getLayers(predicate: any): any;
  setSharedStyle(style: any): void;
}
export class RulerData {
  static Model: {
    base: number;
    guides: any[];
  };
  constructor(args?: any, json?: any);
}
export class Shadow {
  static Model: {
    blurRadius: number;
    color: {
      alpha: number;
      blue: number;
      green: number;
      red: number;
    };
    contextSettings: {
      blendMode: number;
      opacity: number;
    };
    isEnabled: boolean;
    offsetX: number;
    offsetY: number;
    spread: number;
  };
  constructor(args?: any, json?: any);
}
export class ShapeGroup {
  static Model: {
    booleanOperation: number;
    clippingMaskMode: number;
    do_objectID: string;
    exportOptions: {
      exportFormats: any[];
      includedLayerIds: any[];
      layerOptions: number;
      shouldTrim: boolean;
    };
    frame: {
      constrainProportions: boolean;
      height: number;
      width: number;
      x: number;
      y: number;
    };
    hasClippingMask: boolean;
    isFixedToViewport: boolean;
    isFlippedHorizontal: boolean;
    isFlippedVertical: boolean;
    isLocked: boolean;
    isVisible: boolean;
    layerListExpandedType: number;
    name: string;
    nameIsFixed: boolean;
    resizingConstraint: number;
    resizingType: number;
    rotation: number;
    shouldBreakMaskChain: boolean;
    style: {
      borders: any[];
      contextSettings: {
        blendMode: any;
        opacity: any;
      };
      do_objectID: string;
      endMarkerType: number;
      fills: any[];
      miterLimit: number;
      shadows: any[];
      startMarkerType: number;
      textStyle: {};
      windingRule: number;
    };
    windingRule: number;
  };
  static Oval(args: any): any;
  static Rectangle(args: any): any;
  constructor(args?: any, json?: any);
  addLayer(layer: any): any;
  getGroups(): any;
  getID(): any;
  getLayers(predicate: any): any;
  setSharedStyle(style: any): void;
}
export class SharedStyle {
  static LayerStyle(args: any): any;
  static TextStyle(args: any): any;
  constructor(args?: any, json?: any);
  value: any;
}
export class Sketch {
  static fromFile(path: any): any;
  constructor(args?: any);
  addArtboard(pageID: any, artboard: any): void;
  addLayerStyle(style: any): void;
  addPage(page: any, args?: any): void;
  addTextStyle(style: any): void;
  build(output: any): any;
  getLayerStyle(name: any): any;
  getLayerStyles(): any;
  getPage(name: any): any;
  getPages(predicate: any): any;
  getTextStyles(): any;
}
export class Style {
  static BlendMode: {
    Color: number;
    ColorBurn: number;
    ColorDodge: number;
    Darken: number;
    Difference: number;
    Exclusion: number;
    HardLight: number;
    Hue: number;
    Lighten: number;
    Luminosity: number;
    Multiply: number;
    Normal: number;
    Overlay: number;
    Saturation: number;
    Screen: number;
    SoftLight: number;
  };
  static LayerStyle(args: any): any;
  static MarkerType: {
    filledArrow: number;
    filledCircle: number;
    filledSquare: number;
    line: number;
    none: number;
    openArrow: number;
    openCircle: number;
    openSquare: number;
  };
  static Model: {
    borders: any[];
    contextSettings: {
      blendMode: number;
      opacity: number;
    };
    do_objectID: string;
    endMarkerType: number;
    fills: any[];
    miterLimit: number;
    shadows: any[];
    startMarkerType: number;
    textStyle: {};
    windingRule: number;
  };
  static TextStyle(args: any): any;
  static WindingRule: {};
  constructor(args?: any, json?: any);
  textStyle: any;
  fills: any;
  borders: any;
  shadows: any;
}
export class Text {
  static Model: {
    attributedString: {
      attributes: any[];
      string: string;
    };
    automaticallyDrawOnUnderlyingPath: boolean;
    booleanOperation: number;
    do_objectID: string;
    dontSynchroniseWithSymbol: boolean;
    exportOptions: {
      exportFormats: any[];
      includedLayerIds: any[];
      layerOptions: number;
      shouldTrim: boolean;
    };
    frame: {
      constrainProportions: boolean;
      height: number;
      width: number;
      x: number;
      y: number;
    };
    glyphBounds: string;
    isFixedToViewport: boolean;
    isFlippedHorizontal: boolean;
    isFlippedVertical: boolean;
    isLocked: boolean;
    isVisible: boolean;
    layerListExpandedType: number;
    lineSpacingBehaviour: number;
    name: string;
    nameIsFixed: boolean;
    resizingConstraint: number;
    resizingType: number;
    rotation: number;
    shouldBreakMaskChain: boolean;
    style: {
      borders: any[];
      contextSettings: {
        blendMode: any;
        opacity: any;
      };
      do_objectID: string;
      endMarkerType: number;
      fills: any[];
      miterLimit: number;
      shadows: any[];
      startMarkerType: number;
      textStyle: {};
      windingRule: number;
    };
    textBehaviour: number;
  };
  constructor(args?: any, json?: any);
  addLayer(layer: any): any;
  getGroups(): any;
  getID(): any;
  getLayers(predicate: any): any;
  setSharedStyle(style: any): void;
}
export class TextStyle {
  static Model: {
    encodedAttributes: {
      MSAttributedStringColorAttribute: {
        alpha: any;
        blue: any;
        green: any;
        red: any;
      };
      MSAttributedStringFontAttribute: {
        attributes: any;
      };
      paragraphStyle: {
        alignment: any;
      };
      strikethroughStyle: number;
      textStyleVerticalAlignmentKey: number;
      underlineStyle: number;
    };
    verticalAlignment: number;
  };
  constructor(args?: any, json?: any);
  getColor(): any;
  getFontName(): any;
  getFontSize(): any;
}
export class User {
  static Model: {
    document: {
      pageListHeight: string;
    };
  };
  constructor(args?: any, json?: any);
  addPage(pageID: any, opts: any): any;
}
export function layerToClass(layer: any): any;
export const maps: {
  textAlignmentMap: {
    "0": string;
    "1": string;
    "2": string;
    "3": string;
    center: number;
    justify: number;
    left: number;
    right: number;
  };
  verticalAlignmentMap: {
    "0": string;
    "1": string;
    "2": string;
    bottom: number;
    center: number;
    top: number;
  };
};
export function stackLayers(layers: any, gutter: any): any;
