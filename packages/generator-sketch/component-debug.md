Create a new component page:

    Go to `packages/components-sketch/views`

    Copy `button.hbs` to `my-button.hbs`

    Open `my-button.hbs` and edit the `data-sketch-key` attributes to new names. 
    Every Sketch symbol needs to have a unique `data-sketch-key`.

    Change the generated symbol names at the bottom of `my-button.hbs`. E.g. replace Button with MyButton.

    Add a link to `/my-button` in `index.hbs`

    Go to `packages/generator-sketch`

    Edit `packages/generator-sketch/src/config.js`

        Find the Button section in `setSymbolResizing`

        Duplicate the section.

        Change `if (/^(Button)/.test(symbol.name))` to `if (/^(MyButton)/.test(symbol.name))`.

        Now you can customize the resizing behavior of your new component.

    Test the component by itself: `./component-build.sh my-button`

    Debug the html-to-sketch step: `./component-build.sh my-button --debug`

    Build the complete library by running `yarn build-scale`

    You should now have a Sketch library with a MyButton component.
    Open `packages/generator-sketch/sketch/scale-components-telekom.sketch` to verify.



Test that a Sketch symbol still works after changes to a component:

    Go to `packages/generator-sketch`

    Run the component build: `./component-build.sh edited-component-page`

    If the component looks ok, run the full library build: `yarn build-scale`

    Test the library.

    If the component symbols have resizing issues:

        Open `src/config.js` and edit the component's section in `setSymbolResizing`.

        Open the symbol in Sketch ("Unlink Symbol") to see the layer names and their current resizing behavior.

        Try to make the resizing correct in Sketch first, then copy the resizing behavior to `setSymbolResizing`.

        If `src/utils.js` doesn't have the wanted resizing behavior:

            Copy-paste the symbol to a new Sketch document.

            Save document to `~/Desktop/Untitled.sketch`

            Open terminal and run `cd Desktop && mkdir debug && cd debug && unzip Untitled.sketch && open .`

            Then drag the json documents in `pages` to VSCode.

            Format document.

            Search for `resizingConstraint` in the layer you're interested in.

            Add the `resizingConstraint` to the `Resize` object in `src/utils.js`

            Add the new constraint name to the `const { ... } = Resize;` statement in `src/config.js`

    If the generated Sketch symbol looks wrong:

        Run `./component-build.sh edited-component-page --debug`

        Open DevTools on the Chromium window and run `debugger; page2layers.run()`

        Step through the code to see what is going on.

        Edit `packages/html-to-sketch/html2asketch/nodeTreeToSketchPage.ts`
        or `packages/html-to-sketch/html2asketch/nodeTreeToSketchGroup.ts`
        or `packages/html-to-sketch/html2asketch/nodeToSketchLayers.ts`

