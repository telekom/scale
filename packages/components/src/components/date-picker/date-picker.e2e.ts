/**
 * @license
 * Scale https://github.com/telekom/scale
 *
 * Copyright (c) 2026 Umut Alisoglu
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { newE2EPage } from '@stencil/core/testing';

describe('scale-date-picker', () => {
  it('keeps a visually hidden label as the accessible name', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<scale-date-picker label="Start date" hide-label-visually></scale-date-picker>'
    );
    await page.waitForSelector('scale-date-picker .duet-date__input');
    const input = await page.$('scale-date-picker .duet-date__input');
    expect(await page.accessibility.snapshot({ root: input })).toMatchObject({
      name: 'Start date',
    });
    const size = await page.$eval(
      'scale-date-picker .date-picker__label',
      (label) => {
        const rect = label.getBoundingClientRect();
        return { width: rect.width, height: rect.height };
      }
    );
    expect(size.width).toBeLessThanOrEqual(1);
    expect(size.height).toBeLessThanOrEqual(1);

    await input.focus();
    await page.waitForChanges();
    expect(await page.accessibility.snapshot({ root: input })).toMatchObject({
      name: 'Start date',
    });

    const element = await page.find('scale-date-picker');
    element.setProperty('hideLabelVisually', false);
    await page.waitForChanges();
    expect(await page.accessibility.snapshot({ root: input })).toMatchObject({
      name: 'Start date',
    });
    expect(
      await page.$eval(
        'scale-date-picker .date-picker__label',
        (label) => label.getBoundingClientRect().height
      )
    ).toBeGreaterThan(1);
  });
});
