---
name: Component development life cycle
about: Track all phases of a component, from idea into completion
title: 'Component: …'
labels: component life cycle
assignees: ''

---

- This document must be updated throughout the process.
- References to pending or merged PRs in each phase should be included. 
- This can be closed once the component is 100% done.

## (0) Requirements

Determine the component requirements and confirm it qualifies as candidate for the core library.

- [ ] Research
- [ ] Team agrees on requirements

## (1) Design

Visually design and integrate the component into the system, and define its specification in terms of variants and states.

- [ ] Team agrees on completeness
- [ ] Naming is consistent
- [ ] Tokens used
- [ ] Assets with variants and states

## (2) Implementation (npm beta)

Implement the component, fully working, and publish it to NPM marked as "beta".

- [ ] Tokens used 
- [ ] Automated (spec and e2e) and visual tests
- [ ] Manual cross-browser tests
- [ ] Accessibility considerations
- [ ] `beta` console message
- [ ] Released on npm

## (3) Storybook (beta)

Consolidate the component stories in Storybook and publish them in the "beta" section, including a first version of the Usage text.

- [ ] Stories
- [ ] Usage placeholder (component name and beta notice)

## (4) Usage Text

Finish and translate full Usage documentation in Storybook, archive a backup.

- [ ] Text and images
- [ ] Translations
- [ ] Backup archived

## (5) Generated Sketch Assets

Make the component available in the generated Sketch library.

- [ ] Working Sketch assets
- [ ] Naming is consistent and spec is fully met
- [ ] Sketch RSS

## (6) Full release

Remove "beta" mark from component after extensive testing and bug fixing, and AA certification has been granted by T-Systems MMS. 

- [ ] Accessibility AA Certification by MMS
- [ ] All `beta` marks removed
