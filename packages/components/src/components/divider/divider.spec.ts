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
import { Divider } from './divider';

describe('Divider', () => {
  let element;
  beforeEach(async () => {
    element = new Divider();
  });

  it('should match snapshot', async () => {
    const page = await newSpecPage({
      components: [Divider],
      html: `<scale-divider></scale-divider>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('should match snapshot when horizontal false', async () => {
    const page = await newSpecPage({
      components: [Divider],
      html: `<scale-divider vertical=true></scale-divider>`,
    });
    expect(page.root.shadowRoot).toBeTruthy();
    expect(page.root).toMatchSnapshot();
  });

  it('should...', async () => {
    element.vertical = true;
    expect(element.getCssClassMap()).toContain('divider--vertical');
  });

  it('should handle style', async () => {
    const page = await newSpecPage({
      components: [Divider],
      html: `<scale-divider styles="color:blue;"></scale-divider>`,
    });
    expect(page.root).toMatchSnapshot();
  });
});
