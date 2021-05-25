# Generator-sketch

Generator-sketch and html-to-sketch convert HTML pages to Sketch documents.

## Usage

```bash
yarn          # install deps
yarn build    # build the library
yarn build-scale # build the scale-components-telekom.sketch file

# Custom build
yarn sketch my-document-name [URLs to HTML documents to use as pages]
# ... lots of output ...

open sketch/my-document-name.sketch  # open the generated document
```

The page names of the document are driven by the `<title>` elements of the source HTML pages.

Artboards are defined in the HTML using the `data-sketch-artboard` attribute. If you don't define an artboard in your document, the document `<body>` is used as the default artboard, using the same name as the page title.

Symbol names are defined in the HTML pages through the `data-sketch-symbol` attribute.

If you generate a document with the same name, the document ID and the symbol IDs for the symbol names are kept stable. This allows you to use the document as a Sketch library. Sketch detects the changes to the library document and prompts you to replace your existing symbols with the new versions. The symbol IDs are stored in the `sketch/symbol_database.sqlite` SQLite database.

Divs with only one child and no special name are collapsed into their parent element. This is used to make Sketch documents that have a flatter structure and are easier to work with. If you don't like this behaviour, it can be commented out in `src/index.js` function `simplifyTree`.

By default -system-ui and -apple-system fonts are replaced with Helvetica. You can configure this by editing `src/config.js` function `fontReplacer`.

### Example HTML

If this html is in the file `http://localhost:5005/index.html` and you do `yarn sketch my-doc http://localhost:5005/index.html`, you'll generate the Sketch file `sketch/my-doc.sketch` that has a `Symbols` page with two symbols on it, named `Symbol Number Banana` and `Symbol Number Kumquat`. The document should also have a page titled `My Sketch Page` that has one artboard named `My Artboard` that has instances of the two symbols on it.

```html
<html>
  <head>
    <title>My Sketch Page</title>
  </head>
  <body>
    <div data-sketch-artboard="My Artboard">
      <div data-sketch-symbol="Symbol Number Banana">Hello</div>
      <div data-sketch-symbol="Symbol Number Kumquat">Sketch</div>
    </div>
  </body>
</html>
```

## Development workflow

The `generator-sketch` program is composed of two passes. The first one (inject pass) is in `src/inject.js` and uses Puppeteer to run `../html-to-sketch` on a web page, applying pseudo-class states, and generating Sketch-structured JSON files in `./sketch-json/`. The second pass (compilation pass) is in `src/index.js` and converts the JSON into a Sketch file.

The inject script tags components as Sketch symbols and auto-generates names for the layers. The compilation script takes the JSON and generates the required symbols and shared styles, keeping track of the symbols and assigning them unique persistent ids (these are stored in the `scale-components-sketch.sqlite` database).

### Create / edit generated components in scale-components-telekom.sketch

The `scale-components-telekom` Sketch document is generated from the `../components-sketch` template. Links in `components-sketch/views/index.hbs` are turned into pages in the Sketch document. To add a new component, create a new file in `components-sketch/views`, then link to it from the `index.hbs` file. See the existing component `hbs` templates for guidance on how to write your file.

To generate unique keys for the components in your file use the `generate_sketch_keys.rb` command in the `components-sketch` directory. For example, if you have the file `foo.hbs` with `&lt;scale-foo>` components inside it, you'd run `ruby generate_sketch_keys.rb views/foo.hbs scale-foo`.

### Debug HTML parsing

Run the inject script with the `--debug` flag. Note that the HTML parsing is mostly in `html-to-sketch`, so you want to rebuild that first.
E.g. if you have issues with the Accordion, you would run

```sh
(cd ../html-to-sketch && yarn build) && yarn build  && node src/inject.js --debug http://localhost:5005/accordion
```

You can inspect the generated JSON in `sketch-json/`.

### Debug Sketch compilation

Edit src/index.js and run

```
node src/index.js document-name
```

Then open `sketch/document-name.sketch`.

### Debug end-to-end HTML -> .sketch compilation

```sh
(cd ../html-to-sketch && yarn build) &&
yarn build  &&
node src/inject.js --debug http://localhost:5005/accordion &&
node src/index.js accordion &&
open sketch/accordion.sketch
```

## Design decisions

### Generic vs. specific symbols

Generator-sketch creates a large number of symbols, rather than trying to create generic symbols with style overrides. It's easier to achieve accurate rendering this way, and symbols are easier to discover and use by designers. Compare creating a specific variant of button symbol vs. a generic button symbol where you have to choose the variant style override from the override dropdown. Each specific variant shows up as a thumbnailed entry in the symbols dropdown, but style overrides only show up when you select the symbol and open the style dropdown, and may be shared across different symbols.

## Supported features

- Images
  - PNG, JPEG, anything that Sketch supports
  - background-image
  - data-uris
  - content: url(some-image)
- Inline SVGs
  - Clip SVG to viewport
  - Transformations
  - Paths
  - Rect, circle, ellipse, polygon, polyline, line
  - Strokes
  - Fills
    - Solid color
    - Gradients in user coordinates / object bounding box coordinates (not fully tested)
    - Gradient transforms
    - Pattern and image fills are not supported
  - Clip paths (buggy)
  - Rect cornerRadius (based on rx, similar to Sketch SVG importer)
- Shadow DOM
- Pseudo-elements (:before, :after)
- WebKit sliders (-webkit-slider-thumb, -webkit-slider-runnable-track)
- Text overrides
- Style overrides
- Replacing system-ui and -apple-system fonts with Helvetica
- Text alignment
- Pseudo-classes (:hover, :focus, :active)
- Multiple pages in output
- overflow: hidden

## Unsupported features

- Resizable components using layout constraints (there is some preliminary noodling)
- Flexbox to layout constraints
- SVGs as images
- SVG clip path transformations are buggy
- SVG image fills
- Editable SVG transformation stack (transforms are applied to path points and discarded)
- SVG marker-start/mid/end
- SVG text styling
- SVG masks, filters, flood, lighting, color-interpolation, color-rendering, shape-rendering, vector-effect, paint-order
