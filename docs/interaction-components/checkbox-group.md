# Checkbox Group Interactions

## Source contract

The `Standard` story (`components-checkbox-group--standard`) has three labeled child checkboxes. Checkbox Item 2 starts checked. Child checkboxes can change independently. A child change emits the public `scale-change` event with `checked`, `indeterminate`, `value`, and `disabled` in its detail; the event bubbles to the group. The group parent checkbox selects or clears enabled children.

The group has no `disabled` property. Its parent checkbox becomes disabled when all child checkboxes are disabled. The `Group Disabled` story in `CheckboxGroup.stories.mdx` is commented out, so this spec does not claim coverage of an active group-disabled story.

## Interaction coverage

- `checkbox group children keep independent selections and bubble change @interaction`: clicks Checkbox Item 1, checks that Items 2 and 3 retain their original checked state, and asserts the bubbled event target and literal public detail.
- `checkbox group children can be selected with the keyboard @interaction`: focuses Checkbox Item 1 and presses Space, then checks that the other child states remain unchanged.

Both tests use the active Standard story and accessible checkbox names.

## Central Execution

Passed: 2 distinct checks in both Chromium themes (8 executions, including `repeat-each=2`). Evidence: [component report](../../packages/visual-tests/interaction-results/components/checkbox-group/report.json). See the [consolidated report](../interaction-tests-report.md).
