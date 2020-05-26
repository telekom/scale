# Generator-sketch

Generator-sketch and html-to-sketch convert HTML pages to Sketch documents.

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

