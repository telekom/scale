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

// utility to create new links
const createLink = (label) => {
  const link = document.createElement('a');
  link.href = '#';
  link.id = `language-${label}`;
  link.setAttribute('class', 'css-1xonygc');

  const button = document.createElement('button');
  button.setAttribute('class', activeBtnClassName);
  button.innerHTML = label;
  link.appendChild(button);

  return link;
};

// const createSeparator = () => {
//   const separator = document.createElement('span');
//   separator.style = "margin-left: 15px;";
//   separator.setAttribute("class", separatorClassName);
//   return separator
// }

// global variables so there can only be one for each;
let languageToolbar;
const englishLink = createLink('English');
const germanLink = createLink('Deutsch');

addons.register('@telekom/scale-language-addon', () => {
  addons.add(`@telekom/scale-language-addon`, {
    type: types.TAB,
    title: '',
    route: () => {
      const [persistedLocale, setPersistedLocale] = useLocalStorage(
        'persistedLocale',
        'en'
      );
      const [globals, updateGlobals] = useGlobals();
      const { locale } = globals;

      // Set the initial global language
      React.useEffect(() => {
        if (!locale) {
          updateGlobals({ ...globals, locale: persistedLocale });
        }
      }, [locale, persistedLocale]);

      // Create the languageToolbar element, add event listeners to it's links and put them inside
      if (!languageToolbar) {
        englishLink.addEventListener('click', (e) => {
          e.preventDefault();
          setPersistedLocale('en');
          updateGlobals({ ...globals, locale: 'en' });
        });
        germanLink.addEventListener('click', (e) => {
          e.preventDefault();
          setPersistedLocale('de');
          updateGlobals({ ...globals, locale: 'de' });
        });

        languageToolbar = document.createElement('div');
        languageToolbar.id = 'language-toolbar';
        languageToolbar.appendChild(englishLink);
        languageToolbar.appendChild(germanLink);
      }

      // Apply active classname to the links when the locale changes
      React.useEffect(() => {
        if (!englishLink || !germanLink) {
          return;
        }
        englishLink
          .querySelector('button')
          .setAttribute(
            'class',
            locale === 'en' ? activeBtnClassName : inactiveBtnClassName
          );
        germanLink
          .querySelector('button')
          .setAttribute(
            'class',
            locale === 'de' ? activeBtnClassName : inactiveBtnClassName
          );
      }, [locale]);

      // Wait for the DOM to settle, then append the languageToolbar if it's not there yet
      setTimeout(() => {
        const rightSection = document.querySelector(
          '#root > div > div.css-sqdry3 > div > div.css-sqdry3 > div.os-host.os-host-foreign.os-theme-dark.os-host-resize-disabled.os-host-scrollbar-horizontal-hidden.os-host-scrollbar-vertical-hidden.os-host-transition > div.os-padding > div > div > div > div.css-102is01'
        );

        const toolbar = document.querySelector(
          '#root > div > div.css-sqdry3 > div > div.css-sqdry3 > div.os-host.os-host-foreign.os-theme-dark.os-host-resize-disabled.os-host-scrollbar-horizontal-hidden.os-host-scrollbar-vertical-hidden.os-host-transition > div.os-padding > div > div > div'
        );

        if (rightSection) {
          if (!document.getElementById('language-toolbar')) {
            toolbar.insertBefore(languageToolbar, rightSection);
            // toolbar.insertBefore(createSeparator(), languageToolbar);
          }
        }
      }, 100);

      // Finally - apply the translations of the sidebar
      React.useEffect(() => {
        if (!locale) {
          return;
        }
        translationMap.forEach((translation) => {
          const element = window.document.querySelector(
            translation.elementSelector
          );
          if (!element) {
            return;
          }
          element.innerHTML = translation[locale];
        });
      }, [locale]);

      return null;
    },
    render: () => null,
    match: () => null,
  });
});
