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
import { HelperText } from './helper-text';

describe('Helper Text', () => {
  it('should render informational helper text with info icon if no variant is specified', async () => {
    const page = await newSpecPage({
      components: [HelperText],
      html: `<scale-helper-text>informational</scale-helper-text>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('should render informational helper text with info icon if informational variant is specified', async () => {
    const page = await newSpecPage({
      components: [HelperText],
      html: `<scale-helper-text variant="informational">informational</scale-helper-text>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('should render warning text with warning icon if warning variant is specified', async () => {
    const page = await newSpecPage({
      components: [HelperText],
      html: `<scale-helper-text variant="warning">warning</scale-helper-text>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('should render danger text with danger icon if dange variant is specified', async () => {
    const page = await newSpecPage({
      components: [HelperText],
      html: `<scale-helper-text variant="danger">danger</scale-helper-text>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('should render success text with success icon if success variant is specified', async () => {
    const page = await newSpecPage({
      components: [HelperText],
      html: `<scale-helper-text variant="success">success</scale-helper-text>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('should render neutral text without icon if neutral variant is specified', async () => {
    const page = await newSpecPage({
      components: [HelperText],
      html: `<scale-helper-text variant="neutral">neutral</scale-helper-text>`,
    });
    expect(page.root).toMatchSnapshot();
  });
});
