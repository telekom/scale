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
import Events from '@storybook/core-events';
import { addons, types } from '@storybook/addons';
import { useGlobals } from '@storybook/api';
import sidebarLinks from '../../sidebar-links.json';

const createLink = ({ title, href }) => {
  const link = document.createElement('a');
  link.href = href;
  link.id = `sidebar-link-${title}`;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.setAttribute('class', 'sidebar-item css-8l36wn');
  link.innerHTML = title;
  return link;
};

let sidebarLinksContainer;

addons.register('@telekom/scale-sidebar-links-addon', (api) => {
  api.on(Events.STORY_CHANGED, (title) => {
    const content =
      document.getElementsByTagName('iframe') &&
      document.getElementsByTagName('iframe')[0];
    _paq.push(['setDocumentTitle', title]);
    _paq.push(['trackPageView']);
    _paq.push(['MediaAnalytics::scanForMedia', content]);
    _paq.push(['FormAnalytics::scanForForms', content]);
    _paq.push(['trackContentImpressionsWithinNode', content]);
    _paq.push(['enableLinkTracking']);
  });

  addons.add(`@telekom/scale-sidebar-links-addon`, {
    type: types.TAB,
    route: () => {
      const [{ locale }] = useGlobals();
      const sidebarLinksContainerInjectTarget = document.querySelector(
        '#contact-your-feedback--page'
      );

      React.useEffect(() => {
        if (!locale) {
          return;
        }

        if (sidebarLinksContainer) {
          sidebarLinksContainer.remove();
        }
        sidebarLinksContainer = document.createElement('div');
        sidebarLinksContainer.id = 'sidebar-links';
        sidebarLinksContainerInjectTarget.parentNode.appendChild(
          sidebarLinksContainer
        );

        sidebarLinks[locale].forEach((link) => {
          sidebarLinksContainer.appendChild(createLink(link));
        });
      }, [locale]);

      return null;
    },
    render: () => null,
    match: () => null,
  });
});
