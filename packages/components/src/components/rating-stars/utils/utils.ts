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

export function clamp(value: number, min: number, max: number) {
  if (value < min) {
    return min;
  }
  if (value > max) {
    return max;
  }
  return value;
}

export function handleListeners(element: HTMLElement, handleListener: string) {
  if (handleListener === 'addListeners') {
    element.addEventListener('keydown', (event: KeyboardEvent) =>
      handleClassOnFocus(event, element, 'add')
    );
    element.addEventListener('keyup', (event: KeyboardEvent) =>
      handleClassOnFocus(event, element, 'add')
    );
    element.addEventListener('mousedown', (event: KeyboardEvent) =>
      handleClassOnFocus(event, element, 'remove')
    );
    element.addEventListener('mouseup', (event: KeyboardEvent) =>
      handleClassOnFocus(event, element, 'remove')
    );
  } else if (handleListener === 'removeListeners') {
    element.removeEventListener('keydown', (event: KeyboardEvent) =>
      handleClassOnFocus(event, element, 'add')
    );
    element.removeEventListener('keyup', (event: KeyboardEvent) =>
      handleClassOnFocus(event, element, 'add')
    );
    element.removeEventListener('mousedown', (event: KeyboardEvent) =>
      handleClassOnFocus(event, element, 'remove')
    );
    element.removeEventListener('mouseup', (event: KeyboardEvent) =>
      handleClassOnFocus(event, element, 'remove')
    );
  }
}

export function handleClassOnFocus(
  event: KeyboardEvent,
  element: HTMLElement,
  action: string
) {
  const keys = [
    'Tab',
    'ArrowUp',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'Home',
    'End',
    'PageDown',
    'PageUp',
  ];
  if (action === 'add') {
    if (keys.includes(event.key)) {
      // console.log(event.key);
      element.classList.add('rating-focus');
    }
  } else if (action === 'remove') {
    element.classList.remove('rating-focus');
  }
}
