# Logo Interaction Coverage

## Contract

- The Link story renders the logo as a native link to `https://www.telekom.de/start`.
- Users can follow that destination with pointer activation or Enter after normal keyboard focus.

## Story And Source

- Story: `components-logo--link`, defined in `packages/storybook-vue/stories/components/logo/Logo.stories.mdx`.
- Production source: `packages/components/src/components/telekom/logo/logo.tsx` renders an anchor with the configured `href` and supports keyboard focus.
- Existing visual fixture: `packages/visual-tests/src/logo.visual.spec.js` captures logo variants and focus appearance. It does not test navigation.
- Existing component spec: `packages/components/src/components/telekom/logo/logo.spec.ts` covers prop snapshots, not browser interaction.

## Interaction Tests

- `logo link navigates to its configured destination with a pointer @interaction`
- `logo link navigates to its configured destination with Enter @interaction`

Both tests use the real Link story and its configured destination. They activate the native link through a user input and wait for the browser to commit navigation.

## Scope And Validation

Only this note and `packages/visual-tests/src/logo.interaction.spec.js` are added. Production code, stories, snapshots, shared fixtures, and test configuration are unchanged.

The external destination alone is fulfilled locally. Real browser navigation must still reach the configured URL; Storybook and asset requests are not stubbed.

## Central Execution

Passed: 2 distinct checks in both Chromium themes (8 executions, including `repeat-each=2`). Evidence: [component report](../../packages/visual-tests/interaction-results/components/logo/report.json). See the [consolidated report](../interaction-tests-report.md).
