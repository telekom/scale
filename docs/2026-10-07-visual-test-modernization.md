# Visual and E2E Test Modernization

Research date: 2026-10-07. Source checkout: `origin/main` at
`c4e721124f9c33febc75bfb9bde24193eda15a8b`. CI target: GitHub Actions,
as corrected during the investigation. The research and pilot results below
describe the pre-migration setup. Production commands are now documented in
the [browser test README](../packages/visual-tests/README.md). This report is
not an approved architecture decision.

## Recommendation

Use **Playwright Test** for visual regression and browser interaction tests.
First, serve the existing static Storybook and keep its story IDs. Do not make a
Storybook upgrade a prerequisite. Keep Stencil spec tests and existing core E2E
tests until their coverage is mapped; this pilot does not replace them.

Use native Playwright for fast local behavior checks. Use one pinned Linux image
for authoritative screenshot comparisons and baseline updates, locally and in
GitHub Actions. This removes the legacy browser container orchestration, not the
option to use a container for repeatable rendering.

Pin `@playwright/test` to `1.63.0`, with its lockfile, and the matching image
`mcr.microsoft.com/playwright:v1.63.0-noble`. The pilot resolved Chromium
`153.0.8010.12`, revision `1243`, and used the default Chromium headless shell.
Do not use system Chrome or an unpinned `latest` image for baseline generation.
[Browser versions](https://playwright.dev/docs/browsers) and
[image version matching](https://playwright.dev/docs/docker#image-tags).

## Current Setup

- [Legacy visual package](https://github.com/telekom/scale/blob/c4e721124f9c33febc75bfb9bde24193eda15a8b/packages/visual-tests/package.json): Jest 26,
  Puppeteer 13, `jest-puppeteer-docker` 1.4.2, Chromium revision `1055161`
  (legacy Chromium 108), and `--forceExit`.
- The installed dependency path is `jest-puppeteer-docker -> docker-chromium`.
  Its `dockerRun` always calls `dockerBuild`, with `docker-compose build --pull`,
  before starting Chromium and connecting over CDP. Docker may reuse layers,
  but this is still a build step on each invocation.
- The visual harness is not based on the `testcontainers` package. Public npm
  metadata does not mark these two legacy container packages as deprecated.
  Their transitive `request` and `request-promise-native` dependencies are
  explicitly deprecated. Distinguish these facts from an unsupported claim that
  Testcontainers itself is deprecated.
  [Container package metadata](https://registry.npmjs.org/docker-chromium/1.4.2),
  [request metadata](https://registry.npmjs.org/request/2.88.2), and
  [request-promise-native metadata](https://registry.npmjs.org/request-promise-native/1.0.9).
- [Legacy setup](https://github.com/telekom/scale/blob/c4e721124f9c33febc75bfb9bde24193eda15a8b/packages/visual-tests/setup.js) serves copied Storybook on port
  3123; the browser reaches it through `host.docker.internal`.
  [Legacy helpers](https://github.com/telekom/scale/blob/c4e721124f9c33febc75bfb9bde24193eda15a8b/packages/visual-tests/test-environment-setup.js) share a global
  page, change Storybook's root ID, disable motion, and take body screenshots.
- There are 38 visual spec files and 464 stored PNGs. Nine files contain a
  top-level `describe.skip`, including both deprecated and current components.
  Fixed waits range from 300 ms to 5 seconds and run repeatedly across variants
  and themes. These are improvement targets, not a measured speedup.
- [Storybook](../packages/storybook-vue/package.json) is Vue 2 / Storybook 6.4
  with Webpack. A modern Vitest Storybook addon is not a drop-in replacement.
- [GitHub workflow](../.github/workflows/build-pr.yml) builds components and
  Storybook in the visual job, copies the output, then runs `test:ci -u`.
  Its `components-cache` and `storybook-cache` conditions reference missing
  step IDs. Other jobs also generate/build components.
- Current CI detects updated images through `scripts/porcelain.sh` and can
  create a snapshot PR. It does not silently approve visual changes. Still,
  ordinary checks should compare, not generate updates. The obsolete-snapshot
  reporter can delete snapshots not touched by a filtered run; do not use that
  cleanup mode in sharded or component-only runs.

## Provider Evidence

There is no single runner used by all Web Component libraries. These are observed
configurations, not comparative performance results.

| Provider                                                                                                                                                       | Observed practice                                                                               | Lesson for Scale                                                      |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| [FAST](https://github.com/microsoft/fast/blob/37734050ee0b61e9ea58a567882359ed5ab78eb6/packages/fast-element/playwright.config.ts)                             | Playwright Test, Chromium/Firefox/WebKit, test server                                           | Direct browser tests work independently of Storybook.                 |
| [Web Awesome](https://github.com/shoelace-style/webawesome/blob/cfb097fa5ed844c7f6d1a3a4103443584867a795/packages/webawesome/web-test-runner.config.js)        | Web Test Runner with Playwright launchers, Chromium/Firefox; WebKit outside CI; Lit SSR tooling | WTR is a credible browser component-test runner, not obsolete.        |
| [Spectrum, first generation](https://github.com/adobe/spectrum-web-components/blob/ec927699bf878a344a68518d5de346f06dc464ae/1st-gen/web-test-runner.config.js) | WTR, three browsers, visual-regression plugin                                                   | Behavior and image tests can share fixtures without a hosted service. |
| [Vaadin](https://github.com/vaadin/web-components/blob/506a7e0c3889d76cc49b6ece50dba657d551d0e9/.github/workflows/visual-tests.yml)                            | WTR visual tests in a pinned Playwright GitHub job container; failure artifacts                 | A fixed browser/OS image is useful regardless of the test runner.     |

WTR runs test code inside the browser; its
[Playwright launcher](https://modern-web.dev/docs/test-runner/browser-launchers/playwright/)
is not Playwright Test. It is a reasonable alternative for extensive in-browser
fixture tests, but requires another screenshot/reporting integration and changes
more of Scale's current page-driven tests. Playwright Test is the smaller first
migration for this repository. Do not copy the WTR documentation's historical
GitHub Action advice; use the current Playwright CI documentation.

Do not adopt `@storybook/test-runner` as the new long-term runner:
[official support ended and its repository was archived on 2026-09-30](https://github.com/storybookjs/test-runner).
The [Vitest addon](https://storybook.js.org/docs/writing-tests/integrations/vitest-addon)
requires a Vite-based Storybook framework. Reconsider it after a separate
Storybook/framework migration. Hosted visual services can improve review UX,
but introduce a service dependency and do not meet the same fully local workflow.

## Pilot and Results

The detached worktree is
`C:/Users/A200005483/workspaces/.worktrees/scale-visual-modernization`.
The temporary pilot config and tests left the production manifest, lockfile,
runner, workflow, and snapshots unchanged during research. They have since been
replaced by the production [Playwright config](../packages/visual-tests/playwright.config.js)
and [native interaction cases](../packages/visual-tests/src/components.interaction.spec.js).

The pilot uses two existing stories, each in light and dark mode. It checks button
keyboard focus/Space activation and checkbox state changes. Each test also makes
two named captures: eight baselines per platform. It uses fresh browser contexts,
theme initialization before navigation, Stencil `componentOnReady`, font/image
readiness, role locators through open shadow roots, and no fixed waits.

The checkbox's label covers its native input. Direct `check()` correctly failed
the actionability check. Clicking the visible label passed; no forced click was
needed. Real Tab navigation is used for the focus capture.

| Environment                           | Final four-test run | Three repeats, 12 tests | Result     |
| ------------------------------------- | ------------------- | ----------------------- | ---------- |
| Windows, native Chromium, two workers | 10.6 s              | 9.1 s                   | All passed |
| Linux, pinned image, one worker       | 5.2 s               | 11.0 s                  | All passed |

The documented local Docker command also passed four tests, with updates
disabled, in 14.6 s. That run served files through a Windows bind mount; the 5.2 s
Linux run used a container-local copy. This is an observed timing difference,
not an isolated filesystem benchmark. Consider staging the built artifact into
a container volume for local Linux checks, and measure preparation time too.

These are Playwright-reported run times, not full pipeline wall times. They exclude
component/Storybook builds, package installation, browser download, image pull,
and preparation/copy time. They are not a benchmark against the full legacy suite.
No screenshot differences were reported on repeated same-platform runs with
`threshold: 0` and `maxDiffPixels: 0`; pixelmatch still has its own antialias rules.

The image used Node `24.20.0` and Yarn `1.22.22`, which match the repository's major
requirements. Its pulled image digest was
`sha256:eff16c30e6f3f4af0a03fa4b706120d5e9b0891c344a27d64559aff5900a4a27`.
For production, pin the verified platform image digest as well as the version.

Evidence limit: the pilot copied an existing generated Storybook artifact from
the original checkout. It did not build that artifact from the worktree's exact
HEAD. It proves runner compatibility with that artifact, not exact-commit build
reproducibility. No remote GitHub Actions run or full-suite migration was done.

## Chromium and Baseline Policy

Chromium 108 to 153 is a large change. CSS/layout behavior, fonts, rasterization,
native controls, focus styles, and old/new headless implementations can change
images. Package upgrades must include explicit browser and baseline review.
Do not keep the old browser indefinitely or hide churn with broad tolerances.
[Playwright rendering warning](https://playwright.dev/docs/test-snapshots).

The pilot's Windows/Linux screenshots had equal dimensions but **264-487 raw
RGBA pixel differences**, even with the same Playwright/browser version and
artifact. This measures environment differences, not a Chromium-only regression.
We did not isolate or quantify Chromium 108 versus 153 changes on identical OS,
fonts, headless mode, and source.

1. Choose Linux x86-64, one image digest, and default headless shell as the
   canonical screenshot environment. A developer on ARM must use the same
   architecture for authoritative updates; measure emulation cost separately.
2. Pin package, browser revision, OS image, bundled font files, viewport, DPR,
   locale, timezone, theme, and animation policy. Preserve today's 1040 x 768
   viewport and body crop first. Cropping differently is a separate change.
3. Fail on missing font/asset loads; `document.fonts.ready` alone does not prove
   the intended font loaded. Keep assets local and avoid external requests.
4. Generate and approve a new modern-browser baseline set in a dedicated
   migration change, with old/new captures available for review. Keep component
   feature changes out of that baseline change. Update package and image together.
5. Store story/state/theme/viewport names explicitly. Keep canonical Linux
   baselines in Git; do not commit Windows pilot baselines as another authority.
6. Run normal CI with `--update-snapshots=none`, including for missing baselines.
   Use explicit, trusted manual baseline updates with human diff review.
   Do not delete obsolete baselines from a partial or sharded run.
7. Keep a small upgrade canary covering text/fonts, icons, focus, popup positioning,
   date picker, tables, both themes, and mobile layouts. Promote a browser upgrade
   only after the full screenshot suite has been reviewed.

## GitHub Actions Target

First run one browser job with one worker. Measure full-suite runtime before
adding two to four shards. More workers can compete for CPU and make tests less
stable. [Worker guidance](https://playwright.dev/docs/ci#workers) and
[matrix sharding/report merging](https://playwright.dev/docs/test-sharding).

- Build/generate once per candidate SHA in a Node 24 job; upload the static
  Storybook as an artifact. Each browser job downloads that exact artifact.
  Cache dependency downloads by lockfile/OS/Node, not generated Storybook from
  another commit. Artifact reuse and dependency caching solve different problems.
- Run the browser job inside the pinned Playwright image. Server and browser
  share localhost; no `host.docker.internal`, Docker Compose alias, nested Docker,
  Docker socket mount, or Testcontainers is needed.
- Install JS dependencies with a frozen Yarn lockfile. The image contains
  browsers/system libraries, not the project's `@playwright/test` npm package.
  Prefer the preinstalled browsers over an additional browser cache.
- Upload diffs, actual/expected images, traces, and reports on failure. Give shard
  artifacts unique names. Merge blob reports in a final job if sharding is used.
- Keep pull-request checks read-only. Do not run untrusted PR code through
  `pull_request_target` with secrets or add an automatic snapshot approval step.

The following is a **target-state sketch**, not an installed workflow. It assumes
the pilot dependencies have been adopted in the visual workspace's manifest and
lockfile and canonical Linux baselines are committed. The producer named
`storybook-build` must build/copy and upload `storybook-${{ github.sha }}`.

```yaml
visual-tests:
  needs: storybook-build
  runs-on: ubuntu-22.04
  permissions:
    contents: read
  container:
    image: mcr.microsoft.com/playwright:v1.63.0-noble
    options: --ipc=host
  env:
    PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD: '1'
    PUPPETEER_SKIP_CHROMIUM_DOWNLOAD: 'true'
  steps:
    - uses: actions/checkout@v6
    - uses: actions/setup-node@v6
      with:
        node-version: 24
        cache: yarn
    - run: yarn install --frozen-lockfile
    - uses: actions/download-artifact@v5
      with:
        name: storybook-${{ github.sha }}
        path: packages/visual-tests/storybook-static
    - run: >-
        yarn workspace @telekom/scale-visual-tests playwright test
        --config=modernization-poc/playwright.config.cjs
        --workers=1 --update-snapshots=none
    - uses: actions/upload-artifact@v5
      if: ${{ !cancelled() }}
      with:
        name: visual-results
        path: |
          packages/visual-tests/modernization-poc/report
          packages/visual-tests/modernization-poc/test-results
```

Use a verified digest in the installed workflow. Remove the transitional
Puppeteer download suppression after the legacy dependency is removed.
[Current official container workflow](https://playwright.dev/docs/ci#via-containers).

## Migration and Acceptance

1. Build this pilot from the exact candidate source, then verify it in a real
   GitHub Actions job using the same pinned image and artifact contract.
2. Map all 38 legacy files, states, themes, and 464 images to named modern tests.
   Preserve intentional deprecated exclusions. Restore skipped current-component
   coverage deliberately; do not count a smaller suite as a performance win.
3. Separate fast behavior tests from visual captures so native local behavior
   runs need no Docker or screenshots. Include keyboard/ARIA/focus, emitted
   events, disabled/error states, forms and slots. Add axe checks as a separate
   assertion; screenshots are not accessibility tests. Add Firefox/WebKit
   behavior smoke coverage, without tripling all screenshot baselines initially.
4. Remove fixed sleeps in favor of the relevant state: checked value, expanded
   popup, visible content, resolved data, hydrated component, or stable screenshot.
   Readiness must include nested/portal components where a story needs them.
5. Approve the modern browser baseline set separately. Run the full mapped suite
   repeatedly with updates disabled and verify a deliberate style change fails.
6. Remove obsolete Jest/Puppeteer visual dependencies, global helpers, Compose
   setup, custom HTML reporter, and obsolete-snapshot cleanup only when parity
   is demonstrated. Update the workspace scripts and lockfile together.
7. Measure cold and warm dependency setup, build time, image pull, browser/server
   startup, test execution, artifact transfer, failure rate, and end-to-end CI
   wall time. Accept speed claims only for equivalent coverage. Consider small
   built-component HTML fixtures later if Storybook remains the main cost.

## Historical Pilot Commands

These commands document the removed research-only pilot, not the production
workflow. Use the [browser test README](../packages/visual-tests/README.md) for
current commands. The original npm installs were proof-only, under an
ignored subdirectory; they do not change the monorepo's Yarn lockfile.
Build components and Storybook from this checkout and run the existing `copy`
script first for exact-source validation. The measured runs instead reused a
previously generated artifact, as noted above.

```sh
npm install --prefix packages/visual-tests/modernization-poc --no-save --package-lock=false --workspaces=false @playwright/test@1.63.0 http-server@14.1.1
node packages/visual-tests/modernization-poc/node_modules/@playwright/test/cli.js install chromium
node packages/visual-tests/modernization-poc/node_modules/@playwright/test/cli.js test --config=packages/visual-tests/modernization-poc/playwright.config.cjs --update-snapshots
node packages/visual-tests/modernization-poc/node_modules/@playwright/test/cli.js test --config=packages/visual-tests/modernization-poc/playwright.config.cjs --repeat-each=3 --update-snapshots=none
```

After installing the proof-only JS dependencies, compare against the pilot's
Linux baselines from the same worktree:

```sh
docker run --rm --init --ipc=host -e SCALE_POC_WORKERS=1 -v "$PWD:/work" -w /work mcr.microsoft.com/playwright:v1.63.0-noble node packages/visual-tests/modernization-poc/node_modules/@playwright/test/cli.js test --config=packages/visual-tests/modernization-poc/playwright.config.cjs --update-snapshots=none
```

Prefix this Docker command with `MSYS_NO_PATHCONV=1` in Git Bash on Windows.
Use `--update-snapshots` only for an intentional pilot baseline update.

On Git Bash, use `node.exe` if `node` resolves to an interactive wrapper. Set
`SCALE_POC_PORT` per worktree to prevent port conflicts; the default is 4173 and
the pilot will not attach to another worktree's server. `SCALE_POC_WORKERS`
controls concurrency. Linux evidence is under the ignored `baselines/linux` and
`linux-test-results` directories; native evidence uses `baselines/win32`.
The pilot starts and stops its server automatically; no permanent server remains.
