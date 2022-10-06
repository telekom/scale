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

  it('check props', async () => {
    const page = await newSpecPage({
      components: [ProgressBar],
      html: `
        <scale-progress-bar 
          label="testLabel"
          status-description="statusDescription"
          status-inside
          percentage-start="5"
          percentage="18"
          text-inside 
          stroke-width=24
          show-status
          styles="color:blue;"
          >
            Label
        </scale-progress-bar>`,
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
    // element.progressBarId = 'null';
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
      height: '4px',
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
