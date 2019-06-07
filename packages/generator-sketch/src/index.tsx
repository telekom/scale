import { Sketch, Page, Artboard, Text, Rectangle } from 'sketch-constructor';
import * as sketchJson from 'sketch-json';
import * as fs from 'fs';

const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
const buildFolder = './build';

const newSketch = new Sketch({});
const pageWelcome = new Page({
  name: 'Welcome'
});

let yPos = 0;

const addYPos = (value: number = 0) => {
  return yPos = yPos + value;
}

const textVersion = new Text({
  string: `Version: ${pkg.version}`,
  name: `Version: ${pkg.version}`,
  fontSize: 16,
  color: "#777",
  frame: {
    x: 1058,
    y: 120,
  }
});

const textTelements = new Text({
  string: "Telements",
  name: "Telements",
  fontSize: 24,
  color: "#333",
  frame: {
    x: 120,
    y: addYPos(120),
  }
});

const textGeneratedFile = new Text({
  string: "Generated file",
  name: "Generated file",
  fontSize: 16,
  color: "#777",
  frame: {
    x: 120,
    y: addYPos(40),
  }
});

const rectangleDivider = new Rectangle({
  name: "divider",
  style: {
    fills: [
      { color: '#dfdfdf' }
    ],
  },
  width: 100,
  height: 2,
  x: 120,
  y: addYPos(40),
});

const textComponents = new Text({
  string: "Components:",
  name: "Components",
  fontSize: 16,
  color: "#777",
  frame: {
    height: 20,
    x: 120,
    y: addYPos(40),
  }
})

const textAlert = new Text({
  string: "Alert",
  name: "Alert",
  fontSize: 16,
  color: "#777",
  frame: {
    height: 20,
    x: 120,
    y: addYPos(40),
  }
});

const rectangleAlertBackground = new Rectangle({
  name: "Alert Background",
  style: {
    fills: [
      { color: '#ddd' }
    ],
  },
  width: 800,
  height: 60,
  x: 120,
  y: addYPos(40),
});

const textButton = new Text({
  string: "Button",
  name: "Button",
  fontSize: 16,
  color: "#777",
  frame: {
    height: 20,
    x: 120,
    y: addYPos(100),
  }
});

const rectangleButton = new Rectangle({
  name: "Button Background",
  style: {
    fills: [
      { color: '#ddd' }
    ],
  },
  width: 120,
  height: 36,
  x: 120,
  y: addYPos(40),
})

const textCard = new Text({
  string: "Card",
  name: "Card",
  fontSize: 16,
  color: "#777",
  frame: {
    height: 20,
    x: 120,
    y: addYPos(76),
  }
})

const rectangleCard = new Rectangle({
  name: "Card Background",
  style: {
    fills: [
      { color: '#ddd' }
    ],
  },
  width: 320,
  height: 400,
  x: 120,
  y: addYPos(40),
})

const artboardFrame = {
  width: 1280,
  height: addYPos(520),
  x: 0,
  y: 0
}

const artboard = new Artboard({
  name: 'Telements',
  layers: [
    textVersion,
    textTelements,
    textGeneratedFile,
    rectangleDivider,
    textComponents,
    textAlert,
    rectangleAlertBackground,
    textButton,
    rectangleButton,
    textCard,
    rectangleCard,
  ],
  frame: artboardFrame,
});

pageWelcome.addArtboard(artboard);
newSketch.addPage(pageWelcome);

// Creates the sketch file
if (!fs.existsSync(buildFolder)) {
  fs.mkdirSync(buildFolder);
}

newSketch.build(`${buildFolder}/telements.sketch`);

// Convert all sketch files in the repo to json
sketchJson.toJson().then(() => console.log('Done!'))
