# Generator-sketch

Generator-sketch and html-to-sketch convert HTML pages to Sketch documents.

## Usage

```bash
yarn          # install deps
yarn build    # build the library

yarn sketch my-document-name [URLs to HTML documents to use as pages]
# ... lots of output ...

open sketch/my-document-name.sketch  # open the generated document
```

The page names of the document are driven by the ```<title>``` elements of the source HTML pages.

Artboards are defined in the HTML using the ```data-sketch-artboard``` attribute. If you don't define an artboard in your document, the document ```<body>``` is used as the default artboard, using the same name as the page title.

Symbol names are defined in the HTML pages through the ```data-sketch-symbol``` attribute.

If you generate a document with the same name, the document ID and the symbol IDs for the symbol names are kept stable. This allows you to use the document as a Sketch library. Sketch detects the changes to the library document and prompts you to replace your existing symbols with the new versions. The symbol IDs are stored in the ```sketch/symbol_database.sqlite``` SQLite database.

Divs with only one child and no special name are collapsed into their parent element. This is used to make Sketch documents that have a flatter structure and are easier to work with. If you don't like this behaviour, it can be commented out in ```src/index.js``` function ```simplifyTree```.

### Example HTML

If this html is in the file ```http://localhost:5005/index.html``` and you do ```yarn sketch my-doc http://localhost:5005/index.html```, you'll generate the Sketch file ```sketch/my-doc.sketch``` that has a ```Symbols``` page with two symbols on it, named ```Symbol Number Banana``` and ```Symbol Number Kumquat```. The document should also have a page titled ```My Sketch Page``` that has one artboard named ```My Artboard``` that has instances of the two symbols on it.

```html
<html>
    <head>
        <title>My Sketch Page</title>
    </head>
    <body>
        <div data-sketch-artboard="My Artboard">
            <div data-sketch-symbol="Symbol Number Banana">
                Hello
            </div>
            <div data-sketch-symbol="Symbol Number Kumquat">
                Sketch
            </div>
        </div>
    </body>
</html>
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


## Unsupported features

- Nice auto-generated symbol variant names (now they are `button / 3` instead of `Button / Warning / Label=Hello`
- Resizable components using layout constraints (there is some preliminary noodling)
- Flexbox to layout constraints
- Multiple pages in output
- overflow: hidden -clip.
- Pseudo-classes (:hover, :focus, :active)
- SVGs as images
- SVG clip path transformations are buggy
- SVG image fills
- Editable SVG transformation stack (transforms are applied to path points and discarded)
- SVG marker-start/mid/end
- SVG text styling
- SVG masks, filters, flood, lighting, color-interpolation, color-rendering, shape-rendering, vector-effect, paint-order

