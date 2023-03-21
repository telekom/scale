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

import {
  Component,
  h,
  Prop,
  State,
  Event,
  EventEmitter,
  Watch,
} from '@stencil/core';
import { MenuItem } from '../app-interfaces';
import { findSelected, findRootNode } from '../../../utils/menu-utils';

const hasChildren = (item: any) =>
  Array.isArray(item.children) && item.children.length > 0;

@Component({
  tag: 'app-navigation-main-mobile',
  styleUrl: 'app-navigation-main-mobile.css',
})
export class MainNavigationMobile {
  mainNavigationWrapper?: HTMLUListElement;
  childrenWrapper?: HTMLUListElement;
  @Prop() hide: () => void;
  @Prop() navigation: MenuItem[];
  @Prop() activeRouteId: string;
  @State() selected: MenuItem = undefined;
  @State() parent: MenuItem = undefined;
  @Event({
    eventName: 'closeMenu',
    composed: true,
    cancelable: true,
    bubbles: true,
  })
  closeMenu: EventEmitter;

  @Watch('activeRouteId')
  handleActiveRoute(newValue) {
    this.selected = findSelected(this.navigation, newValue, null).selected;
    this.parent = findSelected(this.navigation, newValue).parent;
  }

  componentWillLoad() {
    this.selected = findSelected(
      this.navigation,
      this.activeRouteId,
      null
    ).selected;
    this.parent = findSelected(this.navigation, this.activeRouteId).parent;
  }

  closeMenuHandler() {
    this.closeMenu.emit();
  }

  handlePrevSelected(event, item) {
    event.preventDefault();

    const selected = findSelected(this.navigation, item.id).parent;
    this.selected = selected;
    this.parent = selected;
  }

  handleSelect(event, item) {
    const { selected, parent } = findSelected(this.navigation, item.id);
    this.selected = selected;
    this.parent = parent;

    if (typeof item.onClick === 'function') {
      item.onClick(event);
    }

    if (!hasChildren(selected)) {
      this.closeMenuHandler();
    }
  }

  childMenuPage() {
    const section =
      this.selected && hasChildren(this.selected) ? this.selected : this.parent;

    const { selected, parent } = findSelected(
      this.navigation,
      this.activeRouteId
    );

    if (!section) {
      return <div></div>;
    }

    const isActive = (child) =>
      (selected && child.id === selected.id) ||
      (parent && parent.id === child.id);
    return (
      <div class="main-navigation-mobile__child-menu">
        <a
          class="main-navigation-mobile__child-menu-current"
          href={section.href || 'javascript:void(0);'}
          onClick={(event) => {
            this.handlePrevSelected(event, section);
          }}
          tabIndex={0}
          onKeyDown={(event) => {
            if (['Enter', ' '].includes(event.key)) {
              event.preventDefault();
              this.handlePrevSelected(event, section);
              if (!this.selected) {
                // focus first main navigation item to ease tab navigation
                this.mainNavigationWrapper.querySelector('a').focus();
              }
            }
            if (['Escape', 'Esc'].includes(event.key)) {
              this.hide();
            }
          }}
        >
          <div class="main-navigation-mobile__child-menu-current-item">
            <div class="main-navigation-mobile__child-menu-current-wrapper">
              <scale-icon-navigation-left></scale-icon-navigation-left>
              <div>{section.name}</div>
            </div>
          </div>
        </a>
        <ul
          class="main-navigation-mobile__child-menu-items"
          ref={(el) => {
            this.childrenWrapper = el;
          }}
        >
          {section.children.map((child) => (
            <li class="main-navigation-mobile__child-menu-item">
              <a
                aria-current={isActive(child) ? 'true' : 'false'}
                aria-haspopup={hasChildren(child) ? 'true' : 'false'}
                class={`main-navigation-mobile__child-menu-item-link ${
                  isActive(child) ? 'selected' : ''
                }`}
                href={child.href || 'javascript:void(0);'}
                tabIndex={0}
                onClick={(event) => {
                  this.handleSelect(event, child);
                }}
                onKeyDown={(event) => {
                  if (['Enter', ' '].includes(event.key)) {
                    this.handleSelect(event, child);
                    setTimeout(() => {
                      // focus first child menu item link to ease tab navigation
                      const firstChildren =
                        this.childrenWrapper.querySelector('a');
                      if (firstChildren) {
                        this.childrenWrapper.querySelector('a').focus();
                      }
                    });
                  }
                  if (['Escape', 'Esc'].includes(event.key)) {
                    this.hide();
                  }
                }}
              >
                <div class="main-navigation-mobile__child-menu-item-wrapper">
                  <span>{child.name}</span>
                  {isActive(child) && <span class="sr-only">active</span>}
                  {hasChildren(child) && (
                    <scale-icon-navigation-right></scale-icon-navigation-right>
                  )}
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  render() {
    const { selected } = findSelected(this.navigation, this.activeRouteId);
    const rootNode = selected && findRootNode(this.navigation, selected.id);
    const isActive = (itemId) => rootNode && rootNode.id === itemId;
    return (
      <div class="main-navigation-mobile">
        {this.childMenuPage()}
        <ul
          class="main-navigation-mobile__main-menu"
          ref={(el) => {
            this.mainNavigationWrapper = el;
          }}
        >
          {(this.navigation || []).map((item) => (
            <li
              class={`main-navigation-mobile__item${
                isActive(item.id)
                  ? ' main-navigation-mobile__item--selected'
                  : ''
              }`}
            >
              <a
                aria-current={isActive(item.id) ? 'true' : 'false'}
                aria-haspopup={hasChildren(item) ? 'true' : 'false'}
                class={`main-navigation-mobile__item-link${
                  isActive(item.id)
                    ? ' main-navigation-mobile__item-link--selected'
                    : ''
                }`}
                href={item.href || 'javascript:void(0);'}
                onClick={(event) => {
                  this.handleSelect(event, item);
                }}
                onKeyDown={(event) => {
                  if (['Enter', ' '].includes(event.key)) {
                    this.handleSelect(event, item);
                    setTimeout(() => {
                      // focus first child menu item link to ease tab navigation
                      const firstChildren =
                        this.childrenWrapper.querySelector('a');
                      if (firstChildren) {
                        this.childrenWrapper.querySelector('a').focus();
                      }
                    });
                  }
                  if (['Escape', 'Esc'].includes(event.key)) {
                    this.hide();
                  }
                }}
                // hide from tab navigation when on childMenuPage
                tabIndex={this.selected ? -1 : 0}
              >
                <div class="main-navigation-mobile__item-wrapper">
                  <span>{item.name}</span>
                  {isActive(item.id) && <span class="sr-only">active</span>}
                  {hasChildren(item) && (
                    <scale-icon-navigation-right></scale-icon-navigation-right>
                  )}
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
