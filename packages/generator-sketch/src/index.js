const {
  Sketch,
  Page,
  Artboard,
  SharedStyle
} = require("sketch-constructor");
const fs = require("fs");
const json = require("../sketch-json/button.json");
const directory = "sketch";
const sketch = new Sketch();

if (!fs.existsSync(directory)) {
  console.log(`generating directory: ${directory}`);
  fs.mkdirSync(`${process.cwd()}/${directory}`, { recursive: true });
}

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

json.layers.forEach(layer => artboard.addLayer(layer));

pageButton.addArtboard(artboard);
sketch.addPage(pageSymbols);
sketch.addPage(pageButton);
sketch.build("./sketch/telements.sketch").then(() => {
  console.log("Built button sketch document!");
});
