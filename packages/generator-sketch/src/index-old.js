const {
  Sketch,
  Page,
  Artboard,
  SharedStyle,
  SymbolMaster,
  Rectangle,
  CurvePoint,
  Rect,
  Group,
  ShapeGroup,
  SymbolInstance
} = require("sketch-constructor");
const fs = require("fs");
const uuid = require("uuid").v4;

const iconMap = {};

// const jsonIcons = require('../icons.json')
const json = require("../sketch-json/button.json");
const tinycolor = require("tinycolor2");
const directory = "sketch";

const {enhanceText} = require('./enhancers/text');
const {enhanceRectangle} = require('./enhancers/rectangle');

const iconsFileName = "icons";
const iconsSketchFile = `./sketch-icons/${iconsFileName}.sketch`;

let iconIds = [];

const sketch = new Sketch();

if (!fs.existsSync(directory)) {
  console.log(`generating directory: ${directory}`);
  fs.mkdirSync(`${process.cwd()}/${directory}`, { recursive: true });
}

const prepareClass = layer => {
  let convertedClasses = {};
  Object.keys(layer).forEach(key => {
    if (Array.isArray(layer[key]) && key === "layers") {

      convertedClasses[key] = layer.layers.map(nestedLayer =>
        prepareClass(nestedLayer)
      );
    } else {
      if (key === "_class") {
        switch (layer[key]) {
          case "group":

            convertedClasses = new Group(layer);
            break;
          case "rectangle":
            convertedClasses = new Rectangle(layer);
            break;
          case "shapeGroup":
            convertedClasses = new ShapeGroup(layer);
            break;
          // case 'symbolInstance':
          //     convertedClasses = iconMap[layer.name]
          //     break
          default:
            convertedClasses = layer;
            break;
        }
      } else {
        convertedClasses[key] = layer[key];
      }
    }
  });
  // console.log("These are the converted Classes!", convertedClasses)
  return convertedClasses;
};

const symbolMaster = (name, id, layers, height, width, x, y) => {
  const symbol = new SymbolMaster({
    // TODO: CHANGE HARDCODED VALUE
    name,
    frame: {
      x,
      y,
      width,
      height
    }
  });


  const enhancedLayers = layers
    .map((layer, index) => {
      if (layer.name === name) {
        return {
          ...layer,
          frame: {
            ...layer.frame,
            height,
            width
          }
        };
      }
      return layer;
    })
    .map(layer => prepareClass(layer));
  enhancedLayers.forEach((layer, index) => {
    // TODO: CHANGE HARDCODED VALUE
    if (layer.layers[1].name === 'Button') {
      layer.layers[1].frame.y = (layer.layers[0].frame.height - layer.layers[1].frame.height)/2
    }
    // TODO: CHANGE HARDCODED VALUE
    // if (layer.layers[0]) {
    //   const cssName = layer.layers[0].name
    //   if (cssName.includes('hover')) {
    //     symbol.name = symbol.name + ' / Hover'
    //   } else if (cssName.includes('focus')) {
    //     symbol.name = symbol.name + ' / Focus'
    //   } else if (cssName.includes('active')) {
    //     symbol.name = symbol.name + ' / Active'
    //   } else {
    //     symbol.name = symbol.name + ' / Default'
    //   }
    // }
    return symbol.addLayer(layer);
  });
  symbol.groupLayout = {
    _class: "MSImmutableInferredGroupLayout",
    axis: 0,
    layoutAnchor: 0,
    maxSize: 0,
    minSize: 0
  }
  // console.log(">>>>>>>>>>>>>>>>> Start here", symbol);
  return symbol
};

// TODO: Enhanced Group/SymbolMaster
// We need to add a Grouplayout object to all Artborads/Groups/Symbols that should implement Smartlayout
// We still need to figure out what values axis and layoutanchor need.
//            "groupLayout": {
//                             "axis": 0, // 0 = horizontal, 1 = vertical
//                             "_class": "MSImmutableInferredGroupLayout",
//                             "layoutAnchor": 0, // 0 = left (top), 1 = Center , 2 = right (Bottom)
//                             "maxSize": 0,
//                             "minSize": 0
//                           },


const enhancedStyle = (text, fontSize, fontFamily = "Arial-BoldMT", color) => ({
  _class: "style",
  endMarkerType: 0,
  miterLimit: 10,
  startMarkerType: 0,
  windingRule: 1,
  blur: {
    _class: "blur",
    isEnabled: false,
    center: "{0.5, 0.5}",
    motionAngle: 0,
    radius: 10,
    saturation: 1,
    type: 0
  },
  borderOptions: {
    _class: "borderOptions",
    isEnabled: true,
    dashPattern: [],
    lineCapStyle: 0,
    lineJoinStyle: 0
  },
  borders: [],
  colorControls: {
    _class: "colorControls",
    isEnabled: false,
    brightness: 0,
    contrast: 1,
    hue: 0,
    saturation: 1
  },
  contextSettings: {
    _class: "graphicsContextSettings",
    blendMode: 0,
    opacity: 1
  },
  fills: [],
  innerShadows: [],
  shadows: [],
  textStyle: {
    _class: "textStyle",
    encodedAttributes: {
      MSAttributedStringColorAttribute: {
        _class: "color",
        ...color
      },
      textStyleVerticalAlignmentKey: 0,
      MSAttributedStringFontAttribute: {
        _class: "fontDescriptor",
        attributes: {
          name: fontFamily,
          size: fontSize
        }
      },
      paragraphStyle: {
        _class: "paragraphStyle",
        alignment: 0
      },
      kerning: 0
    },
    verticalAlignment: 0
  }
});

const enhancedAttributedString = (
  text,
  fontSize,
  fontFamily = "Arial-BoldMT",
  color
) => ({
  _class: "attributedString",
  string: text,
  attributes: [
    {
      _class: "stringAttribute",
      location: 0,
      length: text.length,
      attributes: {
        MSAttributedStringFontAttribute: {
          _class: "fontDescriptor",
          attributes: {
            name: fontFamily,
            size: fontSize
          }
        },
        MSAttributedStringColorAttribute: {
          _class: "color",
          ...color
        },
        kerning: 0,
        textStyleVerticalAlignmentKey: 0,
        paragraphStyle: {
          _class: "paragraphStyle",
          alignment: 0
        }
      }
    }
  ]
});

// can be removed

// const iconPlaceholder = () => ({
//   _class: "rectangle",
//   name: "Icon placeholder",
//   frame: {
//     _class: "rect",
//     constrainProportions: true,
//     width: 18,
//     height: 18,
//     x: 0,
//     y: 0
//   },
//   style: {
//     _class: "style",
//     do_objectID: "7B05C18F-A845-4965-97E0-EAB52C202E0C",
//     fills: [
//       {
//         _class: "fill",
//         isEnabled: true,
//         fillType: 0,
//         color: {
//           _class: "color",
//           alpha: 0.1,
//           blue: 0,
//           green: 0,
//           red: 0
//         }
//       }
//     ]
//   },
//   points: [
//     {
//       _class: "curvePoint",
//       cornerRadius: 4,
//       curveFrom: "{0, 0}",
//       curveMode: 1,
//       curveTo: "{0, 0}",
//       hasCurveFrom: false,
//       hasCurveTo: false,
//       point: "{0, 0}"
//     },
//     {
//       _class: "curvePoint",
//       cornerRadius: 4,
//       curveFrom: "{1, 0}",
//       curveMode: 1,
//       curveTo: "{1, 0}",
//       hasCurveFrom: false,
//       hasCurveTo: false,
//       point: "{1, 0}"
//     },
//     {
//       _class: "curvePoint",
//       cornerRadius: 4,
//       curveFrom: "{1, 1}",
//       curveMode: 1,
//       curveTo: "{1, 1}",
//       hasCurveFrom: false,
//       hasCurveTo: false,
//       point: "{1, 1}"
//     },
//     {
//       _class: "curvePoint",
//       cornerRadius: 4,
//       curveFrom: "{0, 1}",
//       curveMode: 1,
//       curveTo: "{0, 1}",
//       hasCurveFrom: false,
//       hasCurveTo: false,
//       point: "{0, 1}"
//     }
//   ],
//   fixedRadius: 4
// });

const enhancedTypoStyle = (
  text,
  fontSize,
  fontFamily = undefined,
  color = undefined
) => ({
  style: enhancedStyle(text, fontSize, fontFamily, color),
  attributedString: enhancedAttributedString(text, fontSize, fontFamily, color)
});

const symbolInstance = (name, id, height, width, x, y) => ({
  _class: "symbolInstance",
  booleanOperation: -1,
  isFixedToViewport: false,
  isFlippedHorizontal: false,
  isFlippedVertical: false,
  isLocked: false,
  isVisible: true,
  layerListExpandedType: 0,
  name,
  nameIsFixed: false,
  resizingConstraint: 63,
  resizingType: 0,
  rotation: 0,
  shouldBreakMaskChain: false,
  exportOptions: {
    _class: "exportOptions",
    includedLayerIds: [],
    layerOptions: 0,
    shouldTrim: false,
    exportFormats: []
  },
  frame: {
    _class: "rect",
    constrainProportions: false,
    height,
    width,
    x,
    y
  },
  clippingMaskMode: 0,
  hasClippingMask: false,
  style: {
    _class: "style",
    endMarkerType: 0,
    miterLimit: 10,
    startMarkerType: 0,
    windingRule: 1,
    blur: {
      _class: "blur",
      isEnabled: false,
      center: "{0.5, 0.5}",
      motionAngle: 0,
      radius: 10,
      saturation: 1,
      type: 0
    },
    borderOptions: {
      _class: "borderOptions",
      isEnabled: true,
      dashPattern: [],
      lineCapStyle: 0,
      lineJoinStyle: 0
    },
    borders: [],
    colorControls: {
      _class: "colorControls",
      isEnabled: false,
      brightness: 0,
      contrast: 1,
      hue: 0,
      saturation: 1
    },
    contextSettings: {
      _class: "graphicsContextSettings",
      blendMode: 0,
      opacity: 1
    },
    fills: [],
    innerShadows: [],
    shadows: []
  },
  horizontalSpacing: 0,
  scale: 1,
  symbolID: id,
  verticalSpacing: 0,
  overrideValues: [
    {
      _class: "overrideValue",
      overrideName: "EE7F154B-65D4-4B79-9B75-1ECEBC25A1C3_stringValue",
      value: ""
    },
    {
      _class: "overrideValue",
      overrideName: "EE7F154B-65D4-4B79-9B75-1ECEBC25A1C3_layerStyle",
      value: "white-shared-style"
    }
  ]
});

let symbols = [];
let symbolIndex = 0;
let name = "";

const findSymbolName = s => {
  if (!s || s.length < 1) {
    return "No layers";
  }
  s.map(layer => {
    if (layer.layers) {
      findSymbolName(layer.layers);
    }
  });
  if (s[0] && s[0].name && s[0].name.startsWith('/button')) {
    if (s[0].name.includes('button--size-small')) {
      return name = 'Button small';
    }
    return name = 'Button';
  }
  return "Not found";
};

function enhanceJson(json) {
  let enhanced = {};
  let needsEnhance = false;
  let groupRoot = {}
  Object.keys(json).forEach((key, index) => {
    let cleanedGroup = {}
    // if (json._class === 'group' && json.layers && json.layers.length === 1) {
    //   if (json.name === '(t-button)') {
    //     if (json.layers) {
    //       Object.assign(groupRoot, json)
    //       delete groupRoot.layers
    //     }
    //   }
    //   enhanced = {
    //     // ...enhanceJson(json.layers[0]),
    //     ...groupRoot
    //   }

    //   console.log('---------')
    //   console.log(JSON.stringify(enhanced, null, 4))
    //   console.log('---------')
    //   return enhanced
    // }
    if (Array.isArray(json[key])) {
      const arr = json[key];
      if (arr[0] && arr[0]._class === "svg") {
        return (enhanced[key] = [
          ...arr,
          symbolInstance(iconIds[0].name, iconIds[0].id, 18, 18, 0, 0)
        ]);
      }
      return (enhanced[key] = arr.map(nestedKey => enhanceJson(nestedKey)));
    } else {
      // From here we have some new code by TZ
      // Should ungroup symbol layers
      // if (json[key]._class === "group" && json[key].layers.length <= 1){
      //   console.log(" This should have a length of 1 or 0 ",json[key].layers)
      //   console.log(" This should have a length of 1 or 0 ",json[key].layers.length)
      // }


      if (
        key === "name" &&
        json[key] === ("(button)") &&
        json[key] !== "(t-icon)"
      ) {
        // findSymbolName(json.layers);
        symbolIndex += 1;
        needsEnhance = true;
        let symbolName = json[key];
        let symbolLayers = json.layers;
        const id = uuid();

        const preparedSymbolData = {
          ...json,
          layers:
            json.layers && json.layers.map(nestedKey =>
              // console.log(" <><><><>****" ,json.layers[0].layers.length, nestedKey),
              enhanceJson(nestedKey)
            )
        };

        // console.log("Width: ", preparedSymbolData)

        const preparedSymbol = symbolMaster(
          name,
          id,
          [
            {
              ...preparedSymbolData,
              frame: {
                ...preparedSymbolData.frame,
                x: 0,
                y: 0
              }
            }
          ],

           // preparedSymbolData,
        preparedSymbolData.layers
            ? preparedSymbolData.layers[0].frame.height
            : preparedSymbolData.frame.height,
          preparedSymbolData.layers
            ? preparedSymbolData.layers[0].frame.width
            : preparedSymbolData.frame.width,
          600,
          -900 + (symbolIndex - 1) * 100
        );


        //Set (t-button) width to parents witdth to fix Autolayout
        // console.log("***********************************")
        // console.log(preparedSymbolData.layers[0])
        // console.log("-----------------------------------")

        preparedSymbol.layers[0].frame.width = preparedSymbol.frame.width;
        symbols = [...symbols, preparedSymbol];

        if (symbolLayers && symbolLayers.length > 0) {
          const tempInstance = preparedSymbol.createInstance({
            // TODO: CHANGE HARDCODED VALUE
            name: name
          });

          tempInstance.frame = new Rect({
            height: symbolLayers[0].frame.height,

            width: symbolLayers[0].frame.width,
            x: json.frame.x,
            y: json.frame.y
          });

          enhanced = tempInstance;


        //   // if(json.layers.length > 2) {
        //   //   console.log(">>>>>>>><<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<",json.layers.length)
        //   //   (enhanced = tempInstance);
        //   // }
        //
        }
        delete json.layers;
        return;
      }



      if (key === "_class" && json[key] === "rectangle") {
        if (json.path) {
          const parsedBorderRadius = json.path.points.map(
            point => point.cornerRadius
          );
          needsEnhance = true;
          enhanced = {
            ...json,
            ...enhanced,
            points: json.path.points
          };
          delete enhanced.path;
        }
      }



      if (key === "_class" && json[key] === "text") {
        const isLight = tinycolor(json.style.color).isLight();

        const colorWhite = {
          alpha: 1,
          blue: 255,
          green: 255,
          red: 255
        };

        const colorBlack = {
          alpha: 1,
          blue: 0,
          green: 0,
          red: 0
        };

        needsEnhance = true;
        enhanced = {
          ...json,
          ...enhanced,
          ...enhancedTypoStyle(
            json.text,
            json.style.fontSize,
            json.style.fontFamily,
            isLight ? colorWhite : colorBlack
          )
        };
        return
      } else if (needsEnhance === false) {
        enhanced[key] = json[key];
      }
    }
  });
  return enhanced;
}

console.log(`Reading icons sketch file: ${iconsSketchFile}`);
Sketch.fromFile(iconsSketchFile).then(sketchIcons => {
  const pageSymbols = new Page({
    name: "Symbols"
  });

  const pageShared = new Page({
    name: "Shared"
  });

  const pageButton = new Page({
    name: "Button"
  });

  const artboard = new Artboard({
    name: "Button",
    frame: {
      width: json.frame.width,
      height: json.frame.height
    }
  });

  const sharedStyles = [
    new SharedStyle({
      id: "white-shared-style",
      name: "White",
      fills: [{ color: "#fff" }]
    }),
    new SharedStyle({
      id: "black-shared-style",
      name: "Black",
      fills: [{ color: "#f00" }]
    })
  ];
  sharedStyles.map(sharedStyle => sketch.addLayerStyle(sharedStyle));


  iconIds = sketchIcons.pages[0].layers.map(icon => ({
    name: icon.name,
    id: icon.symbolID
  }));

  const updatedIcons = sketchIcons.pages[0].layers
    .map(layer => {
      return new SymbolMaster(layer);
    })
    .forEach(layer => {
      iconMap[layer.name] = layer;
      return pageSymbols.addLayer(layer);
    });

  // TODO: CHANGE HARDCODED VALUES
  let prep = enhanceJson(json).layers[0];
  const {layers, ...prepObj} = prep
  const removed = prep.layers.map((layer) => ({
    ...layer,
    name: 'Button group',
    layers: layer.layers.filter(l => l.name !== '(t-button)').map(layer => ({
      ...layer,
      name: layer.name.startsWith('/html') ? 'Divider' : layer.name
    }))
  }))
  const combined = [{
    ...prepObj,
    layers: removed
  }]
  combined.forEach(layer => artboard.addLayer(layer));

  // console.log(json)

  symbols
    .filter(symbol => symbol.layers)
    .forEach(symbol => pageSymbols.addLayer(symbol));
  pageButton.addArtboard(artboard);
  sketch.addPage(pageButton);
  sketch.addPage(pageSymbols);
  sketch.build("./sketch/telements.sketch").then(() => {
    console.log("Built button sketch document!");
  });
});

// enhanceJson(json)
