# Slider Interaction Contract

## Contract

- ArrowRight increases the focused slider by one step. ArrowUp increases it by ten steps.
- Repeated ArrowUp/ArrowDown input clamps at the maximum/minimum.
- Each keyboard value change emits `scale-change` with the new numeric value and updates the host `value` attribute.
- A disabled slider does not change value or emit `scale-change` when its track is clicked.

## Stories And Sources

- Standard story: `components-slider--standard` (`label: "Standard"`, `value: 42`; default bounds are 0 to 100 and default step is 1).
- Disabled story: `components-slider--disabled` (`label: "Disabled"`, `value: 13`, `disabled: true`).
- Production source: `packages/components/src/components/slider/slider.tsx` renders a focusable element with `role="slider"`, handles ArrowRight/ArrowLeft by one step and ArrowUp/ArrowDown by ten steps, reflects `value` on the host, and emits numeric `scale-change` details. It clamps updates to `min` and `max`.
- Story source: `packages/storybook-vue/stories/components/slider/Slider.stories.mdx`.
- Visual-test fixture: `packages/visual-tests/src/test-fixtures.js` opens stories by ID and waits for custom elements to be ready.

## Interaction Tests

- `slider changes by keyboard increments and emits scale-change values @interaction`
- `slider arrow keys clamp at the minimum and maximum @interaction`
- `disabled slider ignores pointer changes @interaction`

The boundary test presses ArrowUp repeatedly to clamp at the maximum, then ArrowDown to clamp at the minimum. It checks accessible value, reflected host value, and public event payload. Home/End support is not covered. The disabled interaction checks pointer blocking; the disabled story hides its thumb, so it does not test keyboard focus.

## Central Execution

Passed: 3 distinct checks in both Chromium themes (12 executions, including `repeat-each=2`). Evidence: [component report](../../packages/visual-tests/interaction-results/components/slider/report.json). See the [consolidated report](../interaction-tests-report.md).
