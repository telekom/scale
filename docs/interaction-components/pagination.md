# Pagination Interactions

The `components-pagination--standard` story starts at element 100 of 200, with
10 elements per page. Use it to verify that pagination controls change the
displayed range and emit the public `scale-pagination` event.

Clicking **Go to next page** changes the range to `111-120 / 200` and emits
`scale-pagination` with `{ direction: 'NEXT', startElement: 110 }`. Activating
**Go to previous page** with Enter returns the range to `101-110 / 200` and
emits `{ direction: 'PREVIOUS', startElement: 100 }`.

[`pagination.interaction.spec.js`](../../packages/visual-tests/src/pagination.interaction.spec.js)
contains these checks:

- `next page changes the displayed range and emits its event @interaction` verifies the next range and literal `NEXT` event detail. It catches a stale range or incorrect event payload.
- `previous page responds to Enter and emits its event @interaction` verifies the previous range and literal `PREVIOUS` event detail after keyboard activation. It catches broken Enter activation or event behavior.

Coverage uses the standard story and checks one forward and one backward
transition; it does not cover disabled or boundary controls.

## Central Execution

Passed: 2 distinct checks in both Chromium themes (8 executions, including `repeat-each=2`). Evidence: [component report](../../packages/visual-tests/interaction-results/components/pagination/report.json). See the [consolidated report](../interaction-tests-report.md).
