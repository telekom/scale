const {
  Sketch,
  Page,
  Rect,
  Style,
  Artboard,
  Bitmap,
  SharedStyle,
  SymbolMaster,
  SymbolInstance,
} = require("sketch-constructor");
const fs = require("fs");
const path = require("path");
const json = require("../sketch-json/asketch.json");
const directory = "sketch";
const sketch = new Sketch();
const uuid = require("uuid").v4;
const crypto = require('crypto');

if (!fs.existsSync(directory)) {
  console.log(`generating directory: ${directory}`);
  fs.mkdirSync(`${process.cwd()}/${directory}`, { recursive: true });
}

const symbolMaster = (args) => {
  const {name, id, layers, height, width, x, y} = args
  const symbol = new SymbolMaster({
    id,
    name,
    frame: {
      x,
      y,
      width,
      height
    },
    ...args
  });
  // symbol.groupLayout = {
  //   _class: "MSImmutableInferredGroupLayout",
  //   axis: 0,
  //   layoutAnchor: 0,
  //   maxSize: 0,
  //   minSize: 0
  // }
  return symbol;
};

const excludeKeys = new Set(['_class', 'frame', 'contextSettings', 'attributedString', 'style', 'do_objectID', 'name', 'text']);
// Set instance frame size and overrides
function fillInstance(instance, symbol, json, objectID = '', symbolName, variantName) {
  const keys = Object.keys(json);
  for (let i = 0 ; i < keys.length; i++) {
    const key = keys[i];
    const symbolValue = symbol[key];
    const jsonValue = json[key];
    if (key === 'do_objectID') {
      objectID = symbolValue;
    }
    if (Array.isArray(jsonValue)) {
      jsonValue.forEach((nestedJson, i) => fillInstance(instance, symbolValue[i], nestedJson, objectID, symbolName, variantName));
    } else if (!excludeKeys.has(key) && typeof symbolValue === 'string' && symbolValue !== jsonValue) {
      console.log(instance.name, instance.do_objectID, '-- override', key, ':',  symbolValue, '=>', jsonValue);
      const overrideValue = {
        "_class": "overrideValue",
        "overrideName": `${objectID}_${key}Value`,
        "value": jsonValue
      };
      instance.overrideValues.push(overrideValue);
    } else if (typeof symbolValue === 'object') {
      // If we're in style, do fill, borders and textStyle comparisons
      // If they differ, create a new SharedStyle and assign it to the symbol instance.
      if (key === 'style') {
        let differs = false;
        let textDiffers = false;
        const override = {};
        const textOverride = {};
        if (JSON.stringify(symbolValue.borders) !== JSON.stringify(jsonValue.borders)) {
          differs = true;
          override.borders = jsonValue.borders;
        }
        if (JSON.stringify(symbolValue.fills) !== JSON.stringify(jsonValue.fills)) {
          differs = true;
          override.fills = jsonValue.fills;
        }
        if (JSON.stringify(symbolValue.textStyle) !== JSON.stringify(jsonValue.textStyle)) {
          textDiffers = true;
          textOverride.textStyle = jsonValue.textStyle;
        }
        if (differs) {
          console.log('style override', JSON.stringify(override, null, 4));
          if (!symbol.sharedStyleID) {
            // Make a shared style for the SymbolMaster
            const sharedStyle = new SharedStyle(null, {
              name: `Master`,
              do_objectID: uuid(),
              _class: 'sharedStyle',
              value: symbolValue
            });
            sketch.addLayerStyle(sharedStyle);
            symbol.sharedStyleID = sharedStyle.do_objectID;
          }
          const sharedStyle = new SharedStyle(null, {
            name: `${variantName}`,
            do_objectID: uuid(),
            _class: 'sharedStyle',
            value: jsonValue
          });
          sketch.addLayerStyle(sharedStyle);
          const overrideValue = {
            "_class": "overrideValue",
            "overrideName": `${objectID}_layerStyle`,
            "value": sharedStyle.do_objectID
          };
          instance.overrideValues.push(overrideValue);
        }
        if (textDiffers) {
          console.log('textStyle override', JSON.stringify(textOverride, null, 4));
          if (!symbol.sharedStyleID) {
            // Make a shared style for the SymbolMaster
            const sharedStyle = new SharedStyle(null, {
              name: `Master`,
              do_objectID: uuid(),
              _class: 'sharedStyle',
              value: symbolValue
            });
            sketch.addTextStyle(sharedStyle);
            symbol.sharedStyleID = sharedStyle.do_objectID;
          }
          const sharedStyle = new SharedStyle(null, {
            name: `${variantName}`,
            do_objectID: uuid(),
            _class: 'sharedStyle',
            value: jsonValue
          });
          sketch.addTextStyle(sharedStyle);
          const overrideValue = {
            "_class": "overrideValue",
            "overrideName": `${objectID}_textStyle`,
            "value": sharedStyle.do_objectID
          };
          instance.overrideValues.push(overrideValue);
        }
        if (differs || textDiffers) {
          continue;
        }
      }
      fillInstance(instance, symbolValue, jsonValue, objectID, symbolName, variantName);
    }
  }
}

const symbols = new Map();

function enhanceJson(json) {
  let enhanced = {};
  const keys = Object.keys(json);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const value = json[key];
    if (Array.isArray(value)) {
      enhanced[key] = value.map(nestedJson => enhanceJson(nestedJson))
    } else if (key === '_class' && value === 'group' && json.isSymbol === true) {
      let symbol = symbols.get(json.name);
      if (!symbol) {
        const args = {...json};
        symbol = symbolMaster(args);
        symbols.set(json.name, symbol);
        symbol.resizesContent = true;
        symbol.groupLayout = {
          "_class": "MSImmutableInferredGroupLayout",
          "axis": 0,
          "layoutAnchor": 0,
          "maxSize": 0,
          "minSize": 0
        };
      }
      const instance = symbol.createInstance({name: json.name});
      instance.frame = new Rect(json.frame);
      instance.style = new Style(json.style);
      fillInstance(instance, symbol, json, '', json.name, json.variant || uuid());
      return instance;
    } else if (key === 'image') {
      const fileName = crypto
                    .createHash('sha1')
                    .update(value.url)
                    .digest('hex');
      enhanced[key] = new Bitmap({filePath: path.resolve(__dirname, `../sketch-json/${fileName}`)}).image;
    } else if (typeof value === 'object') {
      enhanced[key] = enhanceJson(value);
    } else {
      enhanced[key] = value
    }
  }
  return enhanced;
}

const symbolsPage = new Page({
  name: "Symbols"
});

const componentsPage = new Page({
  name: "Components"
});

const artboardComponents = new Artboard({
  name: "Components",
  frame: {
    width: json.frame.width,
    height: json.frame.height
  }
});

const enhanced = enhanceJson(json);
fs.writeFileSync('./debug.json', JSON.stringify(enhanced, null, 4))

enhanced.layers.forEach(layer => artboardComponents.addLayer(layer));
const gutter = 32;
let y = 0;
for (const symbol of symbols.values()) {
  symbol.frame.x = 0;
  symbol.frame.y = y;
  y += gutter + symbol.frame.height;
  symbolsPage.addLayer(symbol);
}

componentsPage.addArtboard(artboardComponents);
sketch.addPage(symbolsPage);
sketch.addPage(componentsPage);
sketch.build("./sketch/scale.sketch").then(() => {
  console.log("Built components sketch document!");
});
