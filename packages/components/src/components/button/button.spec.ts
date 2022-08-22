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
import { Button } from './button';

describe('Button', () => {
  let element;

  beforeEach(async () => {
    element = new Button();
  });

  it('should match snapshot', async () => {
    const page = await newSpecPage({
      components: [Button],
      html: `<scale-button>Label</scale-button>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('should handle css classes', () => {
    element.variant = 'primary';
    expect(element.getCssClassMap()).toContain('button--variant-primary');

    element.disabled = true;
    expect(element.getCssClassMap()).toContain('button--disabled');
  });

  it('should handle icon before', async () => {
    const page = await newSpecPage({
      components: [Button],
      html: `    
      <scale-button>
      <scale-icon-action-search></scale-icon-action-search>Label
      </scale-button>
      `,
    });
    expect(page.rootInstance.iconPosition).toBe('before');
    expect(page.root).toMatchSnapshot();
  });

  it('should handle icon after', async () => {
    const page = await newSpecPage({
      components: [Button],
      html: `    
      <scale-button>
        Label<scale-icon-action-search></scale-icon-action-search>
      </scale-button>
      `,
    });
    expect(page.rootInstance.iconPosition).toBe('after');
    expect(page.root).toMatchSnapshot();
  });

  it('should handle click', async () => {
    const page = await newSpecPage({
      components: [Button],
      html: `
      <scale-button>
      Label
      </scale-button>`,
    });
    expect(page.root).toMatchSnapshot();
    simulateMouseEvent(
      page,
      'click',
      'button',
      expect(page.root).toMatchSnapshot()
    );
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
  page: SpecPage,
  eventType: string,
  element: string,
  callBack: any
) {
  const event = new MouseEvent(eventType, {
    view: window,
    bubbles: true,
    cancelable: true,
  });
  const myTarget = page.root.shadowRoot.querySelector(element);
  const canceled = !myTarget.dispatchEvent(event);
  if (canceled) {
    alert('canceled');
  } else {
    alert('not canceled');
    callBack; // tslint:disable-line
  }
}
