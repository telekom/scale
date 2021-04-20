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
import { Toast } from './toast';

describe('Toast', () => {
  let element;
  beforeEach(async () => {
    element = new Toast();
    jest.useFakeTimers();
    jest.mock('date-fns');
  });

  const components = [Toast];

  const timeStamp = 1540035262000;

  it('should match snapshot', async () => {
    const page = await newSpecPage({
      components,
      html: `<scale-toast>Toast message</scale-toast>`,
    });
    expect(page.root.shadowRoot).toBeTruthy();
    expect(page.root).toMatchSnapshot();
  });

  it('should match snapshot when opened', async () => {
    const page = await newSpecPage({
      components,
      html: `<scale-toast opened=true >Label</scale-toast>`,
    });
    expect(page.root.shadowRoot).toBeTruthy();
    expect(page.root).toMatchSnapshot();
  });

  it('should close the Toast', () => {
    expect(element.opened).toBe(undefined);
    element.close();
    setTimeout(() => {
      expect(element.opened).toBe(false);
    }, 10);
  });

  it('should open the Toast', () => {
    expect(element.opened).toBe(undefined);
    element.open();
    expect(element.opened).toBe(true);
  });

  it('should hide the toast', () => {
    element.autohide = true;
    element.opened = true;
    element.setToastTimeout();

    setTimeout(() => {
      expect(setTimeout).toHaveBeenCalledTimes(1);
      expect(setTimeout).toHaveBeenLastCalledWith(
        expect.any(Function),
        element.autohideTime
      );
    }, 10);
  });

  it('should not hide the toast', () => {
    element.autohide = false;
    element.opened = false;
    element.setToastTimeout();
    expect(element.autohide).toBe(false);
  });

  it('should cancel the timeout', () => {
    element.myTimeout = 500;
    element.close();

    setTimeout(() => {
      expect(clearTimeout).toHaveBeenCalledTimes(1);
      expect(element.myTimeout).toEqual(undefined);
    }, 10);
  });

  it('should render with default timeformat', () => {
    element.time = timeStamp;
    element.getTime();

    expect(element.time).toBe(timeStamp);
  });

  it('should handle css classes', () => {
    element.variant = 'primary';
    expect(element.getCssClassMap()).toContain('toast--variant-primary');

    element.size = 'small';
    expect(element.getCssClassMap()).toContain('toast--size-small');

    element.opened = true;
    expect(element.getCssClassMap()).toContain('toast--opened');

    element.hideToast = false;
    expect(element.getCssClassMap()).toContain('toast--show');

    element.hideToast = true;
    expect(element.getCssClassMap()).toContain('toast--hide');
  });
});
