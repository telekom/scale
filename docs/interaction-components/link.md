# Link Interaction Coverage

## Contract

- The standard link follows its configured `#top` href after pointer activation or Enter.
- A disabled link cannot be activated by pointer or Enter. Its native anchor has `aria-disabled="true"`, is removed from tab order, and does not navigate.

## Stories And Sources

- Standard story: `components-link--standard` (`label: "A link"`, `href: "#top"`).
- Disabled story: `components-link--disabled` (`label: "A link, disabled"`, `disabled: true`). The test sets its public `href` property to `#destination` before attempting activation.
- Production source: [link.tsx](../../packages/components/src/components/link/link.tsx) renders a native anchor and sets its disabled accessibility and tab-order properties. [link.css](../../packages/components/src/components/link/link.css) blocks pointer events for disabled links.
- Story definitions: [Link.stories.mdx](../../packages/storybook-vue/stories/components/link/Link.stories.mdx).

## Interaction Tests

- `link navigates to its configured href with a pointer @interaction`
- `link navigates to its configured href with Enter @interaction`
- `disabled link blocks pointer and keyboard navigation @interaction`

The enabled checks use the story's literal `#top` destination and assert the page URL only after real Playwright pointer or keyboard input. The disabled check attempts both inputs and verifies that the URL does not change. These catch broken native navigation, lost Enter activation, or disabled state that still permits activation.

## Scope And Validation

Only the link visual interaction spec and this component interaction note are in scope. No production or story files are changed.

## Central Execution

Passed: 3 distinct checks in both Chromium themes (12 executions, including `repeat-each=2`). Evidence: [component report](../../packages/visual-tests/interaction-results/components/link/report.json). See the [consolidated report](../interaction-tests-report.md).
