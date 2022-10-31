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

import React from 'react';
import { addons, types } from '@storybook/addons';
import { useGlobals } from '@storybook/api';
import useLocalStorage from '../use-localstorage';
import translationMap from '../../translations.json';

const activeBtnClassName = 'css-mszgbt';
const inactiveBtnClassName = 'css-am1h1h';
const separatorClassName = 'css-14kbt3m';

function switchMode(mode) {
  try {
    const previewIframe = document.querySelector('#storybook-preview-iframe');
    previewIframe.contentWindow.document.body.dataset.mode = mode;
    Array.from(
      previewIframe.contentWindow.document.querySelectorAll('iframe')
    ).forEach((x) => {
      x.contentWindow.document.body.dataset.mode = mode
    });
  } catch (e) {}
}

// utility to create new links
const createLink = (label) => {
  const link = document.createElement('a');
  link.href = '#';
  link.id = `color-mode-switch-${label}`;
  link.setAttribute('class', 'css-1xonygc');

  const button = document.createElement('button');
  button.setAttribute('class', activeBtnClassName);
  button.innerHTML = label;
  link.appendChild(button);

  return link;
};

const createSeparator = () => {
  const separator = document.createElement('span');
  separator.style = 'margin-left: 15px;';
  separator.setAttribute('class', separatorClassName);
  return separator;
};

// global variables so there can only be one for each;
let colorModeSwitch;
const lightLink = createLink('Light');
const darkLink = createLink('Dark');

addons.register('@telekom/scale-color-mode-switch-addon', () => {
  addons.add(`@telekom/scale-color-mode-switch-addon`, {
    type: types.TAB,
    title: '',
    route: () => {
      const [persistedColorMode, setPersistedColorMode] = useLocalStorage(
        'persistedColorMode',
        'light'
      );
      const [globals, updateGlobals] = useGlobals();
      const { colorMode } = globals;

      // Set the initial global color-mode-switch
      React.useEffect(() => {
        if (!colorMode) {
          updateGlobals({ ...globals, colorMode: persistedColorMode });
        }
      }, [colorMode, persistedColorMode]);

      // Create the colorModeSwitch element, add event listeners to it's links and put them inside
      if (!colorModeSwitch) {
        lightLink.addEventListener('click', (e) => {
          e.preventDefault();
          setPersistedColorMode('light');
          updateGlobals({ ...globals, colorMode: 'light' });
        });
        darkLink.addEventListener('click', (e) => {
          e.preventDefault();
          setPersistedColorMode('dark');
          updateGlobals({ ...globals, colorMode: 'dark' });
        });

        colorModeSwitch = document.createElement('div');
        colorModeSwitch.id = 'color-mode-switch';
        colorModeSwitch.appendChild(lightLink);
        colorModeSwitch.appendChild(darkLink);
      }

      // Apply active classname to the links when the colorMode changes
      React.useEffect(() => {
        if (!lightLink || !darkLink) {
          return;
        }
        lightLink
          .querySelector('button')
          .setAttribute(
            'class',
            colorMode === 'light' ? activeBtnClassName : inactiveBtnClassName
          );
        darkLink
          .querySelector('button')
          .setAttribute(
            'class',
            colorMode === 'dark' ? activeBtnClassName : inactiveBtnClassName
          );
      }, [colorMode]);

      // Wait for the DOM to settle, then append the colorModeSwitch if it's not there yet
      setTimeout(() => {
        const rightSection = document.querySelector('#language-toolbar');

        const toolbar = document.querySelector(
          '#root div.css-sqdry3 div.os-padding div.css-p1dfi6'
        );

        if (rightSection) {
          if (!document.getElementById('color-mode-switch')) {
            document.querySelector('#root .css-p1dfi6').style =
              'justify-content: start;';
            document.querySelector('#root .css-102is01').style =
              'position: absolute; right: 0;';
            toolbar.insertBefore(colorModeSwitch, rightSection);
            toolbar.insertBefore(createSeparator(), rightSection);
          }
        }
      }, 200);

      // Finally - apply the translations of the sidebar
      React.useEffect(() => {
        if (!colorMode) {
          return;
        }
        switchMode(colorMode);
      }, [colorMode]);

      return null;
    },
    render: () => null,
    match: () => null,
  });
});
