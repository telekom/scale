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

async function simulateMouseEvent(
  page: SpecPage,
  strEvent: string,
  selector: string
) {
  const event = new MouseEvent(strEvent, {
    view: window,
    bubbles: true,
    cancelable: true,
  });
  const element = page.root.shadowRoot.querySelector(selector);
  const cancelled = !element.dispatchEvent(event);

  let value = 0;
  if (cancelled) {
    value = value + 1;
  } else {
    value = value + 2;
  }
}

async function simulateKeyboardEvent(
  page: SpecPage,
  strEvent: string,
  selector: string,
  key: string
) {
  const event = new KeyboardEvent(strEvent, {
    view: window,
    bubbles: true,
    cancelable: true,
    key,
  });
  const element = page.root.shadowRoot.querySelector(selector);
  const cancelled = !element.dispatchEvent(event);

  let value = 0;
  if (cancelled) {
    value = value + 1;
  } else {
    value = value + 2;
  }
}

describe('RatingStars', () => {
  let page: SpecPage;

  it('builds', () => {
    expect(new RatingStars()).toBeTruthy();
  });
  describe('props', () => {
    beforeEach(async () => {
      page = await newSpecPage({
        components: [RatingStars],
        html: `<scale-rating-stars></scale-rating-stars>`,
      });
    });

    it('has all props', async () => {
      page.root.max = 7;
      page.root.value = 3;
      page.root.small = true;
      page.root.color = '#00ff00';
      page.root.ariaLabelTranslation = '3 out of 7 stars';
      page.root.precision = 1;
      await page.waitForChanges();
      expect(page.rootInstance.max).toBe(7);
      expect(page.rootInstance.value).toBe(3);
      expect(page.rootInstance.small).toBe(true);
      expect(page.rootInstance.ariaLabelTranslation).toBe('3 out of 7 stars');
      expect(page.rootInstance.precision).toBe(1);
    });

    it('isHovering is set to false on Mouseleave', async () => {
      simulateMouseEvent(page, 'mouseleave', '.rating');
      expect(page.rootInstance.isHovering).toBe(false);
    });

    it('isHovering is set to true on Mouseenter', async () => {
      simulateMouseEvent(page, 'mouseenter', '.rating');
      expect(page.rootInstance.isHovering).toBe(true);
    });

    it('change rating on keydown (ArrowLeft/ArrowRight) ', async () => {
      const precision: number = page.rootInstance.precision;
      expect(await page.rootInstance.value).toBe(0);
      simulateKeyboardEvent(page, 'keydown', '.rating', 'ArrowRight');
      simulateKeyboardEvent(page, 'keydown', '.rating', 'ArrowRight');
      simulateKeyboardEvent(page, 'keydown', '.rating', 'ArrowLeft');
      const result = 0 + precision + precision - precision;
      expect(await page.rootInstance.value).toBe(result);
    });
  });

  describe('functions', () => {
    it('roundToPrecision(5, 1) returns 5', () => {
      const component = new RatingStars();
      expect(component.roundToPrecision(5, 1) as any).toBe(5);
    });
    it('handleMouseEnter sets hovering to true', () => {
      const component = new RatingStars();
      component.handleMouseEnter();
      expect(component.isHovering).toBe(true);
    });
    it('handleMouseLeave sets hovering to false', () => {
      const component = new RatingStars();
      component.isHovering = true;
      component.handleMouseLeave();
      expect(component.isHovering).toBe(false);
    });
  });

  describe('snapshots', () => {
    it('rating 0 should match snapshot', async () => {
      page = await newSpecPage({
        components: [RatingStars],
        html: `<scale-rating-stars value="0"></scale-rating-stars>`,
      });
      expect(page.root).toMatchSnapshot();
    });

    it('rating 3 should match snapshot', async () => {
      page = await newSpecPage({
        components: [RatingStars],
        html: `<scale-rating-stars value="3"></scale-rating-stars>`,
      });
      expect(page.root).toMatchSnapshot();
    });

    it('rating 2 and disabled should match snapshot', async () => {
      page = await newSpecPage({
        components: [RatingStars],
        html: `<scale-rating-stars value="2" disabled></scale-rating-stars>`,
      });
      expect(page.root).toMatchSnapshot();
    });

    it('rating 4 and small should match snapshot', async () => {
      page = await newSpecPage({
        components: [RatingStars],
        html: `<scale-rating-stars value="4" small></scale-rating-stars>`,
      });
      expect(page.root).toMatchSnapshot();
    });
  });
  describe('has css classes', () => {
    it('has class rating', () => {
      const element = new RatingStars();
      expect(element.getCssClassMap()).toContain('rating');
    });

    it('has class rating--disabled', () => {
      const element = new RatingStars();
      element.disabled = true;
      expect(element.getCssClassMap()).toContain('rating--disabled');
    });

    it('has class rating--hover', () => {
      const element = new RatingStars();
      element.isHovering = true;
      expect(element.getCssClassMap()).toContain('rating--hover');
    });
  });

  describe('emitter', () => {
    beforeEach(async () => {
      page = await newSpecPage({
        components: [RatingStars],
        html: `<scale-rating-stars></scale-rating-stars>`,
      });
    });

    it('should set isHovering to false onClick', async () => {
      page.rootInstance.isHovering = true;
      const ratingStars = page.root.shadowRoot.querySelector('.rating');
      await page.waitForChanges();
      ratingStars.dispatchEvent(new Event('click'));
      await page.waitForChanges();
      expect(page.rootInstance.isHovering).toBe(false);
    });

    it('should change rating onKeyDown', async () => {
      page.rootInstance.value = 1;
      const ratingStars = page.root.shadowRoot.querySelector('.rating');
      await page.waitForChanges();
      ratingStars.dispatchEvent(
        new KeyboardEvent('keydown', {
          view: window,
          bubbles: true,
          cancelable: true,
          key: 'ArrowRight',
        })
      );
      await page.waitForChanges();
      expect(page.rootInstance.value).toBe(2);
    });
  });
});
