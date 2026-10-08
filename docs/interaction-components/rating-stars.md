# Rating Stars Interaction Contract

## Contract

- A physical click on a visible star changes the rating to that star's value.
- ArrowRight on the focused slider increases the rating by one.
- Each rating change emits the public `scale-change` event with a numeric `{ value }` detail.
- The labeled control exposes the current rating through `aria-valuenow` and `aria-valuetext`.
- Readonly rating stars remain accessible but do not change value or emit `scale-change` when the user presses ArrowUp.

## Stories And Sources

- Standard story: `components-rating-stars--info-text-and-custom-label` (Storybook title: "Info Text and custom Label"; starting rating: 3; accessible label: "Custom Rating Label").
- Readonly story: `components-rating-stars--readonly` (Storybook title: "Readonly"; starting rating: 3; accessible label: "Rating").
- Production source: `packages/components/src/components/rating-stars/rating-stars.tsx` renders a labeled range input for interactive ratings, updates the mutable `rating` property, emits `scale-change` with `{ value: this.rating }`, and renders a readonly number input with `aria-readonly` when readonly.
- Story source: `packages/storybook-vue/stories/components/rating-stars/RatingStars.stories.mdx` defines both stories and the public component properties.
- Existing component E2E tests: `packages/components/src/components/rating-stars/rating-stars.e2e.ts` cover star clicks and ArrowRight rating changes.
- Visual-test fixture: `packages/visual-tests/src/test-fixtures.js` opens the Storybook stories by ID and waits for component readiness.

## Interaction Tests

- `rating stars change by pointer and emit scale-change @interaction`
- `rating stars change with ArrowRight and emit scale-change @interaction`
- `readonly rating stars block keyboard changes @interaction`

These tests use a real Playwright pointer click or keyboard input. Each value-changing test checks the component property, accessible value text, and the literal public event name and payload. The readonly case checks the accessible readonly state, unchanged rating, and absence of an event.

## Scope And Regression Risk

The tests cover only the rating-stars browser interaction contract. They can detect regressions in star hit handling, native range keyboard updates, synchronized ARIA and component state, event emission, and readonly blocking. No production component or shared fixture code is changed.

## Central Execution

Passed: 3 distinct checks in both Chromium themes (12 executions, including `repeat-each=2`). Evidence: [component report](../../packages/visual-tests/interaction-results/components/rating-stars/report.json). See the [consolidated report](../interaction-tests-report.md).
