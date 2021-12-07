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
import { ToggleGroup } from './toggle-group';

describe('Toggle Group', () => {
  let page: SpecPage;
  describe('snapshots', () => {
    it('default props', async () => {
      page = await newSpecPage({
        components: [ToggleGroup],
        html: `<scale-toggle-group>
		   <scale-toggle-button>Click Me!</scale-toggle-button>
		   <scale-toggle-button>Click Me!</scale-toggle-button>
		   <scale-toggle-button selected>Click Me!</scale-toggle-button>
		 </scale-toggle-group>`,
      });
      expect(page.root).toMatchSnapshot();
    });
    it('size small, multi false', async () => {
      page = await newSpecPage({
        components: [ToggleGroup],
        html: `<scale-toggle-group size="small" single-select="true">
		   <scale-toggle-button>Click Me!</scale-toggle-button>
		   <scale-toggle-button>Click Me!</scale-toggle-button>
		   <scale-toggle-button selected>Click Me!</scale-toggle-button>
		 </scale-toggle-group>`,
      });
      expect(page.root).toMatchSnapshot();
    });
    it('disabled', async () => {
      page = await newSpecPage({
        components: [ToggleGroup],
        html: `<scale-toggle-group disabled aria-label="Aria Label">
		   <scale-toggle-button>Click Me!</scale-toggle-button>
		   <scale-toggle-button>Click Me!</scale-toggle-button>
		   <scale-toggle-button selected>Click Me!</scale-toggle-button>
		 </scale-toggle-group>`,
      });
      expect(page.root).toMatchSnapshot();
    });
    it('styles', async () => {
      page = await newSpecPage({
        components: [ToggleGroup],
        html: `<scale-toggle-group styles="color:red">
		   <scale-toggle-button>Click Me!</scale-toggle-button>
		   <scale-toggle-button>Click Me!</scale-toggle-button>
		   <scale-toggle-button selected>Click Me!</scale-toggle-button>
		 </scale-toggle-group>`,
      });
      expect(page.root).toMatchSnapshot();
    });
  });
  describe('classes', () => {
    it('should handle getCssClassMap() and getBasePartMap()', () => {
      const element = new ToggleGroup();
      expect(element.getCssClassMap()).toContain('toggle-group');
      expect(element.getCssClassMap()).toContain('toggle-group--inline');

      expect(element.getBasePartMap()).toContain('toggle-group');
      expect(element.getBasePartMap()).toContain('inline');
    });
  });
  describe('emitter', () => {
    it('state changes with event listened to (multi)', async () => {
      page = await newSpecPage({
        components: [ToggleGroup],
        html: `<scale-toggle-group single-select="false">
          <scale-toggle-button toggle-button-id="toggle-button-1">Click Me!</scale-toggle-button>
          <scale-toggle-button toggle-button-id="toggle-button-2">Click Me!</scale-toggle-button>
          <scale-toggle-button toggle-button-id="toggle-button-3" selected>Click Me!</scale-toggle-button>
        </scale-toggle-group>`,
      });
      expect(page.rootInstance.status).toEqual([
        { id: 'toggle-button-1', selected: false },
        { id: 'toggle-button-2', selected: false },
        { id: 'toggle-button-3', selected: true },
      ]);
      page.rootInstance.scaleClickHandler({
        detail: { id: 'toggle-button-1', selected: true },
      });
      await page.waitForChanges();
      expect(page.rootInstance.status).toEqual([
        { id: 'toggle-button-1', selected: true },
        { id: 'toggle-button-2', selected: false },
        { id: 'toggle-button-3', selected: true },
      ]);
      page.rootInstance.scaleClickHandler({
        detail: { id: 'toggle-button-2', selected: true },
      });
      await page.waitForChanges();
      expect(page.rootInstance.status).toEqual([
        { id: 'toggle-button-1', selected: true },
        { id: 'toggle-button-2', selected: true },
        { id: 'toggle-button-3', selected: true },
      ]);
    });
    it('state changes with event listened to (single-select)', async () => {
      page = await newSpecPage({
        components: [ToggleGroup],
        html: `<scale-toggle-group single-select="true">
          <scale-toggle-button toggle-button-id="toggle-button-1">Click Me!</scale-toggle-button>
          <scale-toggle-button toggle-button-id="toggle-button-2">Click Me!</scale-toggle-button>
          <scale-toggle-button toggle-button-id="toggle-button-3" selected>Click Me!</scale-toggle-button>
        </scale-toggle-group>`,
      });
      expect(page.rootInstance.status).toEqual([
        { id: 'toggle-button-1', selected: false },
        { id: 'toggle-button-2', selected: false },
        { id: 'toggle-button-3', selected: true },
      ]);
      page.rootInstance.scaleClickHandler({
        detail: { id: 'toggle-button-3', selected: false },
      });
      await page.waitForChanges();
      expect(page.rootInstance.status).toEqual([
        { id: 'toggle-button-1', selected: false },
        { id: 'toggle-button-2', selected: false },
        { id: 'toggle-button-3', selected: false },
      ]);
      page.rootInstance.scaleClickHandler({
        detail: { id: 'toggle-button-2', selected: true },
      });
      await page.waitForChanges();
      expect(page.rootInstance.status).toEqual([
        { id: 'toggle-button-1', selected: false },
        { id: 'toggle-button-2', selected: true },
        { id: 'toggle-button-3', selected: false },
      ]);
      page.rootInstance.scaleClickHandler({
        detail: { id: 'toggle-button-1', selected: true },
      });
      await page.waitForChanges();
      expect(page.rootInstance.status).toEqual([
        { id: 'toggle-button-1', selected: true },
        { id: 'toggle-button-2', selected: false },
        { id: 'toggle-button-3', selected: false },
      ]);
    });
  });
});
