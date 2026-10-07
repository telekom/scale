# Browser Tests

Playwright tests the existing static Storybook in isolated browser contexts,
in light and dark themes. It keeps the 1040 x 768 viewport, CSS-pixel body
screenshots, DPR 1, `en-US`, and UTC. Fixtures wait for nested custom elements,
fonts, and images and reject browser errors and failed asset requests.
The date is fixed at 2026-01-15; timers continue to run.

## Prepare

Use Node 24, Yarn 1, and Docker Desktop for canonical screenshots.
From the repository root:

```sh
yarn install --frozen-lockfile
yarn workspace @telekom/scale-visual-tests test:prepare
```

Preparation generates and builds components, builds Storybook from this source,
and copies its output. It runs separately from tests so repeated comparisons do
not rebuild. Run it again after changing components, stories, tokens, or assets.
`copy` only copies an already-built Storybook.

## Compare Screenshots

```sh
yarn workspace @telekom/scale-visual-tests test
yarn workspace @telekom/scale-visual-tests test '(^|/)button[.]visual[.]spec[.]js$'
yarn workspace @telekom/scale-visual-tests test --repeat-each=2
```

The local runner uses Linux x64 in
`mcr.microsoft.com/playwright:v1.63.0-noble`, pinned to digest
`sha256:eff16c30e6f3f4af0a03fa4b706120d5e9b0891c344a27d64559aff5900a4a27`.
It installs only the visual workspace's dependencies with the frozen root lock.
A dependency volume is keyed by manifest, lock, and image. Tests and Storybook
are copied to the container filesystem to avoid bind-mount browser I/O.
No port is published, and no Docker socket or nested browser container is used.
`test:m1` remains an alias; all hosts use the same x64 renderer.

Normal comparisons use `updateSnapshots: 'none'`. Missing images are errors,
not new approvals. The matcher uses `threshold: 0.01` and `maxDiffPixels: 0`.
The 1% per-pixel perceptual threshold excludes measured one-level RGB rounding
at rounded corners, not an allowance for changed pixels. Its antialias handling
still applies. Native Windows/macOS images are not canonical baselines.

## Update And Review

```sh
yarn workspace @telekom/scale-visual-tests test:update
yarn workspace @telekom/scale-visual-tests test
git diff --stat -- packages/visual-tests/src/__image_snapshots__
yarn workspace @telekom/scale-visual-tests playwright show-report report
```

Use `test:update` only for an intentional rendering or browser upgrade. Review
all affected images in the HTML report and PR, including both themes and states.
Passing comparisons prove agreement with committed images, not human approval
of the design. The report includes expected baselines for passing tests, plus
actual images, differences, and traces for failed tests. Commit approved images
with their tests. Filtered runs never delete unrelated baselines.

Images use
`src/__image_snapshots__/<project>/<test-file>/<test-name>/<state>.png`.
Update `@playwright/test`, its lock entries, the runner/workflow image digest,
and the fixture's browser version check together. Review fonts, icons, native
controls, focus, calendars, and popup positioning before accepting an upgrade.

## Fast Native Checks

```sh
yarn workspace @telekom/scale-visual-tests playwright install chromium
yarn workspace @telekom/scale-visual-tests test:interaction
```

These checks assert keyboard focus/activation and checkbox state without images
or Docker. They do not replace Stencil spec/E2E tests; the core package declares
its existing Jest dependencies directly. Set `SCALE_VISUAL_PORT`
for a second worktree; the server will not attach to an existing server.
Playwright stops the test server after the run.

## Snapshot Policy

```sh
yarn workspace @telekom/scale-visual-tests test:policy
```

This checks a matching image, a deliberate style mismatch, and a missing image
in temporary paths. Mismatches and missing baselines must fail without creating
or rewriting canonical files.

## GitHub Actions

`visual-storybook` builds the candidate once. `visual-tests` downloads its
SHA-named artifact into the same pinned image, verifies snapshot policy, and
compares with updates disabled and one worker. Its `visual-results` artifact
contains HTML, JSON, JUnit, images, and failure traces. Ordinary CI does not
write baselines or open snapshot-update PRs.

## Coverage

All 38 legacy files are migrated: 396 active visual cases plus four new native
interaction cases across both themes. Button interaction states now run in both
themes instead of inheriting the previous suite's theme.

The 128 skipped cases in nine existing suites remain explicit exclusions:
Brand Header, Callout, DropdownSelect, Menu, RadioButtonGroup, RadioButton,
SegmentedButton, SidebarNavigation, and ToggleGroup. Brand Header and ToggleGroup
are deprecated. These exclusions are retained coverage debt, not a speed gain.

New tests import `test` and `expect` from [the fixture](src/test-fixtures.js),
open a story with `story.open(id)`, use locators through open shadow roots,
assert the relevant UI state, and call `story.screenshot('state.png')`.
Use visible labels for covered inputs; do not force clicks or replace state
assertions with sleeps. Add state-only tests with `@interaction` for native runs.

DataGrid measures automatic columns only after nested cells and fonts are ready.
Its visual tests also wait for the temporary measurement table to disappear.
This prevents first-render child widths from being retained as final widths.
