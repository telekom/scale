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

import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { RatingStars } from './rating-stars';

describe('RatingStars', () => {
  let page: SpecPage;

  describe('props', () => {
    beforeEach(async () => {
      page = await newSpecPage({
        components: [RatingStars],
        html: `<scale-rating-stars></scale-rating-stars>`,
      });
    });

    it('check non default props', async () => {
      page.root.maxValue = 7;
      page.root.minValue = 1;
      page.root.value = 4;
      page.root.starSize = 'small';
      page.root.disabled = true;
      page.root.ariaLabelTranslation = '$value aus $maxValue Sternen';
      page.root.label = 'Rating Label';
      await page.waitForChanges();
      expect(page.rootInstance.maxValue).toBe(7);
      expect(page.rootInstance.minValue).toBe(1);
      expect(page.rootInstance.value).toBe(4);
      expect(page.rootInstance.starSize).toBe('small');
      expect(page.rootInstance.disabled).toBe(true);
      expect(page.rootInstance.ariaLabelTranslation).toBe(
        '$value aus $maxValue Sternen'
      );
      expect(page.rootInstance.label).toBe('Rating Label');
    });
  });

  describe('snapshots', () => {
    it('rating 2', async () => {
      page = await newSpecPage({
        components: [RatingStars],
        html: `<scale-rating-stars value="2"></scale-rating-stars>`,
      });
      expect(page.root).toMatchSnapshot();
    });

    it('rating 3, minValue 1', async () => {
      page = await newSpecPage({
        components: [RatingStars],
        html: `<scale-rating-stars value="3" minValue="1"></scale-rating-stars>`,
      });
      expect(page.root).toMatchSnapshot();
    });

    it('rating 2, maxValue 7', async () => {
      page = await newSpecPage({
        components: [RatingStars],
        html: `<scale-rating-stars value="2" max-value="7"></scale-rating-stars>`,
      });
      expect(page.root).toMatchSnapshot();
    });

    it('rating 4, disabled', async () => {
      page = await newSpecPage({
        components: [RatingStars],
        html: `<scale-rating-stars disabled></scale-rating-stars>`,
      });
      expect(page.root).toMatchSnapshot();
    });
  });

  describe('emitter', () => {
    beforeEach(async () => {
      page = await newSpecPage({
        components: [RatingStars],
        html: `<scale-rating-stars></scale-rating-stars>`,
      });
    });

    /* Error Message: TypeError: ev.composedPath is not a function

    it('should change rating mouseUp', async () => {
      expect(page.rootInstance.value).toBe(3);
      const ratingStarTwo = page.root.shadowRoot.querySelector(
        '[data-value="2"]'
      );
      console.log(ratingStarTwo.getAttribute('data-value'));
      await page.waitForChanges();
      ratingStarTwo.dispatchEvent(
        new MouseEvent('mouseup', {
          view: window,
          bubbles: true,
          cancelable: true,
        })
      );
      await page.waitForChanges();
      expect(page.rootInstance.value).toBe(2);
    }); 
*/
  });
});
