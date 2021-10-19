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
      page.root.maxRating = 7;
      page.root.max = 7;
      page.root.minRating = 0;
      page.root.rating = 4;
      page.root.starSize = 'small';
      page.root.size = 'small';
      page.root.disabled = true;
      page.root.ariaLabelTranslation = '$value aus $max Sternen';
      page.root.label = 'Rating Label';
      await page.waitForChanges();
      expect(page.rootInstance.maxRating).toBe(7);
      expect(page.rootInstance.max).toBe(7);
      expect(page.rootInstance.minRating).toBe(0);
      expect(page.rootInstance.rating).toBe(4);
      expect(page.rootInstance.starSize).toBe('small');
      expect(page.rootInstance.size).toBe('small');
      expect(page.rootInstance.disabled).toBe(true);
      expect(page.rootInstance.ariaLabelTranslation).toBe(
        '$value aus $max Sternen'
      );
      expect(page.rootInstance.label).toBe('Rating Label');
    });
  });

  describe('snapshots', () => {
    it('rating 2', async () => {
      page = await newSpecPage({
        components: [RatingStars],
        html: `<scale-rating-stars rating="2"></scale-rating-stars>`,
      });
      expect(page.root).toMatchSnapshot();
    });

    it('rating 3, minRating 1', async () => {
      page = await newSpecPage({
        components: [RatingStars],
        html: `<scale-rating-stars rating="3" min-rating="1"></scale-rating-stars>`,
      });
      expect(page.root).toMatchSnapshot();
    });

    it('rating 2, maxRating 7', async () => {
      page = await newSpecPage({
        components: [RatingStars],
        html: `<scale-rating-stars rating="2" max-rating="7"></scale-rating-stars>`,
      });
      expect(page.root).toMatchSnapshot();
    });

    it('rating 3, disabled', async () => {
      page = await newSpecPage({
        components: [RatingStars],
        html: `<scale-rating-stars disabled></scale-rating-stars>`,
      });
      expect(page.root).toMatchSnapshot();
    });
    it('deprecated overwrite actual props', async () => {
      page = await newSpecPage({
        components: [RatingStars],
        html: `<scale-rating-stars max-rating="12" star-size="small"></scale-rating-stars>`,
      });
      expect(page.root).toMatchSnapshot();
      expect(page.rootInstance.max).toBe(12);
      expect(page.rootInstance.size).toBe('small');
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
