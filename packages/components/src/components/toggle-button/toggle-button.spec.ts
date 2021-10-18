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
import { ToggleButton } from './toggle-button';

describe('Toggle Button', () => {
  let page: SpecPage;
  describe('snapshots', () => {
    it('default props', async () => {
      page = await newSpecPage({
        components: [ToggleButton],
        html: `<scale-toggle-button>Test</scale-toggle-button>`,
      });
      expect(page.root).toMatchSnapshot();
    });
    it('regular size secondary', async () => {
      page = await newSpecPage({
        components: [ToggleButton],
        html: `<scale-toggle-button size="regular" variant="secondary">Test</scale-toggle-button>`,
      });
      expect(page.root).toMatchSnapshot();
    });
    it('black color scheme', async () => {
      page = await newSpecPage({
        components: [ToggleButton],
        html: `<scale-toggle-button color-scheme="black">Test</scale-toggle-button>`,
      });
      expect(page.root).toMatchSnapshot();
    });
    it('disabled', async () => {
      page = await newSpecPage({
        components: [ToggleButton],
        html: `<scale-toggle-button size="large" disabled>Test</scale-toggle-button>`,
      });
      expect(page.root).toMatchSnapshot();
    });
    it('selected', async () => {
      page = await newSpecPage({
        components: [ToggleButton],
        html: `<scale-toggle-button size="xs" selected>Test</scale-toggle-button>`,
      });
      expect(page.root).toMatchSnapshot();
    });
    it('iconOnly', async () => {
      page = await newSpecPage({
        components: [ToggleButton],
        html: `<scale-toggle-button selected radius="both">
			  <scale-icon-action-search></scale-icon-action-search>
			  </scale-toggle-button>`,
      });
      expect(page.root).toMatchSnapshot();
    });
    it('iconBefore', async () => {
      page = await newSpecPage({
        components: [ToggleButton],
        html: `<scale-toggle-button radius="right">
				<scale-icon-action-search></scale-icon-action-search>Test
				</scale-toggle-button>`,
      });
      expect(page.root).toMatchSnapshot();
    });
    it('iconAfter', async () => {
      page = await newSpecPage({
        components: [ToggleButton],
        html: `<scale-toggle-button radius="left" styles="color:red">
				  Test<scale-icon-action-search></scale-icon-action-search>
				  </scale-toggle-button>`,
      });
      expect(page.root).toMatchSnapshot();
    });
  });
  describe('classes', () => {
    it('should handle getCssClassMap() and getBasePartMap()', () => {
      const element = new ToggleButton();
      expect(element.getCssClassMap()).toContain('toggle-button');
      expect(element.getCssClassMap()).toContain('toggle-button--secondary');
      expect(element.getCssClassMap()).toContain('toggle-button--icon-before');
      expect(element.getCssClassMap()).toContain('toggle-button--color');

      expect(element.getBasePartMap()).toContain('toggle-button');
      expect(element.getBasePartMap()).toContain('secondary');
      expect(element.getBasePartMap()).toContain('icon-before');
      expect(element.getBasePartMap()).toContain('color');
      element.iconOnly = true;
      expect(element.getCssClassMap()).toContain('toggle-button--icon-only');
      expect(element.getBasePartMap()).toContain('icon-only');
    });
  });

  describe('functions', () => {
    beforeEach(async () => {
      page = await newSpecPage({
        components: [ToggleButton],
        html: `<scale-toggle-button>
						Test<scale-icon-action-search></scale-icon-action-search>
					</scale-toggle-button>`,
      });
    });
    it('setIconPositionProp() returns "after"', async () => {
      page.rootInstance.setIconPositionProp();
      await page.waitForChanges();
      expect(page.rootInstance.iconPosition).toBe('after');
    });
    it('"selected" Prop toggles on click', async () => {
      page.rootInstance.selected = false;
      const toggleButton = page.root.shadowRoot.querySelector('.toggle-button');
      await page.waitForChanges();
      toggleButton.dispatchEvent(new Event('click'));
      await page.waitForChanges();
      expect(page.rootInstance.selected).toBe(true);
      toggleButton.dispatchEvent(new Event('click'));
      await page.waitForChanges();
      expect(page.rootInstance.selected).toBe(false);
    });
  });
});
