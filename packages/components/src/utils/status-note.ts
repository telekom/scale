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

const tagTypes = {
  beta: 'β',
  WIP: '🛠 WIP',
  deprecated: '😵 Deprecation notice',
  warning: 'Warning',
};

const defaultMessages = {
  beta:
    'This component is currently in beta status. Some things may be refactored. Watch the change log for now.',
  WIP:
    "This component is currently under development and is prone to change. Please wait for its release.\nIt will be available in Storybook once it's finished and documented.",
  deprecated: 'This component is deprecated.',
};

interface StatusInterface {
  tag?: string;
  extraMessage?: string;
  message?: string;
  source?: object | string;
  type?: 'warn' | 'error' | 'info';
}

export default function statusNote({
  tag = 'WIP',
  extraMessage = null,
  message = null,
  source = null,
  type = 'info',
}: StatusInterface) {
  // tslint:disable-next-line
  const dipatchMessage = console[type];
  dipatchMessage(
    `%c scale – ${tagTypes[tag]} `,
    'background: #E20074; color: #FFF; border-radius: 4px',
    `\n\n${message ? message : defaultMessages[tag]} ${
      extraMessage ? '\n' + extraMessage : ''
    }
    `,
    source !== null ? '\nsource:' : '',
    // typeof source === 'object' ? '\n' : `\nsource: ${source}`,
    typeof source === 'object' ? source : `${source}`,
    source !== null ? '\n\n' : ''
  );
}
