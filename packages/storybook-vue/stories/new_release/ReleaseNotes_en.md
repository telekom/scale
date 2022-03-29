# New in this release

## Dark mode

In addition to light mode, Scale now includes all components for [dark mode](./?path=/docs/guidelines-light-and-dark-mode--page).

## An optimized color palette and token logic

We’ve optimized the [Scale color palette](./?path=/docs/guidelines-colors--page) so that it provides a consistent look and feel across both modes. Of course, all colors in our components are certified for accessibility. By using [semantic token](./?path=/docs/guidelines-design-tokens--page) names like Text & Icon or Link, you can more easily identify which style is meant for which element.

## Notes for designers

To take full advantage of the new features, link your components and colors to the library. Especially self-defined colors remain unaffected by the update. Here you can find instructions on how to prepare your project for the update:

[Update Sketch Library](./?path=/docs/new-release-sketch-library-update--page)

Color variables exist in Sketch only since version 69 (October 2020). We ask for your understanding that in older program versions it is not possible to switch between Dark and Light Mode and the color tokens cannot be used in these.

## Information for developers:

We consider the release to be non-breaking, but there is a very unlikely edge case in which the update might require a bit of work. You can find more details on Github:

[Scale dark mode release migration guide](https://gist.github.com/acstll/904b65679f5bd1568f1ed8c4e66744f9)
