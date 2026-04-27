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

describe('scale-modal', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<scale-modal>Notification</scale-modal>');
    const element = await page.find('scale-modal');
    expect(element).toHaveClass('hydrated');
  });

  it('shows a visible border in dark mode', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<scale-modal opened="true">Notification</scale-modal>'
    );
    await page.evaluate(() => {
      document.body.dataset.mode = 'dark';
    });
    await page.waitForChanges();

    const borderStyles = await page.$eval(
      'scale-modal',
      (element: HTMLElement) => {
        const modalWindow = element.shadowRoot.querySelector(
          '.modal__window'
        ) as HTMLElement;
        const styles = getComputedStyle(modalWindow);

        return {
          borderTopColor: styles.borderTopColor,
          borderTopStyle: styles.borderTopStyle,
          borderTopWidth: styles.borderTopWidth,
        };
      }
    );

    expect(borderStyles.borderTopWidth).toBe('1px');
    expect(borderStyles.borderTopStyle).toBe('solid');
    expect(borderStyles.borderTopColor).toBe('rgba(255, 255, 255, 0.4)');
  });
});
