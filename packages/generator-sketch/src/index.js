const {
  Sketch,
  Page,
  Rect,
  Artboard,
  SharedStyle,
  SymbolMaster,
  SymbolInstance,
} = require("sketch-constructor");
const fs = require("fs");
const json = require("../sketch-json/asketch.json");
const directory = "sketch";
const sketch = new Sketch();
const uuid = require("uuid").v4;

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
  return symbol
};

const symbols = []

function enhanceJson(json) {
  let enhanced = {};
  Object.keys(json).forEach((key) => {
    if (Array.isArray(json[key])) {
      enhanced[key] = json[key].map(nestedJson => enhanceJson(nestedJson))
    } else {
      if (key === '_class' && json[key] === 'group' && json.isSymbol === true) {
        const symbolExists = symbols.filter(s => s.name === json.name)[0]
        const symbol = symbolExists ? symbolExists : symbolMaster({...json, id: uuid()})
        !symbolExists && symbols.push(symbol)
        return enhanced = symbol.createInstance({name: json.name});
      }
      return enhanced[key] = json[key]
    }
  })
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

fs.writeFileSync('./debug.json', JSON.stringify(enhanceJson(json), null, 4))

enhanceJson(json).layers.forEach(layer => artboardComponents.addLayer(layer));
symbols.forEach(symbol => symbolsPage.addLayer(symbol));

componentsPage.addArtboard(artboardComponents);
sketch.addPage(symbolsPage);
sketch.addPage(componentsPage);
sketch.build("./sketch/telements.sketch").then(() => {
  console.log("Built components sketch document!");
});
