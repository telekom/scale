const {
  Sketch,
  Page,
  Artboard,
  SharedStyle
} = require("sketch-constructor");
const fs = require("fs");
const json = require("../sketch-json/asketch.json");
const directory = "sketch";
const sketch = new Sketch();

if (!fs.existsSync(directory)) {
  console.log(`generating directory: ${directory}`);
  fs.mkdirSync(`${process.cwd()}/${directory}`, { recursive: true });
}

const components = new Page({
  name: "Components"
});

const artboard = new Artboard({
  name: "Components",
  frame: {
    width: json.frame.width,
    height: json.frame.height
  }
});

json.layers.forEach(layer => artboard.addLayer(layer));

components.addArtboard(artboard);
sketch.addPage(components);
sketch.build("./sketch/telements.sketch").then(() => {
  console.log("Built components sketch document!");
});
