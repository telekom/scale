# New in this release

## Dark mode

In addition to light mode, Scale now includes all components for [dark mode](./?path=/docs/guidelines-light-and-dark-mode--page)

## An optimized color palette and token logic

We’ve optimized the [Scale color palette](./?path=/docs/guidelines-colors--page) so that it provides a consistent look and feel across both modes. Of course, all colors in our components are certified for accessibility. By using [semantic token](./?path=/docs/guidelines-design-tokens--page) names like Text & Icon or Link, you can more easily identify which style is meant for which element.

## Notes for designers

To take full advantage of the new features, link your components and colors to the library. Especially self-defined colors remain unaffected by the update. Here you can find instructions on how to prepare your project for the update:

[Update Sketch library](./?path=/docs/new-release-sketch-library-update--page)

Sketch only started supporting color variables with version 69 (October 2020). We ask for your understanding that in older versions it isn’t possible to switch between dark and light mode, because these older versions don’t support color tokens.

## Information for developers

We consider the release to be non-breaking, but there is a very unlikely edge case in which the update might require a bit of work.

<a href="https://github.com/telekom/scale/blob/main/docs/dark-mode-v3-beta-100.md" target="_blank" rel="noopener noreferrer">You can find more details on GitHub</a>
