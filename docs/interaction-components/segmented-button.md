# Segmented Button Interactions

The interaction tests exercise the rendered Storybook controls and assert the
public `scale-change` event payload. After opening each story, they remount the
segmented-button with its public properties and wait for the component tree to
be ready, as the visual tests do. They locate the rendered native buttons
through the public `scale-segment` elements and listen for `scale-change` on
the `scale-segmented-button` host. They do not call component handlers or set
selection state directly.

| Test                                                                                    | Story                                           | User action and contract                                                                                                                                                                        |
| --------------------------------------------------------------------------------------- | ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Selecting a segment clears the previous selection and emits its detail                  | `components-segmented-button--standard`         | Click Samsung. Verify its public `selected` property is true, Apple is false, one selected render part exists, and the event detail lists all four segments and values.                         |
| Keyboard skips a disabled segment and disabled pointer input leaves selection unchanged | `components-segmented-button--disabled-segment` | Tab past disabled Apple, select One+ with Space, verify public `selected` properties and event detail, then click the disabled button at its physical coordinates and verify selection remains. |

Both tests are tagged `@interaction` in
`packages/visual-tests/src/segmented-button.interaction.spec.js`.

## Sources

- `packages/visual-tests/src/segmented-button.visual.spec.js` for story IDs
  and the required remount setup.
- `packages/components/src/components/segmented-button/segmented-button.tsx`
  for the `scale-change` payload and single-selection behavior.
- `packages/components/src/components/segment/segment.tsx` for native button,
  disabled, keyboard, and `aria-pressed` behavior.

The gate checks public segment `selected` state, rendered selection parts, and literal event details. Current production renders boolean `aria-pressed` as an empty attribute; correct string ARIA values remain an accessibility gap and are not asserted as working behavior. Initial-mount sizing is also excluded by the inherited remount fixture.

## Central Execution

Passed: 2 distinct checks in both Chromium themes (8 executions, including `repeat-each=2`). Evidence: [component report](../../packages/visual-tests/interaction-results/components/segmented-button/report.json). See the [consolidated report](../interaction-tests-report.md).
