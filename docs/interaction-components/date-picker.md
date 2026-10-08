# Date Picker Interaction Coverage

## Source And Story Contract

`packages/components/src/components/date-picker/date-picker.tsx` renders the date input and calendar, forwards selection as the public `scale-change` event, and exposes the selected ISO date as `event.detail.value`. The bundled Duet calendar supplies accessible `Next month`, `Previous month`, and day labels. The standard story in `packages/storybook-vue/stories/components/date-picker/DatePicker.stories.mdx` starts with `value: '2020-12-31'`; the disabled story sets `disabled: true`. The shared visual fixture freezes the browser clock at `2026-01-15T12:00:00Z`, but these tests use the story's explicit value and do not assume the current date.

## Tests

| Test title                                                                  | Regression detected                                                                                                                                       |
| --------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `date picker selects a calendar date and emits scale-change @interaction`   | Detects calendar selection that fails to update the visible ISO value or emit the selected value through the public event.                                |
| `date picker navigates months and restores focus after Escape @interaction` | Detects broken next/previous month navigation, an Escape key that leaves the calendar open, or focus that does not return to the calendar toggle.         |
| `disabled date picker ignores pointer activation @interaction`              | Detects an enabled-looking or interactive disabled picker that opens its calendar, changes its value, or emits a selection event after a pointer attempt. |

## Scope And Validation

The change adds only `packages/visual-tests/src/date-picker.interaction.spec.js` and this report. It does not change production code, the shared fixture, visual snapshots, or test configuration.

## Central Execution

Passed: 3 distinct checks in both Chromium themes (12 executions, including `repeat-each=2`). Evidence: [component report](../../packages/visual-tests/interaction-results/components/date-picker/report.json). See the [consolidated report](../interaction-tests-report.md).
