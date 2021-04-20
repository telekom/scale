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
import Usage from "./usage";

addons.register("@telekom/scale-usage-addon", () => {
  addons.add(`@telekom/scale-usage-addon`, {
    type: types.TAB,
    title: "Usage",
    route: ({ storyId, refId, path }) => {
      const hideUsageButtonStyles = document.getElementById(
        "hide-usage-button"
      );
      if (path.includes("components-") && hideUsageButtonStyles) {
        hideUsageButtonStyles.remove();
      }

      if (!path.includes("components-") && !hideUsageButtonStyles) {
        const style = document.createElement("link");
        style.id = "hide-usage-button";
        style.rel = "stylesheet";
        style.href = "hide-usage-button.css";

        document.body.appendChild(style);
      }

      return refId ? `/usage/${refId}_${storyId}` : `/usage/${storyId}`;
    },
    match: ({ viewMode }) => viewMode === "usage",
    render: props => <Usage {...props} />
  });
});
