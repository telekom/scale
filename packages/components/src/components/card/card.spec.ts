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
import { Card } from './card';

describe('Card', () => {
  it('should match snapshot', async () => {
    const page = await newSpecPage({
      components: [Card],
      html: `<scale-card>Label</scale-card>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('should handle to prop', async () => {
    const page = await newSpecPage({
      components: [Card],
      html: `<scale-card to="adresse">Label</scale-card>`,
    });
    expect(page.rootInstance.to).toBe('adresse');
    expect(page.root).toMatchSnapshot();
  });

  it('should handle target prop', async () => {
    const page = await newSpecPage({
      components: [Card],
      html: `<scale-card target="card target">Label</scale-card>`,
    });
    expect(page.rootInstance.target).toBe('card target');
    expect(page.root).toMatchSnapshot();
  });

  it('should handle rel prop', async () => {
    const page = await newSpecPage({
      components: [Card],
      html: `<scale-card rel="card rel">Label</scale-card>`,
    });
    expect(page.rootInstance.rel).toBe('card rel');
    expect(page.root).toMatchSnapshot();
  });

  it('should handle label prop', async () => {
    const page = await newSpecPage({
      components: [Card],
      html: `<scale-card label="card label">Label</scale-card>`,
    });
    expect(page.rootInstance.label).toBe('card label');
    expect(page.root).toMatchSnapshot();
  });
});
