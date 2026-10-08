# Callout Interaction Coverage

Callout has no owned interaction. Its `variant`, `rotation`, position, and `styles` properties control presentation; it renders default-slot content and exposes no action, focusable control, open/closed state, or event. Interaction coverage is therefore N/A, and no interaction spec is needed.

The [Callout visual spec](../../packages/visual-tests/src/callout.visual.spec.js) lists the `standard`, `primary`, `black`, `white`, `blue`, `medium`, and `large-and-small` stories, but its entire suite is marked `describe.skip`; those screenshots do not currently run. The [Callout stories](../../packages/storybook-vue/stories/components/callout/Callout.stories.mdx) show visual variants and slotted text only. The [component source](../../packages/components/src/components/callout/callout.tsx) and [component contract](../../packages/components/src/components/callout/readme.md) confirm that the API has presentation properties, a default slot, and a `base` shadow part, with no interactive behavior. There is no callout interaction spec or component-local unit/E2E test in the source folder.

Remaining responsibility is visual rendering: the skipped visual cases leave variant, content-size, and layout rendering without active screenshot verification.

## Central Execution

N/A: presentation-only component with no user input, focusable control, state transition, or event. The component index records zero executions and the reason in its [evidence report](../../packages/visual-tests/interaction-results/components/callout/report.json). See the [consolidated report](../interaction-tests-report.md).
