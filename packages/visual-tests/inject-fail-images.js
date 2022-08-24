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

document.addEventListener('DOMContentLoaded', () => {
  [...document.querySelectorAll('.failureMsg')].forEach((fail, i) => {
    const imagePath = `__diff_output__/${
      (fail.textContent.split('__diff_output__/')[1] || '').split('png')[0]
    }png`;

    if (imagePath) {
      const div = document.createElement('div');
      div.style = 'margin-top: 16px';

      const a = document.createElement('a');
      a.href = `${imagePath}`;
      a.target = '_blank';

      const img = document.createElement('img');
      img.src = `${imagePath}`;
      img.style = 'width: 100%';

      a.appendChild(img);
      div.appendChild(a);
      fail.appendChild(div);
    }
  });
});
