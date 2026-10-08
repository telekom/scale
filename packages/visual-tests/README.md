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
# macOS, Linux, or Git Bash
PUPPETEER_SKIP_DOWNLOAD=true yarn install --frozen-lockfile
yarn workspace @telekom/scale-visual-tests test:prepare
```

In PowerShell, use:

```powershell
$env:PUPPETEER_SKIP_DOWNLOAD = 'true'
yarn install --frozen-lockfile
yarn workspace @telekom/scale-visual-tests test:prepare
```

This skips downloading the separate Puppeteer browser used by core E2E tests.

Preparation generates and builds components, builds Storybook from this source,
and copies its output. It runs separately from tests so repeated comparisons do
not rebuild. Run it again after changing components, stories, tokens, or assets.
`copy` only copies an already-built Storybook.

## Compare Screenshots

```sh
yarn workspace @telekom/scale-visual-tests test --workers=1
yarn workspace @telekom/scale-visual-tests test --workers=1 '(^|/)button[.]visual[.]spec[.]js$'
yarn workspace @telekom/scale-visual-tests test --workers=1 --repeat-each=2
```

The local runner uses Linux x64 in
`mcr.microsoft.com/playwright:v1.63.0-noble`, pinned to digest
`sha256:eff16c30e6f3f4af0a03fa4b706120d5e9b0891c344a27d64559aff5900a4a27`.
It installs only the visual workspace's dependencies with the frozen root lock.
A dependency volume is keyed by manifest, lock, and image. Tests and Storybook
are copied to the container filesystem to avoid bind-mount browser I/O.
No port is published, and no Docker socket or nested browser container is used.
All hosts use the same x64 renderer. `--workers=1` matches the visual and
interaction CI worker counts.

The local prepare command builds Storybook on the host, while CI builds it on
Ubuntu. In a fresh worktree, test the exact Storybook artifact used by a CI run
by downloading it into the expected directory, then run the same Docker-backed
compare:

```sh
gh run download RUN_ID --name visual-storybook-COMMIT_SHA --dir packages/visual-tests/storybook-static
yarn workspace @telekom/scale-visual-tests test:policy
yarn workspace @telekom/scale-visual-tests test --workers=1
```

Replace `RUN_ID` and `COMMIT_SHA` with the workflow run ID and its commit SHA.
The CI-only `test:ci` script runs inside the pinned Actions container; the local
`test` script starts that same image through Docker.

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
yarn workspace @telekom/scale-visual-tests test:interaction:native
```

These checks run the interaction suite without Docker. Evidence screenshots are
not visual baselines. They do not replace Stencil spec/E2E tests; the core package declares
its existing Jest dependencies directly. Set `SCALE_VISUAL_PORT`
for a second worktree; the server will not attach to an existing server.
Playwright stops the test server after the run.

## Interaction Correctness Gate

Run the Prepare steps first, from this source. Use Docker Desktop for the same
browser image as CI. Preparation is required again after source or story changes.

```sh
yarn workspace @telekom/scale-visual-tests test:interaction
yarn workspace @telekom/scale-visual-tests test:interaction --workers=1 '(^|/)checkbox[.]interaction[.]spec[.]js$'
yarn workspace @telekom/scale-visual-tests test:interaction --repeat-each=2
yarn workspace @telekom/scale-visual-tests test:interaction:policy
yarn workspace @telekom/scale-visual-tests playwright show-report interaction-report
```

The full run tests both themes, with no retries or snapshot updates. A failed
assertion exits nonzero. CI also rejects skipped/expected-failure tests, missing
component contracts, and missing theme execution. It verifies that both
configured theme projects exist, even when the configuration is reduced.
Filtered local runs mark other components `not-run`, not passed. Display-only
and deprecated components have explicit reasons rather than tests that pass by
construction.

`interaction-report/index.html` is the interactive HTML report.
`interaction-results/results.json` and `results.xml` contain machine results.
`interaction-results/components.json` is the component index. Each component has
`interaction-results/components/<component>/report.json` and `contract.md`.
Executed tests also include final screenshots, complete traces, and accessible
state text, even on success. Use `playwright show-trace <trace.zip>` to inspect
the copied traces. These are evidence only, never approved screenshot baselines.
Authored contracts record agent findings; the JSON reports contain actual run
status and test-source hashes. The seven exclusions have contracts and JSON
reports, but no invented browser evidence.

Write tests around distinct public behavior, not an arbitrary test quota. Import
`test` and `expect` from the fixture, open a real story, use role/label locators,
perform real user input, and assert the rendered state and relevant public
outcomes. Runtime attributes, live
children or slots, form submission, and native validity are useful scenarios
when required by the contract. Existing core tests may cover basic input
actions; add a browser assertion for a distinct rendered contract. Configure
public props only for setup.
For input controls, check host state or an actual production event as well as
native state. A test-owned click marker, assigned-property readback, synthetic
tested event, or expected value calculated with the production algorithm is not
an interaction gate. Disabled pointer attempts use real coordinate clicks, not
forced actions. Do not add sleeps or skip a failing behavior to make CI pass.

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
runs `test:ci` with updates disabled and one worker. Its `visual-results`
artifact contains HTML, JSON, JUnit, images, and failure traces and uploads with
`if: always()`. Ordinary CI does not write baselines or open snapshot-update
PRs.
Baseline generation through `test:update` uses the pinned Linux image and one
worker, independently of comparison concurrency.

The separate `interaction-tests` job reuses the same SHA-named Storybook and
pinned image. Both browser jobs install from the frozen root lock and download
the artifact built by `visual-storybook`. The workflow uses Node 24 and v4
Actions. Its cache keys include the root and workspace manifests plus
`yarn.lock`; install and bootstrap use the frozen lock and non-interactive
mode. The interaction job runs its evidence-policy checks and interaction
configuration with one worker, then uploads its evidence artifact for seven
days with `if: always()` and `if-no-files-found: error`. Visual CI excludes
`@interaction` to avoid duplicate execution.

## Coverage

All 38 legacy visual files are migrated: 478 active visual cases.
The per-component interaction suite replaces the original two seed examples.
Button interaction states now run in both
themes instead of inheriting the previous suite's theme.

Interaction checks are selected by public contract. For example, the current
DropdownSelect suite checks keyboard commit and a child option disabled at
runtime; SegmentedButton checks enabling a live slotted segment; Sidebar
Navigation checks a nested child's live label and `href` update, preserves
`aria-current`, follows the link through real navigation, and checks
pointer-driven branch state. These cases use rendered controls and public
outcomes, without cloning or remounting components to set expected state.

SegmentedButton uses Chromium's `--disable-lcd-text` launch option to avoid
subpixel glyph-edge variation after selection changes. Its baselines use the
same launch option, pinned Linux x64 image, and one worker. Other suites retain
their existing rendering mode; screenshot thresholds remain unchanged.

The 54 skipped cases in three existing suites remain explicit exclusions:
Brand Header, Callout, and ToggleGroup. Brand Header and ToggleGroup are
deprecated. These exclusions are retained coverage debt, not a speed gain.

New tests import `test` and `expect` from [the fixture](src/test-fixtures.js),
open a story with `story.open(id)`, use locators through open shadow roots, and
assert the relevant UI state. The fixture captures evidence. Use visible labels
for covered inputs; do not force clicks or replace state assertions with sleeps.
Add state-only tests with `@interaction` for native runs.

The interaction suite has 71 unique test titles across 31 active components;
light and dark themes produce 142 expected executions. The final local run
passed all 142 executions with no failures, skips, or flaky tests. CI remains
the remote confirmation gate.
