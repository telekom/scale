# Card Interaction Coverage

## Source and story contract

`packages/components/src/components/card/card.tsx` renders a card with a `to` value as a native anchor. It forwards the destination to `href` and the configured `target` to the anchor. Without `to`, it renders a `div` with `role="group"`; that card is presentational and has no card-owned activation behavior. The Storybook `With Link` story in [Card.stories.mdx](../../packages/storybook-vue/stories/components/card/Card.stories.mdx) provides a named link to `https://example.com` with `target="_blank"`.

## Tests

| Test title                                                  | Regression detected                                                                                                                                                                                                                                                     |
| ----------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `linked card opens its destination with Enter @interaction` | Detects a linked card that loses its destination or new-tab target, cannot receive keyboard focus, or fails to open its destination on Enter. The destination response is fulfilled locally so the test checks browser navigation without relying on the external site. |

The standard story is not given a synthetic activation test: its group role and lack of a destination mean the card itself does not own keyboard activation. Slotted content is not treated as card interaction coverage.

## Scope and validation

The change adds only `packages/visual-tests/src/card.interaction.spec.js` and this report. It does not change production code, shared fixtures, visual snapshots, or test configuration.

## Central Execution

Passed: 1 distinct check in both Chromium themes (4 executions, including `repeat-each=2`). Evidence: [component report](../../packages/visual-tests/interaction-results/components/card/report.json). See the [consolidated report](../interaction-tests-report.md).
