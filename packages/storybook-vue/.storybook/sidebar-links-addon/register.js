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

import React from "react";
import { addons, types } from "@storybook/addons";
import { useGlobals } from "@storybook/api";
import sidebarLinks from "../../sidebar-links.json";

const sidebarClassName = "css-ohbggj";

const createLink = ({ title, href }) => {
  const link = document.createElement("a");
  link.href = href;
  link.id = `sidebar-link-${title}`;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.setAttribute("class", "sidebar-item css-b6bmib");
  link.innerHTML = title;
  return link;
};

const createTrackingPixel = () => {
  const noscript = document.createElement("noscript");
  const img = document.createElement("img");
  img.src = '//www.brand-design.telekom.com/piwik-bd/piwik.php?idsite=3&rec=1';
  img.style = 'border:0;';
  return noscript.appendChild(img);
};

let sidebarLinksContainer;

addons.register("@telekom/scale-sidebar-links-addon", () => {
  addons.add(`@telekom/scale-sidebar-links-addon`, {
    type: types.TAB,
    route: () => {
      const [{ locale }] = useGlobals();
      const sidebarContainer = document.querySelector(
          "#storybook-explorer-tree > div > div"
      );

      React.useEffect(() => {
        if (!locale) {
          return;
        }

        if (sidebarLinksContainer) {
          sidebarLinksContainer.remove();
        }
        sidebarLinksContainer = document.createElement("div");
        sidebarLinksContainer.setAttribute("style", "margin-top: 48px;");
        sidebarLinksContainer.id = "sidebar-links";
        sidebarContainer.appendChild(sidebarLinksContainer);
        sidebarContainer.appendChild(createTrackingPixel());

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
