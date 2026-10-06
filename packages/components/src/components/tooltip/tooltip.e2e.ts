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

describe('scale-tooltip', () => {
  it('keeps a bottom tooltip horizontally centered on an icon trigger near the viewport edge', async () => {
    const page = await newE2EPage();
    await page.setViewport({ width: 320, height: 240 });
    await page.setContent(`
      <div style="padding: 40px 0 0 36px;">
        <scale-tooltip opened placement="bottom" content="SEPA-Lastschrift">
          <span id="trigger" style="display:inline-flex;width:36px;height:36px;"></span>
        </scale-tooltip>
      </div>
    `);
    await page.waitForChanges();
    await page.evaluate(
      () => new Promise((resolve) => setTimeout(resolve, 100))
    );

    const geometry = await page.evaluate(() => {
      const trigger = document.querySelector('#trigger');
      const tooltip = document
        .querySelector('scale-tooltip')
        .shadowRoot.querySelector('[part="tooltip"]');
      const triggerRect = trigger.getBoundingClientRect();
      const tooltipRect = tooltip.getBoundingClientRect();

      return {
        gap: Math.round(tooltipRect.top - triggerRect.bottom),
        centerDelta: Math.round(
          tooltipRect.left +
            tooltipRect.width / 2 -
            (triggerRect.left + triggerRect.width / 2)
        ),
      };
    });

    expect(geometry.gap).toBe(10);
    expect(Math.abs(geometry.centerDelta)).toBeLessThanOrEqual(1);
  });
});
