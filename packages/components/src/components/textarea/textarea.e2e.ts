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

import { newE2EPage } from '@stencil/core/testing';

describe('scale-textarea', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<scale-textarea/>');
    const element = await page.find('scale-textarea');
    expect(element).toHaveClass('hydrated');
  });

  it('should have textarea--hide-label class when hide-label-visually is set', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<scale-textarea label="My Label" hide-label-visually></scale-textarea>'
    );
    const wrapper = await page.find('scale-textarea .textarea');
    expect(wrapper).toHaveClass('textarea--hide-label');
  });

  // optional
  it('should NOT have textarea--hide-label class when hide-label-visually is not set', async () => {
    const page = await newE2EPage();
    await page.setContent('<scale-textarea label="My Label"></scale-textarea>');
    const wrapper = await page.find('scale-textarea .textarea');
    expect(wrapper).not.toHaveClass('textarea--hide-label');
  });
});
