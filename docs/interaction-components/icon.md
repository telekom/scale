# Icon

## Interaction scope

`scale-icon` is a presentation component. It renders an SVG from either a path or a referenced icon name. It has no event handlers, internal state, or action semantics, so it has no component-owned interaction to test.

The `focusable` property only adds `tabindex="0"` to the SVG. It does not add keyboard or pointer behavior. If an icon appears inside a button or link, test the surrounding control's behavior in that control's interaction coverage.

## Existing coverage

- Production: `packages/components/src/components/icon/icon.tsx` renders the SVG, optional title, decorative `aria-hidden`, and optional focusability.
- Story: `packages/storybook-vue/stories/components/icon/Icon.stories.mdx` documents standard, path, named-icon, and icon-library examples.
- Visual fixture: `packages/visual-tests/src/icon.visual.spec.js` captures `standard`, `with-path-attribute`, `with-name-attribute`, and `icon-library`.
- Component tests: `packages/components/src/components/icon/icon.spec.ts` checks a render snapshot; `icon.e2e.ts` checks hydration.

## Interaction test decision

No `icon.interaction.spec.js` is needed. An interaction test for clicking or keyboard activation would test a parent control, not `scale-icon`.

## Gaps and validation

Existing visual coverage is presentation-only. It does not exercise focusability or accessibility behavior.

## Central Execution

N/A: the icon renders presentation and has no action behavior; focusability alone does not define activation. The component index records zero executions and the reason in its [evidence report](../../packages/visual-tests/interaction-results/components/icon/report.json). See the [consolidated report](../interaction-tests-report.md).
