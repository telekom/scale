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
import { Description } from '@storybook/components';
import { useStorybookState, useGlobals } from '@storybook/api';
import accordion_en from 'raw-loader!../../stories/components/accordion/accordion.md';
import accordion_de from 'raw-loader!../../stories/components/accordion/accordion_de.md';
import brandHeader_en from 'raw-loader!../../stories/deprecated/brand-header-navigation/brand-header.md';
import brandHeader_de from 'raw-loader!../../stories/deprecated/brand-header-navigation/brand-header_de.md';
import telekomBrandHeader_en from 'raw-loader!../../stories/components/telekom-brand-header-navigation/telekom-brand-header.md';
import telekomBrandHeader_de from 'raw-loader!../../stories/components/telekom-brand-header-navigation/telekom-brand-header_de.md';
import breadcrumb_en from 'raw-loader!../../stories/components/breadcrumb/breadcrumb.md';
import breadcrumb_de from 'raw-loader!../../stories/components/breadcrumb/breadcrumb_de.md';
import button_en from 'raw-loader!../../stories/components/button/button.md';
import button_de from 'raw-loader!../../stories/components/button/button_de.md';
import card_en from 'raw-loader!../../stories/components/card/card.md';
import card_de from 'raw-loader!../../stories/components/card/card_de.md';
import checkbox_en from 'raw-loader!../../stories/components/checkbox/checkbox.md';
import checkbox_de from 'raw-loader!../../stories/components/checkbox/checkbox_de.md';
import checkboxGroup_en from 'raw-loader!../../stories/components/checkbox-group/checkbox-group.md';
import checkboxGroup_de from 'raw-loader!../../stories/components/checkbox-group/checkbox-group_de.md';
import chip_de from 'raw-loader!../../stories/components/chip/chip_de.md';
import chip_en from 'raw-loader!../../stories/components/chip/chip.md';
import datagrid_en from 'raw-loader!../../stories/components/data-grid/data-grid.md';
import datagrid_de from 'raw-loader!../../stories/components/data-grid/data-grid_de.md';
import date_picker_en from 'raw-loader!../../stories/components/date-picker/date-picker.md';
import date_picker_de from 'raw-loader!../../stories/components/date-picker/date-picker_de.md';
import divider_en from 'raw-loader!../../stories/components/divider/divider.md';
import divider_de from 'raw-loader!../../stories/components/divider/divider_de.md';
import icon_en from 'raw-loader!../../stories/components/icon/icon.md';
import icon_de from 'raw-loader!../../stories/components/icon/icon_de.md';
import linkMarkdown_en from 'raw-loader!../../stories/components/link/link.md';
import linkMarkdown_de from 'raw-loader!../../stories/components/link/link_de.md';
import logo_en from 'raw-loader!../../stories/components/logo/logo.md';
import logo_de from 'raw-loader!../../stories/components/logo/logo_de.md';
import loadingSpinner_en from 'raw-loader!../../stories/components/loading-spinner/loading-spinner.md';
import loadingSpinner_de from 'raw-loader!../../stories/components/loading-spinner/loading-spinner_de.md';
import list_en from 'raw-loader!../../stories/components/list/list.md';
import list_de from 'raw-loader!../../stories/components/list/list_de.md';
import menuFlyout_en from 'raw-loader!../../stories/components/flyout-menu/menu-flyout.md';
import menuFlyout_de from 'raw-loader!../../stories/components/flyout-menu/menu-flyout_de.md';
import modal_en from 'raw-loader!../../stories/components/modal/modal.md';
import modal_de from 'raw-loader!../../stories/components/modal/modal_de.md';
import notification_de from 'raw-loader!../../stories/components/notification/notification_de.md';
import notification_en from 'raw-loader!../../stories/components/notification/notification.md';
import notificationBadge_de from 'raw-loader!../../stories/components/notification-badge/notification-badge_de.md';
import notificationBadge_en from 'raw-loader!../../stories/components/notification-badge/notification-badge.md';
import notificationBanner_de from 'raw-loader!../../stories/deprecated/notification-banner/notification-banner_de.md';
import notificationBanner_en from 'raw-loader!../../stories/deprecated/notification-banner/notification-banner.md';
import notificationMessage_de from 'raw-loader!../../stories/deprecated/notification-message/notification-message_de.md';
import notificationMessage_en from 'raw-loader!../../stories/deprecated/notification-message/notification-message.md';
import notificationToast_de from 'raw-loader!../../stories/deprecated/notification-toast/notification-toast_de.md';
import notificationToast_en from 'raw-loader!../../stories/deprecated/notification-toast/notification-toast.md';
import pagination_en from 'raw-loader!../../stories/components/pagination/pagination.md';
import pagination_de from 'raw-loader!../../stories/components/pagination/pagination_de.md';
import progressBar_en from 'raw-loader!../../stories/components/progress-bar/progress-bar.md';
import progressBar_de from 'raw-loader!../../stories/components/progress-bar/progress-bar_de.md';
import ratingStars_en from 'raw-loader!../../stories/components/rating-stars/rating-stars.md';
import ratingStars_de from 'raw-loader!../../stories/components/rating-stars/rating-stars_de.md';
import radioButtonGroup_de from 'raw-loader!../../stories/components/radio-button-group/radio-button-group_de.md';
import radioButtonGroup_en from 'raw-loader!../../stories/components/radio-button-group/radio-button-group.md';
import dropdownSelect_en from 'raw-loader!../../stories/components/dropdown-select/dropdown-select.md';
import dropdownSelect_de from 'raw-loader!../../stories/components/dropdown-select/dropdown-select_de.md';
import dropdown_en from 'raw-loader!../../stories/components/dropdown/dropdown.md';
import dropdown_de from 'raw-loader!../../stories/components/dropdown/dropdown_de.md';
import segmentedButton_en from 'raw-loader!../../stories/components/segmented-button/segmented-button.md';
import segmentedButton_de from 'raw-loader!../../stories/components/segmented-button/segmented-button_de.md';
import sidebarNav_en from 'raw-loader!../../stories/components/sidebar-navigation/sidebar-nav.md';
import sidebarNav_de from 'raw-loader!../../stories/components/sidebar-navigation/sidebar-nav_de.md';
import slider_en from 'raw-loader!../../stories/components/slider/slider.md';
import slider_de from 'raw-loader!../../stories/components/slider/slider_de.md';
import switchMarkdown_en from 'raw-loader!../../stories/components/switch/switch.md';
import switchMarkdown_de from 'raw-loader!../../stories/components/switch/switch_de.md';
import tabNavigation_en from 'raw-loader!../../stories/components/tab-navigation/tab-navigation.md';
import tabNavigation_de from 'raw-loader!../../stories/components/tab-navigation/tab-navigation_de.md';
import table_en from 'raw-loader!../../stories/components/table/table.md';
import table_de from 'raw-loader!../../stories/components/table/table_de.md';
import tag_en from 'raw-loader!../../stories/components/tag/tag.md';
import tag_de from 'raw-loader!../../stories/components/tag/tag_de.md';
import textArea_en from 'raw-loader!../../stories/components/text-area/text-area.md';
import textArea_de from 'raw-loader!../../stories/components/text-area/text-area_de.md';
import textField_en from 'raw-loader!../../stories/components/text-field/text-field.md';
import textField_de from 'raw-loader!../../stories/components/text-field/text-field_de.md';
import footer_en from 'raw-loader!../../stories/deprecated/footer/footer.md';
import footer_de from 'raw-loader!../../stories/deprecated/footer/footer_de.md';
import telekomFooter_en from 'raw-loader!../../stories/components/telekom-footer/telekom-footer.md';
import telekomFooter_de from 'raw-loader!../../stories/components/telekom-footer/telekom-footer_de.md';
import telekomProfileMenu_en from 'raw-loader!../../stories/components/telekom-profile-menu/profile-menu.md';
import telekomProfileMenu_de from 'raw-loader!../../stories/components/telekom-profile-menu/profile-menu_de.md';
import callout_en from 'raw-loader!../../stories/components/callout/callout.md';
import callout_de from 'raw-loader!../../stories/components/callout/callout_de.md';
import toggleGroup_de from 'raw-loader!../../stories/deprecated/toggle-group/toggle-group_de.md';
import toggleGroup_en from 'raw-loader!../../stories/deprecated/toggle-group/toggle-group.md';
import tooltip_en from 'raw-loader!../../stories/components/tooltip/tooltip.md';
import tooltip_de from 'raw-loader!../../stories/components/tooltip/tooltip_de.md';

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
    accordion_en,
    accordion_de,
    'brand-header-navigation_en': brandHeader_en,
    'brand-header-navigation_de': brandHeader_de,
    'telekom-brand-header-navigation_en': telekomBrandHeader_en,
    'telekom-brand-header-navigation_de': telekomBrandHeader_de,
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
    chip_en,
    chip_de,
    divider_en,
    divider_de,
    callout_en,
    callout_de,
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
    notification_en,
    notification_de,
    'notification-badge_en': notificationBadge_en,
    'notification-badge_de': notificationBadge_de,
    'notification-banner_en': notificationBanner_en,
    'notification-banner_de': notificationBanner_de,
    'notification-message_en': notificationMessage_en,
    'notification-message_de': notificationMessage_de,
    'notification-toast_en': notificationToast_en,
    'notification-toast_de': notificationToast_de,
    pagination_en,
    pagination_de,
    'progress-bar_en': progressBar_en,
    'progress-bar_de': progressBar_de,
    'radio-button-group_en': radioButtonGroup_en,
    'radio-button-group_de': radioButtonGroup_de,
    'rating-stars_en': ratingStars_en,
    'rating-stars_de': ratingStars_de,
    'dropdown-select_en': dropdownSelect_en,
    'dropdown-select_de': dropdownSelect_de,
    dropdown_en,
    dropdown_de,
    'segmented-button_en': segmentedButton_en,
    'segmented-button_de': segmentedButton_de,
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
    'telekom-footer_en': telekomFooter_en,
    'telekom-footer_de': telekomFooter_de,
    'telekom-profile-menu_en': telekomProfileMenu_en,
    'telekom-profile-menu_de': telekomProfileMenu_de,
    'toggle-group_en': toggleGroup_en,
    'toggle-group_de': toggleGroup_de,
    tooltip_en,
    tooltip_de,
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
