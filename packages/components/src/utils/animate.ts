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

/**
 * @see https://www.youtube.com/watch?v=9-6CKCz58A8
 */
export function animateTo(
  element: HTMLElement,
  keyframes: Keyframe | Keyframe[],
  options?: KeyframeAnimationOptions
) {
  const anim = element.animate(keyframes, { ...options, fill: 'both' });
  anim.addEventListener('finish', () => {
    // @ts-ignore
    anim.commitStyles();
    anim.cancel();
  });

  return anim;
}

const keyframeDefaults = {
  easing: 'cubic-bezier(0.390, 0.575, 0.565, 1.000)',
};

export const KEYFRAMES = {
  fadeIn: [
    {
      offset: 0,
      ...keyframeDefaults,
      opacity: 0,
    },
    {
      offset: 1,
      ...keyframeDefaults,
      opacity: 1,
    },
  ],
  fadeOut: [
    {
      offset: 0,
      ...keyframeDefaults,
      opacity: 1,
    },
    {
      offset: 1,
      ...keyframeDefaults,
      opacity: 0,
    },
  ],
  fadeInTop: [
    {
      offset: 0,
      ...keyframeDefaults,
      opacity: 0,
      transform: 'translateY(-3rem)',
    },
    {
      offset: 1,
      ...keyframeDefaults,
      opacity: 1,
      transform: 'translateY(0)',
    },
  ],
};
