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

export interface MenuItem {
  name: string;
  id: string;
  href: string;
  children?: MenuItem[];
  icon?: string;
  level: number;
  onClick?: (event: MouseEvent | KeyboardEvent) => void;
}

export interface MainNavigation {
  name: string;
  id: string;
  href?: string;
  target?: string;
  children?: MainNavigation[];
  onClick?: (event: MouseEvent | KeyboardEvent) => void;
}

export interface IconNavigation {
  name: string;
  id: string;
  icon: string;
  href?: string;
  target?: string;
  children?: MainNavigation[];
  onClick?: (event: MouseEvent | KeyboardEvent) => void;
  badge?: boolean;
  badgeLabel?: number;
}

export interface UserNavigation {
  type: string;
  id?: string;
  href?: string;
  shortName?: string;
  name?: string;
  email?: string;
  badge?: boolean;
  badgeLabel?: number;
  icon?: string;
  iconPosition?: string;
  onClick?: (event: MouseEvent | KeyboardEvent) => void;
  variant?: string;
}

export interface SectorNavigation {
  name: string;
  id: string;
  href?: string;
  target?: string;
  onClick?: (event: MouseEvent | KeyboardEvent) => void;
}

export interface AddOnNavigation {
  name: string;
  id: string;
  href?: string;
  target?: string;
  onClick?: (event: MouseEvent | KeyboardEvent) => void;
}

export interface FooterNavigation {
  name: string;
  id: string;
  icon?: string;
  href?: string;
  target?: string;
  onClick?: (event: MouseEvent | KeyboardEvent) => void;
}
