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

const {
  Sketch,
  Page,
  Rect,
  Style,
  Artboard,
  Text,
  Bitmap,
  SharedStyle,
  SymbolMaster,
  SymbolInstance,
  Color,
  Fill,
} = require('sketch-constructor');
const fs = require('fs');
const path = require('path');
const directory = 'sketch';
const sketch = new Sketch();
const uuid = require('uuid').v4;
const crypto = require('crypto');
const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');
const rssBuilder = require('./rss-builder');
const config = require('./config');
const colorConvert = require('color');
const { node } = require('webpack');

const documentName = process.argv[2] || 'default';

const serverPath = config.libraryServerPath;

const dbFilename = path.resolve(__dirname, `../sketch/symbol_database.sqlite`);

(async function () {
  function makeStyleKey(style) {
    const borders = (style.borders || [])
      .filter((b) => b.color.alpha > 0)
      .map((border) => {
        return [
          Math.round(border.color.red * 255),
          Math.round(border.color.green * 255),
          Math.round(border.color.blue * 255),
          Math.round(border.color.alpha * 255),
          border.fillType,
          border.position,
          Math.floor(border.thickness * 100),
        ].join(',');
      });
    const fills = (style.fills || [])
      .filter((b) => b.color && b.color.alpha > 0)
      .map((fill) => {
        return [
          Math.round(fill.color.red * 255),
          Math.round(fill.color.green * 255),
          Math.round(fill.color.blue * 255),
          Math.round(fill.color.alpha * 255),
        ].join(',');
      });
    return `borders:${borders.sort().join('|')};fills:${fills
      .sort()
      .join('|')}`;
  }

  function parseCSSColorToRGBA01(cssColorString) {
    const { r, g, b, alpha } = new colorConvert(cssColorString).unitObject();
    return {
      _class: 'color',
      alpha: alpha === undefined ? 1 : alpha,
      blue: b,
      green: g,
      red: r,
    };
  }

  function makeSketchColorSwatch(name, color) {
    name = name.replace(/([a-z]+)(\d+)$/i, '$1 / $2'); // Turn "grey90" into "grey / 90"
    name = name.replace(/\/[^/]*$/, '/ ' + name.replace(/ \/ /g, ' ')); // Turn "background / foo" into "background / background foo"
    name = name.replace(/\b./g, (s) => s.toLocaleUpperCase()); // Turn "link / link active / link active 90" into "Link / Link Active / Link Active 90"
    const swatch = {
      _class: 'swatch',
      do_objectID: uuid(),
      name: name,
      value: color,
    };
    const stableSymbolName = `/// Colors: ${name}`;
    if (symbolNameToIdMap[stableSymbolName]) {
      swatch.do_objectID = symbolNameToIdMap[stableSymbolName].symbolID;
    }
    symbolNameToIdMap[stableSymbolName] = {
      symbolID: swatch.do_objectID,
      changeIdentifier: 0,
    };
    return swatch;
  }

  function parseCSSColorToSketch(sketchColors, path, cssColorString) {
    const colorValue = parseCSSColorToRGBA01(cssColorString);
    const sketchColor = makeSketchColorSwatch(path.join(' / '), colorValue);
    sketchColors.push(sketchColor);
  }

  function parseColors(sketchColors, path, colors) {
    for (const colorName in colors) {
      const colorValue = colors[colorName];
      if (typeof colorValue === 'string') {
        parseCSSColorToSketch(
          sketchColors,
          path.concat([colorName]),
          colorValue
        );
      } else {
        parseColors(sketchColors, path.concat([colorName]), colorValue);
      }
    }
  }

  const documentDB = await sqlite.open({
    filename: dbFilename,
    driver: sqlite3.Database,
  });
  await documentDB.exec(`CREATE TABLE IF NOT EXISTS document (
    document_id TEXT NOT NULL,
    document_name TEXT PRIMARY KEY,
    document_version INTEGER NOT NULL DEFAULT 0
  )`);
  await documentDB.exec(`CREATE TABLE IF NOT EXISTS symbol (
    document_id TEXT NOT NULL,
    symbol_id TEXT NOT NULL,
    symbol_name TEXT NOT NULL,
    symbol_change_id INTEGER NOT NULL,
    UNIQUE (document_id, symbol_id),
    FOREIGN KEY (document_id)
      REFERENCES document (document_id)
        ON DELETE CASCADE
        ON UPDATE NO ACTION
  )`);
  const rows = await documentDB.all('PRAGMA table_info(document)');
  if (!rows.find((r) => r.name === 'document_version')) {
    await documentDB.exec(
      'ALTER TABLE document ADD COLUMN document_version INTEGER NOT NULL DEFAULT 0'
    );
  }
  const documentIDRow = await documentDB.get(
    'SELECT document_id FROM document WHERE document_name = ?',
    [documentName]
  );
  const documentID = documentIDRow && documentIDRow.document_id;
  sketch.document.do_objectID = documentID || sketch.document.do_objectID;
  if (!documentID) {
    await documentDB.run(
      'REPLACE INTO document(document_name, document_id, document_version) VALUES (?, ?, ?)',
      [documentName, sketch.document.do_objectID, 0]
    );
  }
  const symbolIDs = await documentDB.all(
    'SELECT symbol_name, symbol_id, symbol_change_id FROM symbol WHERE document_id = ?',
    [sketch.document.do_objectID]
  );
  const symbolNameToIdMap = {};
  symbolIDs.forEach(({ symbol_name, symbol_id, symbol_change_id }) => {
    symbolNameToIdMap[symbol_name] = {
      symbolID: symbol_id,
      changeIdentifier: parseInt(symbol_change_id),
    };
  });

  if (!fs.existsSync(directory)) {
    console.log(`generating directory: ${directory}`);
    fs.mkdirSync(`${process.cwd()}/${directory}`, { recursive: true });
  }

  const symbolNames = {};
  function getSymbolName(name) {
    if (symbolNames[name]) {
      let i = 2;
      let newName = name + '-' + i;
      while (symbolNames[newName]) {
        ++i;
        newName = name + '-' + i;
      }
      name = newName;
    }
    symbolNames[name] = true;
    return name;
  }

  const symbolMaster = (args) => {
    const { name, id, layers, height, width, x, y } = args;
    const symbol = new SymbolMaster({
      id,
      name,
      frame: {
        x,
        y,
        width,
        height,
      },
      ...args,
    });
    config.setSymbolResizing(symbol);

    return symbol;
  };

  function positionString(position) {
    if (position === 0) {
      return 'inside';
    } else if (position === 1) {
      return 'center';
    } else if (position === 2) {
      return 'outside';
    } else {
      return '';
    }
  }

  function hex(num) {
    const s = num.toString(16);
    return (s.length < 2 ? `0${s}` : s).toLocaleUpperCase();
  }

  function colorString(fillOrBorder) {
    if (!fillOrBorder.color) {
      if (fillOrBorder.image) return 'image';
      return 'default';
    }
    const { red, green, blue, alpha } = fillOrBorder.color;
    return `#${hex(Math.floor(red * 255.999))}${hex(
      Math.floor(green * 255.999)
    )}${hex(Math.floor(blue * 255.999))}${
      alpha < 1 ? ' opacity ' + Math.floor(alpha * 1000) / 1000 : ''
    }`;
  }

  function makeStyleName(override) {
    var styleName = '';
    if (override.borders)
      override.borders = override.borders.filter((b) => b.color.alpha > 0);
    if (override.fills)
      override.fills = override.fills.filter((b) => b.color.alpha > 0);
    if (override.fills && override.fills.length > 0) {
      styleName +=
        'Fill ' + override.fills.map((b) => `${colorString(b)}`).join(', ');
    }
    if (override.borders && override.borders.length > 0) {
      if (override.fills) {
        styleName += ' / ';
      }
      styleName +=
        'Border ' +
        override.borders
          .map(
            (b) =>
              `${Math.floor(100 * b.thickness) / 100}px ${positionString(
                b.position
              )} ${colorString(b)}`
          )
          .join(', ');
    } else if (override.fills && override.fills.length > 0) {
    }
    return styleName || 'Transparent';
  }

  const styleMap = new Map();
  const styleObjects = new Map();
  function createSymbolOverrides(
    node,
    symbolMaster = node,
    iconInstance = node
  ) {
    if (node.name === 'Icon') {
      iconInstance = node;
      symbolMaster.overrideProperties.push({
        _class: 'MSImmutableOverrideProperty',
        canOverride: false,
        overrideName: `${iconInstance.do_objectID}_fillColor`,
      });
    }
    node.layers?.forEach((nestedJson) =>
      createSymbolOverrides(nestedJson, symbolMaster, iconInstance)
    );
  }

  function findFillColor(node) {
    if (node instanceof Array) {
      for (var i = 0; i < node.length; i++) {
        var c = findFillColor(node[i]);
        if (c) return c;
      }
    } else if (typeof node === 'object') {
      if (node.fills && node.fills[0] && node.fills[0].color)
        return node.fills[0].color;
      for (var k in node) {
        var c = findFillColor(node[k]);
        if (c) return c;
      }
    }
  }

  function extractIconFillOverrides(node, overrides = []) {
    if (node instanceof Array) {
      for (var i = 0; i < node.length; i++) {
        extractIconFillOverrides(node[i], overrides);
      }
    } else if (typeof node === 'object') {
      if (node.overrideValues && node.name.startsWith('Icon')) {
        overrides.push(...node.overrideValues);
        node.overrideValues = [];
      }
      for (var k in node) {
        extractIconFillOverrides(node[k], overrides);
      }
    }
    return overrides;
  }

  // Set instance frame size and overrides
  function fillInstance(
    instance,
    masterNode,
    instanceNode,
    overrideValues,
    objectID = '',
    symbolMaster = masterNode,
    iconInstance = null
  ) {
    if (symbolMaster.name.startsWith('Icon')) {
      const overrideValue = {
        _class: 'overrideValue',
        overrideName: `${instance.do_objectID}_fillColor`,
        value: findFillColor(instanceNode),
      };
      overrideValues.push(overrideValue);
      instance.style = new Style({ fills: [new Fill({ color: new Color() })] });
      instance.style.fills[0].color = overrideValue.value;
    }
  }

  function replaceSystemFonts(json) {
    const keys = Object.keys(json);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const jsonValue = json[key];
      if (Array.isArray(jsonValue)) {
        jsonValue.forEach(replaceSystemFonts);
      } else if (typeof jsonValue === 'string') {
        if (key === 'name') {
          json[key] = config.fontReplacer(jsonValue) || json[key];
        }
      } else if (typeof jsonValue === 'object') {
        replaceSystemFonts(jsonValue);
      }
    }
  }

  const symbols = new Map();
  const iconMap = new Map();

  function enhanceJson(json, overrideValues = { v: [] }) {
    //if (json.name?.match(/Dropdown.*Disabled/)) debugger;
    let enhanced = {};
    const keys = Object.keys(json);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const value = json[key];
      if (Array.isArray(value)) {
        enhanced[key] = value.map((nestedJson) => enhanceJson(nestedJson));
      } else if (key === 'image') {
        const fileName = crypto
          .createHash('sha1')
          .update(value.url)
          .digest('hex');
        enhanced[key] = new Bitmap({
          filePath: path.resolve(__dirname, `../sketch-json/${fileName}`),
        }).image;
      } else if (typeof value === 'object') {
        enhanced[key] = enhanceJson(value);
      } else {
        enhanced[key] = value;
      }
    }
    /*
      Handle symbol creation and instancing
    */
    if (enhanced['_class'] === 'group' && enhanced.isSymbol === true) {
      // Find all symbols with the same name.
      let symbolArray = symbols.get(enhanced.name);
      if (!symbolArray) {
        symbolArray = [];
        symbols.set(enhanced.name, symbolArray);
      }
      // Try to create a symbol instance.
      // If the symbol is too different, we create a master symbol instead below.
      let instance;
      const isIcon = enhanced.name.startsWith('X / icon-');
      let iconName = enhanced.name;
      if (isIcon) {
        // Turn 'X / icon-navigation-collapse-down' into 'Icon / Navigation / Collapse Down / 01 Standard'
        iconName = enhanced.name.replace(
          /^X \/ icon-([^-]+)-(([^-]+-?)+)$/,
          (_, category, name) =>
            `Icon / ${category
              .replace(/-|_/g, ' ')
              .replace(/\b./g, (m) => m.toLocaleUpperCase())} / ${name
              .replace(/-/g, ' ')
              .replace(/\b./g, (m) => m.toLocaleUpperCase())} / ${
              /\/ selected:(true| \/|$)/.test(enhanced.variant)
                ? '02 Selected'
                : '01 Standard'
            }`
        );
      }
      let symbol = false;
      if (isIcon && iconMap.has(iconName)) {
        symbol = true;
        const master = iconMap.get(iconName);
        instance = master.createInstance({ name: 'Icon' });
        instance.frame = new Rect(enhanced.frame);
        instance.style = new Style(enhanced.style);
        instance.rotation = enhanced.rotation;
        // isSymbolInstanceOf(instance, master, enhanced, '', master.name);
        instance.overrideValues = [];
        fillInstance(instance, master, enhanced, instance.overrideValues);
      }

      // Couldn't create a symbol instance, let's create a new master instead.
      if (!symbol) {
        symbol = symbolMaster({
          ...enhanced,
          name: getSymbolName(enhanced.name),
        });
        if (enhanced.name.startsWith('Icon /'))
          iconMap.set(symbol.name, symbol);
        symbol.stableSymbolName = enhanced.stableSymbolName || symbol.name;
        symbol.variant = enhanced.variant;
        symbol.variantName = uuid();
        if (symbolNameToIdMap[symbol.stableSymbolName]) {
          // console.log("Reusing symbol ID:", symbol.stableSymbolName, '-', symbol.name, "-", symbolNameToIdMap[symbol.stableSymbolName].symbolID, "-", symbolNameToIdMap[symbol.stableSymbolName].changeIdentifier);
          symbol.symbolID = symbolNameToIdMap[symbol.stableSymbolName].symbolID;
          symbol.changeIdentifier =
            (symbolNameToIdMap[symbol.stableSymbolName].changeIdentifier || 0) +
            1;
        } else {
          // console.log("Creating symbol ID:", symbol.stableSymbolName, symbol.changeIdentifier || 0);
        }
        symbolNameToIdMap[symbol.stableSymbolName] = {
          symbolID: symbol.symbolID,
          changeIdentifier: symbol.changeIdentifier || 0,
        };
        if (symbolArray.length == 1)
          symbolArray[0].name += ' / ' + symbolArray[0].variant;
        if (symbolArray.length > 0) symbol.name += ' / ' + symbol.variant;
        symbol.resizesContent = true;
        createSymbolOverrides(symbol);
        const symbolShouldHaveOverrides = !/(Sidebar.*Example)/.test(
          symbol.name
        );
        symbol.allowsOverrides = symbolShouldHaveOverrides;
        symbolArray.push(symbol);
        instance = symbol.createInstance({ name: symbol.name });
        instance.frame = new Rect(enhanced.frame);
        instance.style = new Style(enhanced.style);
        instance.rotation = enhanced.rotation;
        instance.overrideValues = [];
        fillInstance(instance, symbol, enhanced, instance.overrideValues);
        instance.overrideValues.push(...extractIconFillOverrides(enhanced));
      }
      if (/^((X \/ icon))/.test(symbol.name)) {
        instance.name = 'Icon';
      }
      return instance;
    }
    return enhanced;
  }

  function simplifyTree(node, parent) {
    if (node.layers) {
      var minX, minY, maxX, maxY;
      minX = minY = Infinity;
      maxX = maxY = -Infinity;
      if (node.frame.width === 0 || node.frame.height === 0) {
        node.frame.x = node.frame.y = node.frame.width = node.frame.height = 0;
      }
      var hadALayer = false;
      node.layers.forEach((l) => {
        simplifyTree(l, node);
        if (l.frame) {
          hadALayer = true;
          if (l.frame.x < minX) minX = l.frame.x;
          if (l.frame.x + l.frame.width > maxX)
            maxX = l.frame.x + l.frame.width;
          if (l.frame.y < minY) minY = l.frame.y;
          if (l.frame.y + l.frame.height > maxY)
            maxY = l.frame.y + l.frame.height;
        }
      });
      if (
        (node.name === 'div' || node.layers.length === 1) &&
        parent &&
        !node.isSymbol &&
        !(node.layers[0] && node.layers[0].name === 'Background') &&
        node.rotation === 0
      ) {
        const idx = parent.layers.indexOf(node);
        parent.layers = parent.layers
          .slice(0, idx)
          .concat(node.layers)
          .concat(parent.layers.slice(idx + 1));
        node.layers.forEach((l) => {
          if (l.frame) {
            l.frame.x += node.frame.x;
            l.frame.y += node.frame.y;
          }
        });
      } else {
        if (hadALayer && (minX !== 0 || minY !== 0)) {
          node.frame.x += minX;
          node.frame.y += minY;
          node.frame.width = maxX - minX;
          node.frame.height = maxY - minY;
          node.layers.forEach((l) => {
            if (l.frame) {
              l.frame.x -= minX;
              l.frame.y -= minY;
            }
          });
        }
      }
    }
    // if (node.frame) {
    //   if (node.frame.x < 0 || node.frame.y < 0)  {
    //     parent.frame.x += node.frame.x;
    //     parent.frame.y += node.frame.y;
    //     parent.layers.forEach(l => {
    //       if (l !== node && l.frame) {
    //         l.frame.x -= node.frame.x;
    //         l.frame.y -= node.frame.y;
    //       }
    //     });
    //     node.frame.x = 0;
    //     node.frame.y = 0;
    //   }
    // }
  }

  const symbolsPage = new Page({
    name: 'Symbols',
  });

  sketch.addPage(symbolsPage);

  const symbolGutter = 32;
  let currentSymbolYCoordinate = 0;

  const sketchColors = [];

  function replaceValue(obj, oldValue, newValue) {
    if (typeof obj === 'object') {
      for (var i in obj) {
        if (typeof obj[i] === 'object' || obj[i] instanceof Array) {
          replaceValue(obj[i], oldValue, newValue);
        } else if (obj[i] === oldValue) {
          obj[i] = newValue;
        }
      }
    } else if (obj[i] instanceof Array) {
      obj[i].forEach((v) => replaceValue(v, oldValue, newValue));
    }
  }

  var includes = fs.readdirSync(`./includes`);
  for (const includeFile of includes) {
    if (/\.sketch$/i.test(includeFile)) {
      var doc = await Sketch.fromFile(`./includes/${includeFile}`);
      // Copy foreign references over
      sketch.document.foreignLayerStyles =
        sketch.document.foreignLayerStyles.concat(
          doc.document.foreignLayerStyles
        );
      sketch.document.foreignSwatches = (
        sketch.document.foreignSwatches || []
      ).concat(doc.document.foreignSwatches);
      sketch.document.foreignSymbols = (
        sketch.document.foreignSymbols || []
      ).concat(doc.document.foreignSymbols);
      sketch.document.foreignTextStyles = (
        sketch.document.foreignTextStyles || []
      ).concat(doc.document.foreignTextStyles);
      sketch.document.layerStyles.objects =
        sketch.document.layerStyles.objects.concat(
          doc.document.layerStyles.objects
        );
      sketch.document.layerTextStyles.objects =
        sketch.document.layerTextStyles.objects.concat(
          doc.document.layerTextStyles.objects
        );
      sketch.document.layerStyles.objects.forEach((style) => {
        const styleKey = makeStyleKey(style.value);
        replaceValue(doc, style.do_objectID, styleKey);
        styleMap.set(styleKey, style.do_objectID);
        styleObjects.set(styleKey, style.value);
      });
      // Copy pages over
      doc.pages.forEach((page) => {
        if (page.name === 'Symbols') {
          for (const symbol of page.layers) {
            symbol.frame.x = 0;
            symbol.frame.y = currentSymbolYCoordinate;
            currentSymbolYCoordinate += symbolGutter + symbol.frame.height;
            symbolsPage.addLayer(symbol);
          }
        } else {
          sketch.addPage(page);
        }
      });
    }
  }

  const designTokens = await import(
    '@telekom/scale-design-tokens/dist/design-tokens-telekom.js'
  );
  parseColors(sketchColors, [], designTokens.color);

  // Add color swatches
  sketch.document.sharedSwatches = {
    _class: 'swatchContainer',
    do_objectID: 'C33E0022-6453-41F9-B5AF-F0B0F144B939',
    objects: sketchColors,
  };
  sketch.document.documentState = { _class: 'documentState' };
  sketch.document.layerSymbols.do_objectID = uuid();

  const jsons = fs
    .readdirSync(path.resolve(__dirname, '../sketch-json'))
    .filter((fn) => fn.endsWith('.json'));
  const pageObjs = jsons.map((jsonFn) => require(`../sketch-json/${jsonFn}`));
  pageObjs.sort((a, b) => {
    if (a.name === 'Icons') return -1;
    if (b.name === 'Icons') return 1;
    return a.name.localeCompare(b.name);
  });
  pageObjs.forEach((json) => {
    const componentsPage = new Page({
      name: json.name,
    });

    json.artboards.forEach((artboard, index) => {
      replaceSystemFonts(artboard);
      simplifyTree(artboard);
      const enhanced = enhanceJson(artboard);

      const artboardComponents = new Artboard({
        name: artboard.name,
        frame: {
          x: artboard.frame.x,
          y: artboard.frame.y,
          width: artboard.frame.width,
          height: artboard.frame.height,
        },
      });

      enhanced.layers.forEach((layer) => artboardComponents.addLayer(layer));
      componentsPage.addArtboard(artboardComponents);

      // fs.writeFileSync(`./debug_${index}.json`, JSON.stringify(enhanced, null, 4))
    });

    sketch.addPage(componentsPage);
  });

  for (const symbolArray of symbols.values()) {
    symbolArray.forEach((symbol) => {
      symbol.frame.x = 0;
      symbol.frame.y = currentSymbolYCoordinate;
      currentSymbolYCoordinate += symbolGutter + symbol.frame.height;
      symbolsPage.addLayer(symbol);
    });
  }

  // Sort pages by name, Symbols on top.
  const sortedPages = Object.entries(sketch.meta.pagesAndArtboards).sort(
    (a, b) => {
      if (a[1].name === 'Symbols') return -1;
      if (b[1].name === 'Symbols') return 1;
      return a[1].name.localeCompare(b[1].name);
    }
  );
  sketch.meta.pagesAndArtboards = Object.fromEntries(sortedPages);
  sketch.document.pages = sortedPages.map(([oid, _]) => ({
    _class: 'MSJSONFileReference',
    _ref_class: 'MSImmutablePage',
    _ref: `pages/${oid}`,
  }));

  // Upgrade document version to allow color swatches.
  sketch.meta.commit = '238f363ed3de77eb1d86e03176f8a10f7928ed51';
  sketch.meta.version = 134;
  sketch.meta.compatibilityVersion = 99;
  sketch.meta.appVersion = '69';

  sketch.meta.created.commit = '238f363ed3de77eb1d86e03176f8a10f7928ed51';
  sketch.meta.created.version = 134;
  sketch.meta.created.compatibilityVersion = 99;
  sketch.meta.created.appVersion = '69';

  // Update Symbol IDs
  const queries = [];
  for (const symbolName in symbolNameToIdMap) {
    const s = symbolNameToIdMap[symbolName];
    queries.push(
      documentDB.run(
        'REPLACE INTO symbol(symbol_id, symbol_name, symbol_change_id, document_id) VALUES (?, ?, ?, ?)',
        [
          s.symbolID,
          symbolName,
          s.changeIdentifier,
          sketch.document.do_objectID,
        ]
      )
    );
  }
  await Promise.all(queries);
  let version = (
    await documentDB.get(
      'SELECT document_version FROM document WHERE document_id = ?',
      [sketch.document.do_objectID]
    )
  ).document_version;
  console.log(`Old document version`, version);
  version++;
  console.log(`New document version`, version);
  await documentDB.run(
    'UPDATE document SET document_version = ? WHERE document_id = ?',
    [version, sketch.document.do_objectID]
  );

  var versionSymbol = new SymbolMaster({
    id: `${documentName}-version-master`,
    symbolID: `${documentName}-version`,
    name: 'Z Build Version',
  });
  versionSymbol.frame.x = 0;
  versionSymbol.frame.y = currentSymbolYCoordinate;
  versionSymbol.frame.width = 300;
  versionSymbol.frame.height = 40;
  versionSymbol.addLayer(
    new Text({
      string: `${documentName} - version ${version}, built on ${new Date().toLocaleString()}`,
      name: 'Version',
      fontSize: 24,
      color: '#404040',
    })
  );
  symbolsPage.addLayer(versionSymbol);

  if (fs.existsSync(`./${documentName}.png`)) {
    Sketch.addPreview(`./${documentName}.png`);
  }

  const symbolJSON = JSON.stringify(symbolsPage, null, 2);
  fs.writeFileSync(
    `./sketch/${documentName}.${version}.symbols.json`,
    symbolJSON
  );

  sketch.build(`./sketch/${documentName}.sketch`, 9).then(() => {
    console.log(`Built ./sketch/${documentName}.sketch`);
  });

  rssBuilder.build(`./sketch/${documentName}.xml`, {
    title: config.libraryTitle,
    description: config.libraryDescription,
    url: `${serverPath}${documentName}.sketch`,
    version: version,
  });
  console.log(`Built ./sketch/${documentName}.xml`);
})();
