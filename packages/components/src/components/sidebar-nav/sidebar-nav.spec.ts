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
import { SidebarNav } from './sidebar-nav';

describe('SidebarNav', () => {
  let page: any;
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: true,
        media: query,
        onchange: null,
        addListener: jest.fn(),
      })),
    });
  });
  it('should match snapshot', async () => {
    page = await newSpecPage({
      components: [SidebarNav],
      html: `<scale-sidebar-nav></scale-sidebar-nav>`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should handle scale-sidebar-nav-collapsuible child', async () => {
    page = await newSpecPage({
      components: [SidebarNav],
      html: `
        <scale-sidebar-nav>
          <scale-sidebar-nav-collapsible>
          </scale-sidebar-nav-collapsible>
        </scale-sidebar-nav>`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should handle scale-sidebar-nav-collapsuible child level 1', async () => {
    page = await newSpecPage({
      components: [SidebarNav],
      html: `
        <scale-sidebar-nav>
          <scale-sidebar-nav-collapsible>
          <scale-sidebar-nav-item>
          </scale-sidebar-nav-item>
          </scale-sidebar-nav-collapsible>
        </scale-sidebar-nav>`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should handle scale-sidebar-nav-collapsuible child level 2', async () => {
    page = await newSpecPage({
      components: [SidebarNav],
      html: `
        <scale-sidebar-nav>
          <scale-sidebar-nav-collapsible>
          <scale-sidebar-nav-collapsible>
            <scale-sidebar-nav-item >
            </scale-sidebar-nav-item >
          </scale-sidebar-nav-collapsible>
          </scale-sidebar-nav-collapsible>
        </scale-sidebar-nav>`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should handle scale-sidebar-nav-collapsuible child level 2', async () => {
    page = await newSpecPage({
      components: [SidebarNav],
      html: `
        <scale-sidebar-nav>
          <scale-sidebar-nav-collapsible>
          <scale-sidebar-nav-collapsible>
            <scale-sidebar-nav-item >
            </scale-sidebar-nav-item >
            <scale-sidebar-nav-item >
          </scale-sidebar-nav-collapsible>
          </scale-sidebar-nav-collapsible>
        </scale-sidebar-nav>`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should handle scale-sidebar-nav-item child', async () => {
    page = await newSpecPage({
      components: [SidebarNav],
      html: `
        <scale-sidebar-nav>
          <scale-sidebar-nav-item>
          </scale-sidebar-nav-item>
        </scale-sidebar-nav>`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should handle click', async () => {
    page = await newSpecPage({
      components: [SidebarNav],
      html: `
        <scale-sidebar-nav collapsible=true>
          <scale-sidebar-nav-item>
          </scale-sidebar-nav-item>
        </scale-sidebar-nav>`,
    });

    simulateMouseEvent('click', 'button', expect(page.root).toMatchSnapshot());
  });
});

/**
 * - Helper function for the onMouseEvents
 * @param page = The component, in this case the rating star component
 * @param eventType = The MouseEvent that should be executed on the element
 * @param element = Id of the element on which the MouseEvent is to be executed
 * @param callBack = Testing function
 */
async function simulateMouseEvent(
  eventType: string,
  element: string,
  callBack: any
) {
  const event = new MouseEvent(eventType, {
    view: window,
    bubbles: true,
    cancelable: true,
  });
  const myTarget = document
    .querySelector('scale-sidebar-nav')
    .shadowRoot.querySelector(element);
  const canceled = !myTarget.dispatchEvent(event);
  if (!canceled) {
    return callBack;
  }
  return;
}
