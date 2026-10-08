# Progress Bar Interaction Contract

## Contract

- N/A: `scale-progress-bar` is a read-only display. It has no user input, focus target, event handler, or emitted interaction event.
- Changing `percentage` updates the displayed progress and `aria-valuenow`; this is prop-driven rendering, not a user interaction, so it does not justify an interaction spec.
- The Storybook `Interactive` example has Start Success, Start Failure, and Reset buttons. Those buttons and their timer are implemented by the story wrapper, not by `scale-progress-bar`, and are outside this component's interaction contract.

## Stories And Sources

- Production source: `packages/components/src/components/progress-bar/progress-bar.tsx` renders `role="progressbar"` with `aria-valuenow` from `percentage`; it defines no input handlers or emitted events.
- Story source: `packages/storybook-vue/stories/components/progress-bar/ProgressBar.stories.mdx` includes static states and the wrapper-driven `Interactive` demo.
- Wrapper: `packages/storybook-vue/stories/components/progress-bar/ScaleProgressBar.vue` passes props to the component and defines no interactions.
- Existing visual fixture: `packages/visual-tests/src/progressbar.visual.spec.js` captures Standard, Description, Completed, Error, and Interactive story states.
- Existing component tests: `packages/components/src/components/progress-bar/progress-bar.spec.ts` covers snapshots, props, classes, and style helpers; `packages/components/src/components/progress-bar/progress-bar.e2e.ts` checks hydration only.

## Interaction Tests

- N/A. Do not add `progressbar.interaction.spec.js` for a prop-to-ARIA assertion or for the demo wrapper's external buttons. Neither tests a user interaction owned by the progress-bar component.

## Coverage Gaps

- Visual coverage exists for five Storybook variants, including a screenshot of the wrapper-driven Interactive demo.
- There is no interaction behavior to test on the component. Existing component tests do not verify browser accessibility behavior or changing props after render; these are outside the interaction-only scope.

## Central Execution

N/A: read-only display with no user input, focus target, event handler, or component-owned interaction. The component index records zero executions and the reason in its [evidence report](../../packages/visual-tests/interaction-results/components/progressbar/report.json). See the [consolidated report](../interaction-tests-report.md).
