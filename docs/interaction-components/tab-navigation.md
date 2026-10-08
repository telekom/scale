# Tab Navigation Interaction Coverage

## Contracts

Both browser interactions use the real `components-tab-navigation--text-only`
Storybook story and its `General` and `Usage` tabs.

- `clicking a tab selects its panel @interaction` clicks `Usage`, checks that
  its `aria-selected` state becomes `true`, and checks that its panel is visible
  while the previously selected `General` panel is hidden.
- `ArrowRight selects the next tab and panel @interaction` enters the tab list
  with the keyboard, presses the supported `ArrowRight` key, and checks focus,
  `aria-selected`, and the corresponding visible/hidden panels.

## Regressions Covered

These checks catch tab state that does not match the displayed panel, a previous
panel that stays visible after selection, and broken ArrowRight focus or
selection behavior.

## Scope

This coverage is limited to browser interactions on the text-only story. It
does not change component production code, visual snapshots, or other tab
variants.

## Central Execution

Passed: 2 distinct checks in both Chromium themes (8 executions, including `repeat-each=2`). Evidence: [component report](../../packages/visual-tests/interaction-results/components/tab-navigation/report.json). See the [consolidated report](../interaction-tests-report.md).
