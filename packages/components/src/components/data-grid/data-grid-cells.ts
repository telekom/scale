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

import { CheckboxCell } from './cell-handlers/checkbox-cell';
import { DateCell } from './cell-handlers/date-cell';
import { EmailCell } from './cell-handlers/email-cell';
import { GraphCell } from './cell-handlers/graph-cell';
import { LinkCell } from './cell-handlers/link-cell';
import { HTMLCell } from './cell-handlers/html-cell';
import { HTMLNoDropdownCell } from './cell-handlers/html-no-dropdown-cell';
import { NumberCell } from './cell-handlers/number-cell';
import { SelectCell } from './cell-handlers/select-cell';
import { TagsCell } from './cell-handlers/tags-cell';
import { TelephoneCell } from './cell-handlers/telephone-cell';
import { TextCell } from './cell-handlers/text-cell';
import { ActionsCell } from './cell-handlers/actions-cell';

export const CELL_TYPES = {
  checkbox: CheckboxCell,
  date: DateCell,
  email: EmailCell,
  graph: GraphCell,
  html: HTMLCell,
  html_nodropdown: HTMLNoDropdownCell,
  link: LinkCell,
  number: NumberCell,
  select: SelectCell,
  tags: TagsCell,
  telephone: TelephoneCell,
  text: TextCell,
  actions: ActionsCell,
};

// Fallback if no type set on field
export const DEFAULT_CELL_TYPE = 'text';

// Common cell defaults, can be overridden in cell type classes
export const CELL_DEFAULTS = {
  maxWidth: Infinity,
  minWidth: 20,
  resizable: true,
  sortable: false,
  sortBy: 'text',
  textAlign: 'left',
  visible: true,
  width: 'auto',
};
