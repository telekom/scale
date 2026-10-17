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

describe('scale-slider', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<scale-slider/>');
    const element = await page.find('scale-slider');
    expect(element).toHaveClass('hydrated');
  });

  it('updates its value when the thumb is dragged', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<scale-slider label="Volume" value="20"></scale-slider>'
    );
    const element = await page.find('scale-slider');
    const change = await element.spyOnEvent('scale-change');
    const { trackBounds, thumbBounds } = await page.$eval(
      'scale-slider',
      (component) => {
        const track = component.shadowRoot.querySelector('[part="track"]');
        const thumb = component.shadowRoot.querySelector(
          '[part="thumb-wrapper"]'
        );
        const trackRect = track.getBoundingClientRect();
        const thumbRect = thumb.getBoundingClientRect();
        return {
          trackBounds: {
            x: trackRect.x,
            width: trackRect.width,
          },
          thumbBounds: {
            x: thumbRect.x,
            y: thumbRect.y,
            width: thumbRect.width,
            height: thumbRect.height,
          },
        };
      }
    );

    await page.mouse.move(
      thumbBounds.x + thumbBounds.width / 2,
      thumbBounds.y + thumbBounds.height / 2
    );
    await page.mouse.down();
    await page.mouse.move(
      trackBounds.x + trackBounds.width * 0.8,
      thumbBounds.y,
      {
        steps: 4,
      }
    );
    await page.mouse.up();
    await page.waitForChanges();

    expect(element.getAttribute('value')).not.toBe('20');
    expect(change).toHaveReceivedEvent();
  });
});
