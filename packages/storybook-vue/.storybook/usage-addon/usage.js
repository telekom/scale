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
import { DocsWrapper, DocsContent } from '@storybook/components';
import { Description } from '@storybook/addon-docs/blocks';
import { useStorybookState, useGlobals } from '@storybook/api';
import appshell_en from 'raw-loader!../../stories/3_components/app-shell/app-shell.md';
import appshell_de from 'raw-loader!../../stories/3_components/app-shell/app-shell_de.md';
import accordion_en from 'raw-loader!../../stories/3_components/accordion/accordion.md';
import accordion_de from 'raw-loader!../../stories/3_components/accordion/accordion_de.md';
import brandHeader_en from 'raw-loader!../../stories/3_components/brand-header/brand-header.md';
import brandHeader_de from 'raw-loader!../../stories/3_components/brand-header/brand-header_de.md';
import breadcrumb_en from 'raw-loader!../../stories/3_components/breadcrumb/breadcrumb.md';
import breadcrumb_de from 'raw-loader!../../stories/3_components/breadcrumb/breadcrumb_de.md';
import button_en from 'raw-loader!../../stories/3_components/button/button.md';
import button_de from 'raw-loader!../../stories/3_components/button/button_de.md';
import card_en from 'raw-loader!../../stories/3_components/card/card.md';
import card_de from 'raw-loader!../../stories/3_components/card/card_de.md';
import checkbox_en from 'raw-loader!../../stories/3_components/checkbox/checkbox.md';
import checkbox_de from 'raw-loader!../../stories/3_components/checkbox/checkbox_de.md';
import checkboxGroup_en from 'raw-loader!../../stories/3_components/checkbox-group/checkbox-group.md';
import checkboxGroup_de from 'raw-loader!../../stories/3_components/checkbox-group/checkbox-group_de.md';
import datagrid_en from 'raw-loader!../../stories/3_components/data-grid/data-grid.md';
import datagrid_de from 'raw-loader!../../stories/3_components/data-grid/data-grid_de.md';
import date_picker_en from 'raw-loader!../../stories/3_components/date-picker/date-picker.md';
import date_picker_de from 'raw-loader!../../stories/3_components/date-picker/date-picker_de.md';
import divider_en from 'raw-loader!../../stories/3_components/divider/divider.md';
import divider_de from 'raw-loader!../../stories/3_components/divider/divider_de.md';
import icon_en from 'raw-loader!../../stories/3_components/icon/icon.md';
import icon_de from 'raw-loader!../../stories/3_components/icon/icon_de.md';
import linkMarkdown_en from 'raw-loader!../../stories/3_components/link/link.md';
import linkMarkdown_de from 'raw-loader!../../stories/3_components/link/link_de.md';
import logo_en from 'raw-loader!../../stories/3_components/logo/logo.md';
import logo_de from 'raw-loader!../../stories/3_components/logo/logo_de.md';
import loadingSpinner_en from 'raw-loader!../../stories/3_components/loading-spinner/loading-spinner.md';
import loadingSpinner_de from 'raw-loader!../../stories/3_components/loading-spinner/loading-spinner_de.md';
import list_en from 'raw-loader!../../stories/3_components/list/list.md';
import list_de from 'raw-loader!../../stories/3_components/list/list_de.md';
import menuFlyout_en from 'raw-loader!../../stories/3_components/menu-flyout/menu-flyout.md';
import menuFlyout_de from 'raw-loader!../../stories/3_components/menu-flyout/menu-flyout_de.md';
import modal_en from 'raw-loader!../../stories/3_components/modal/modal.md';
import modal_de from 'raw-loader!../../stories/3_components/modal/modal_de.md';
import pagination_en from 'raw-loader!../../stories/3_components/pagination/pagination.md';
import pagination_de from 'raw-loader!../../stories/3_components/pagination/pagination_de.md';
import progressBar_en from 'raw-loader!../../stories/3_components/progress-bar/progress-bar.md';
import progressBar_de from 'raw-loader!../../stories/3_components/progress-bar/progress-bar_de.md';
import radioButton_en from 'raw-loader!../../stories/3_components/radio-button/radio-button.md';
import radioButton_de from 'raw-loader!../../stories/3_components/radio-button/radio-button_de.md';
import ratingStars_en from 'raw-loader!../../stories/3_components/rating-stars/rating-stars.md';
import ratingStars_de from 'raw-loader!../../stories/3_components/rating-stars/rating-stars_de.md';
import dropdown_en from 'raw-loader!../../stories/3_components/dropdown/dropdown.md';
import dropdown_de from 'raw-loader!../../stories/3_components/dropdown/dropdown_de.md';
import sidebarNav_en from 'raw-loader!../../stories/3_components/sidebar-nav/sidebar-nav.md';
import sidebarNav_de from 'raw-loader!../../stories/3_components/sidebar-nav/sidebar-nav_de.md';
import slider_en from 'raw-loader!../../stories/3_components/slider/slider.md';
import slider_de from 'raw-loader!../../stories/3_components/slider/slider_de.md';
import switchMarkdown_en from 'raw-loader!../../stories/3_components/switch/switch.md';
import switchMarkdown_de from 'raw-loader!../../stories/3_components/switch/switch_de.md';
import tabNavigation_en from 'raw-loader!../../stories/3_components/tab-navigation/tab-navigation.md';
import tabNavigation_de from 'raw-loader!../../stories/3_components/tab-navigation/tab-navigation_de.md';
import table_en from 'raw-loader!../../stories/3_components/table/table.md';
import table_de from 'raw-loader!../../stories/3_components/table/table_de.md';
import tag_en from 'raw-loader!../../stories/3_components/tag/tag.md';
import tag_de from 'raw-loader!../../stories/3_components/tag/tag_de.md';
import textArea_en from 'raw-loader!../../stories/3_components/text-area/text-area.md';
import textArea_de from 'raw-loader!../../stories/3_components/text-area/text-area_de.md';
import textField_en from 'raw-loader!../../stories/3_components/text-field/text-field.md';
import textField_de from 'raw-loader!../../stories/3_components/text-field/text-field_de.md';
import footer_en from 'raw-loader!../../stories/3_components/footer/footer.md';
import footer_de from 'raw-loader!../../stories/3_components/footer/footer_de.md';
import badge_de from 'raw-loader!../../stories/3_components/badge/badge_de.md';
import badge_en from 'raw-loader!../../stories/3_components/badge/badge.md';

const NOT_A_COMPONENT_MD = '`Browse to any component to see usage.`';
const COMPONENT_NOT_MAPPED_MD =
  "`Please import and add this component's usage markdown to the componentMap in .storybook/usage-addon/usage.js.`";
const Usage = (props) => {
  // First we determine the currently active story's kebab-cased name.
  const { storyId = '' } = useStorybookState();

  // Then we get the currently selected locale
  const [{ locale }] = useGlobals();

  // Check if this is a component's story and grab it's name when available.
  const componentName = storyId.includes('components-')
    ? storyId.split('components-')[1].split('--')[0]
    : null;

  // 🎯 This is where you want to add your imported component usage markdown.
  // Watch out for the locale postfix and pay attention to pick the key names according to the story url. eg:
  // ?path=/story/components-tab-navigation--text-only > tab-navigation_en
  // or:
  // ?path=/story/components-brandheader--standard > brandheader_de
  const componentMap = {
    'app-shell_en': appshell_en,
    'app-shell_de': appshell_de,
    accordion_en,
    accordion_de,
    'brand-header-navigation_en': brandHeader_en,
    'brand-header-navigation_de': brandHeader_de,
    breadcrumb_en,
    breadcrumb_de,
    button_en,
    button_de,
    card_en,
    card_de,
    checkbox_en,
    checkbox_de,
    'checkbox-group_en': checkboxGroup_en,
    'checkbox-group_de': checkboxGroup_de,
    divider_en,
    divider_de,
    badge_en,
    badge_de,
    'data-grid_en': datagrid_en,
    'data-grid_de': datagrid_de,
    'date-picker_en': date_picker_en,
    'date-picker_de': date_picker_de,
    'icon-library_en': icon_en,
    'icon-library_de': icon_de,
    icon_en,
    icon_de,
    link_en: linkMarkdown_en,
    link_de: linkMarkdown_de,
    logo_en,
    logo_de,
    'loading-spinner_de': loadingSpinner_de,
    'loading-spinner_en': loadingSpinner_en,
    list_en,
    list_de,
    'flyout-menu_en': menuFlyout_en,
    'flyout-menu_de': menuFlyout_de,
    modal_en,
    modal_de,
    pagination_en,
    pagination_de,
    'progress-bar_en': progressBar_en,
    'progress-bar_de': progressBar_de,
    'radio-button_en': radioButton_en,
    'radio-button_de': radioButton_de,
    'rating-stars_en': ratingStars_en,
    'rating-stars_de': ratingStars_de,
    dropdown_en,
    dropdown_de,
    'sidebar-navigation_en': sidebarNav_en,
    'sidebar-navigation_de': sidebarNav_de,
    slider_en,
    slider_de,
    switch_en: switchMarkdown_en,
    switch_de: switchMarkdown_de,
    'tab-navigation_en': tabNavigation_en,
    'tab-navigation_de': tabNavigation_de,
    table_en,
    table_de,
    tag_en,
    tag_de,
    'text-area_en': textArea_en,
    'text-area_de': textArea_de,
    'text-field_en': textField_en,
    'text-field_de': textField_de,
    footer_en,
    footer_de,
  };

  // Select the most appropriate markdown text based on if this is a component story and
  // if the component is present in the componentMap from above.
  const markdown = componentName
    ? componentMap[`${componentName}_${locale}`] || COMPONENT_NOT_MAPPED_MD
    : NOT_A_COMPONENT_MD;

  return (
    props.active && (
      <div
        className="sbdocs-frame"
        style={{
          background: 'white',
          minHeight: '100%',
        }}
      >
        <DocsWrapper
          className="sbdocs sbdocs-wrapper addon-usage"
          style={{ minHeight: '100%' }}
        >
          <DocsContent
            className="sbdocs sbdocs-content"
            style={{ maxWidth: '1066px' }}
          >
            <Description markdown={markdown} />
          </DocsContent>
        </DocsWrapper>
      </div>
    )
  );
};

export default Usage;
