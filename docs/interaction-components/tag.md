# Tag Interaction Coverage

## Contract

- The dismiss button is a native button. It supports pointer activation and keyboard activation with Space.
- Activation emits exactly one bubbling `scale-close` event. Its `detail` is the original click `MouseEvent`; the click type is `click`, the button is `0`, and the click count is `1` for pointer activation or `0` for keyboard activation.
- The tag does not remove itself. The consumer owns removal and any follow-up focus management, so these tests do not assert that the tag disappears.

## Story And Sources

- Story: `components-tag--dismissable-tag` (`label: "Dismissable tag"`, `dismissable: true`). The dismiss button's accessible name is `dismiss`.
- Production source: [tag.tsx](../../packages/components/src/components/tag/tag.tsx) handles the click and emits `scale-close` with the original event.
- Story source: [Tag.stories.mdx](../../packages/storybook-vue/stories/components/tag/Tag.stories.mdx). The colors story demonstrates consumer-managed removal; it is not the static story used by these tests.

## Interaction Tests

- `dismissable tag emits one close event from pointer activation @interaction`
- `dismissable tag emits one close event from Space activation @interaction`

Both tests assert the emitted event count and literal payload values. They use the Storybook fixture and the button's accessible role and name.

## Central Execution

Passed: 2 distinct checks in both Chromium themes (8 executions, including `repeat-each=2`). Evidence: [component report](../../packages/visual-tests/interaction-results/components/tag/report.json). See the [consolidated report](../interaction-tests-report.md).
