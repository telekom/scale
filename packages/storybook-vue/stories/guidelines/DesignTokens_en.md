# Telekom Design Tokens

## What are design tokens?

Design tokens are the variables of our designs. They centrally store the values for colors, typography, spacing, or radii – in contrast to hard-coded values. As a result, they help establish consistent product development. Handing designs off for development is less prone to errors because developers can select the right token from a predefined package. And tokens can update globally and change automatically for all projects.

## How does Scale implement design tokens in practice?

The design tokens are created in a JSON format and converted into formats that can be used in Sketch, Figma, CSS, or Javascript by a program called Style Dictionary. The Sketch & Figma libraries are created by using the respective outputs from Style Dictionary. The Scale code components use the design token package as well. As a developer, you can pull the design tokens directly from GitHub into your project. This assures that everyone at Deutsche Telekom works with the same design principles to create a consistent, high-quality experience for our customers. For more information on implementing design tokens in your workflow, read the article <a href="https://uxdesign.cc/building-better-products-with-the-design-token-pipeline-faa86aa068e8" target="_blank" rel="noopener noreferrer">Building better products with a design token pipeline</a>.

## How designers work with design tokens

We have converted the design tokens into color, text, and shadow styles for Sketch and Figma. As a designer, you can work like you always have, using styles for your designs. Using semantic token names like Text & Icon or Link will make it easier to understand and remember what to use specific styles for. With the help of the tokens, you can also easily change the designs from light to dark mode to make sure that dark mode works well too. When we update the tokens, you just need to accept the update, and everything will update automatically.

## How developers work with design tokens

As a developer, you can include the tokens as CSS variables or Javascript objects. This way, you can easily implement the styles you receive from the designers. By using the correct tokens, no extra implementation is needed for dark mode. Whenever a token needs to update, all you have to do is pull in the latest changes from GitHub or npm, and your code will update automatically. You can find the core and semantics tokens in the @telekom/design-tokens repo (folder: src). By using Scale or the design tokens repository, you only need to take care of the semantic tokens.

[Color Tokens](.?path=/docs/guidelines-colors--page)

[Shadows](./?path=/docs/guidelines-shadows--page)

## Light and dark mode

Design tokens are the basis for an intuitive light and dark mode. In this guideline, you will learn more about the advantages of dark mode and how to implement it:
[Light and dark mode](./?path=/docs/guidelines-light-and-dark-mode--page)

## The advantages at a glance

- You automatically design in a brand-compliant and consistent way.
- Your interfaces are accessible, and you save time in the approval process.
- You can automatically update your product with upcoming changes.
- You automatically have the option to offer dark mode without additional effort.
- Design tokens enable much more customization, so that Scale will be able to grow with the needs of your projects.
- Product theming is easy to carry out (e.g., for third party products).
