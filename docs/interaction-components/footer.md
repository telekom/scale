# Footer interactions

Story: `components-telekom-footer--standard` (`Standard`, `Components/Telekom Footer`).

[`footer.interaction.spec.js`](../../packages/visual-tests/src/footer.interaction.spec.js)
contains `footer navigation link supports keyboard activation @interaction`.
It tabs to the `Imprint` link, checks focus, and activates it with Enter. The
story supplies the native link with `href="#"`; the test checks that activation
updates the browser URL to its fragment form. This catches lost keyboard focus
or native Enter activation.

This covers keyboard access and activation for one footer link. It does not
check visual presentation, extended-navigation expansion, or other links.

## Central Execution

Passed: 1 distinct check in both Chromium themes (4 executions, including `repeat-each=2`). Evidence: [component report](../../packages/visual-tests/interaction-results/components/footer/report.json). See the [consolidated report](../interaction-tests-report.md).
