# Button Interaction Coverage

The Button stories in [Button.stories.mdx](../../packages/storybook-vue/stories/components/button/Button.stories.mdx) provide the `standard` and `disabled` controls, both named `Label`. The implementation contract is in [button.tsx](../../packages/components/src/components/button/button.tsx): the native button handles keyboard activation and disabled state, and a form receives a submit fallback for Enter-key submission across the shadow boundary. The existing [button.e2e.ts](../../packages/components/src/components/button/button.e2e.ts) also covers Enter-key form submission.

The visual interaction spec adds three tests:

- `enabled button activates once with Enter @interaction` observes one public bubbling click event after keyboard activation. It detects a lost keyboard-to-click activation path.
- `button disabled attribute blocks activation and resumes after removal @interaction` checks the native disabled state, skipped keyboard focus, and no public click after keyboard or pointer input. It then removes `disabled` and verifies keyboard and pointer activation resume.
- `button activation submits its name and value through the parent form @interaction` configures the real button as submitter with name `action` and value `save`, then verifies that the native form submission includes that value. It detects a broken shadow-DOM form-submit fallback or lost submitter data.

The existing core counterpart is `packages/components/src/components/button/button.e2e.ts`; this suite adds rendered-browser checks for the disabled-attribute transition and the public click and form outcomes.

Disabled coverage is limited to the non-link `disabled` story. Keyboard coverage checks Enter activation for the enabled control, Enter and Space blocking for the disabled control, and Enter-key form submission. Link-specific keyboard behavior is not covered here.

## Central Execution

Focused validation passed 4 executions across the two configured themes. The final full run passed 142 executions (71 checks in each theme), with no failures, skips, or flaky tests. Evidence: [component report](../../packages/visual-tests/interaction-results/components/button/report.json). See the [consolidated report](../interaction-tests-report.md).
