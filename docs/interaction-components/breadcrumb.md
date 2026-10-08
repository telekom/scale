# Breadcrumb Interactions

The `components-breadcrumb--standard` story renders four links inside a
navigation landmark named `Breadcrumb`: `Home` targets `#1`, `Page 1` and
`Page 2` target `#2`, and `Current Page` targets `#3`.

The breadcrumb preserves native link behavior. Pointer activation of `Home`
navigates to `#1`. Keyboard Tab reaches each link in order, and Enter on
`Current Page` navigates to `#3`. The last item remains a link and has
`aria-current="page"`; a last item without an `href` is rendered as plain text.

The interaction tests are in
[`breadcrumb.interaction.spec.js`](../../packages/visual-tests/src/breadcrumb.interaction.spec.js):

- `breadcrumb link navigates by pointer and marks the current link @interaction` checks Home's fragment navigation and the current-page semantics. It catches a broken destination or missing `aria-current` state.
- `breadcrumb links navigate by keyboard @interaction` checks Tab order and Enter navigation from the current link. It catches lost focusability or native keyboard activation.

Coverage is limited to the standard story and same-page fragment links. It does
not test external destinations or the plain-text last item when it has no
`href`. No external request stub is needed.

## Central Execution

Passed: 2 distinct checks in both Chromium themes (8 executions, including `repeat-each=2`). Evidence: [component report](../../packages/visual-tests/interaction-results/components/breadcrumb/report.json). See the [consolidated report](../interaction-tests-report.md).
