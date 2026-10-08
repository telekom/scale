# Brand Header Interaction Coverage

## Contract and source anchors

- The active Mega Menu story is `components-telekom-brand-header-navigation--mega-menu`, from the `Components/Telekom Brand Header & Navigation` Storybook page.
- `SlotMainNavWithFlyout.vue` supplies the `Topic One` button and a `scale-telekom-nav-flyout` with `hover`. Hover opens the flyout. The flyout sets `aria-expanded="true"`; Escape closes it, sets the value to `false`, and returns focus to the trigger.
- The browser test uses `story.open()` with the active story ID and real hover and keyboard input. It checks the visible menu link, accessible expanded state, dismissal, and focus restoration.
- `telekom-nav-flyout.spec.ts` already tests lower-level keyboard activation behavior.

## Deprecated visual coverage

`brand-header.visual.spec.js` is intentionally excluded: its entire `Deprecated Brand Header` describe block uses `test.describe.skip`, and its story IDs begin with `deprecated-components-brand-header-navigation`. Do not reactivate those captures. The active replacement source is the Telekom Brand Header & Navigation Storybook page and its Mega Menu story; this interaction case targets that story instead.

## Scope, regressions, and gaps

Only `packages/visual-tests/src/brand-header.interaction.spec.js` and this report are in scope. The deprecated visual spec, component source, stories, and image baselines are unchanged.

The interaction case detects failure to open from hover, expose the expanded state, show menu content, close on Escape, or restore focus. It does not cover mobile navigation, header scrolling, click-away dismissal, or the remaining header variants. The deprecated visual captures remain excluded rather than being counted as current coverage.

## Central Execution

Passed: 1 distinct check in both Chromium themes (4 executions, including `repeat-each=2`). Evidence: [component report](../../packages/visual-tests/interaction-results/components/brand-header/report.json). See the [consolidated report](../interaction-tests-report.md).
