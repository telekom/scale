/**
 * @license
 * Scale https://github.com/telekom/scale
 *
 * Copyright (c) 2021 Egor Kirpichev and contributors, Deutsche Telekom AG
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { newSpecPage } from '@stencil/core/testing';
import { ProgressBar } from './progress-bar';

describe('ProgressBar', () => {
  let element;
  beforeEach(async () => {
    element = new ProgressBar();
  });

  it('should match snapshot', async () => {
    const page = await newSpecPage({
      components: [ProgressBar],
      html: `<scale-progress-bar>Label</scale-progress-bar>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('should match snapshot with label set', async () => {
    const page = await newSpecPage({
      components: [ProgressBar],
      html: `<scale-progress-bar label="testLabel">Label</scale-progress-bar>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('should match snapshot with statusDescription set', async () => {
    const page = await newSpecPage({
      components: [ProgressBar],
      html: `<scale-progress-bar status-description="statusDescription">Label</scale-progress-bar>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('should match snapshot with statusInside set', async () => {
    const page = await newSpecPage({
      components: [ProgressBar],
      html: `<scale-progress-bar status-inside>Label</scale-progress-bar>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('should match snapshot with percentage set', async () => {
    const page = await newSpecPage({
      components: [ProgressBar],
      html: `<scale-progress-bar percentage="18">Label</scale-progress-bar>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('should have css property width 24px when stroke width is set to 24', async () => {
    const page = await newSpecPage({
      components: [ProgressBar],
      html: `<scale-progress-bar stroke-width=24>Label</scale-progress-bar>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('should contain progress-bar-text css class when show text is set true', async () => {
    const page = await newSpecPage({
      components: [ProgressBar],
      html: `<scale-progress-bar show-status=true>Label</scale-progress-bar>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('should contain progress-bar-inner-text css class when text inside is set true', async () => {
    const page = await newSpecPage({
      components: [ProgressBar],
      html: `<scale-progress-bar text-inside=true>Label</scale-progress-bar>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  // Does not effect coverage
  it('this.progressBarId is set on componentWillLoad() -> SpecPage', async () => {
    const page = await newSpecPage({
      components: [ProgressBar],
      html: `<scale-progress-bar>Label</scale-progress-bar>`,
    });
    page.root.progressBarId = null;
    await page.rootInstance.componentWillLoad();
    expect(page.rootInstance.progressBarId.substr(0, 13)).toBe('progress-bar-');
  });

  it('should handle css classes -> hasError', () => {
    element.hasError = true;
    expect(element.getCssClassMap()).toContain('progress-bar--has-error');
  });

  it('should handle css classes -> disabled', () => {
    element.disabled = true;
    expect(element.getCssClassMap()).toContain('progress-bar--disabled');
  });

  it('should handle basePart classes -> hasError', () => {
    element.hasError = true;
    expect(element.getBasePartMap()).toContain('has-error');
  });

  it('should handle basePart classes -> disabled', () => {
    element.disabled = true;
    expect(element.getBasePartMap()).toContain('disabled');
  });

  // Does not effect coverage
  it('this.progressBarId is set on componentWillLoad() -> element', () => {
    // element.progressBarId = null;
    element.componentWillLoad();
    expect(element.progressBarId.substr(0, 13)).toBe('progress-bar-');
  });

  // Does not effect coverage
  it('test function progressStyle()', () => {
    const style = {
      width: '20%',
      border: '1px solid transparent',
      background: 'magenta',
      animation: 'showProgress 3s ease-in-out',
    };
    element.percentage = 20;
    element.customColor = 'magenta';
    expect(JSON.stringify(element.progressStyle())).toBe(JSON.stringify(style));
  });

  // Does not effect coverage
  it('test function transitions()', () => {
    expect(element.transitions(100)).toContain('width: 100%');
  });
});
