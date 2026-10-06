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

import { newSpecPage } from '@stencil/core/testing';
import { DataGrid } from './data-grid';
import { HTMLCell } from './cell-handlers/html-cell';

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

describe('DataGrid', () => {
  beforeEach(() => {
    (globalThis as any).ResizeObserver = ResizeObserverMock;
  });

  it('renders html cell content inline when display is inline', async () => {
    const inlineButton = document.createElement('button');
    inlineButton.textContent = 'Open details';

    const page = await newSpecPage({
      components: [DataGrid],
      html: '<scale-data-grid></scale-data-grid>',
    });

    page.root.fields = [
      {
        type: 'html',
        display: 'inline',
        label: 'Action',
        width: 120,
      },
    ];
    page.root.rows = [[inlineButton]];

    await page.waitForChanges();

    expect(page.root.shadowRoot.querySelector('.tbody__nested')).toBeNull();
    expect(
      page.root.shadowRoot.querySelector('.tbody__cell button').textContent
    ).toBe('Open details');
  });

  it('keeps html cell content nested by default', async () => {
    const nestedContent = document.createElement('div');
    nestedContent.textContent = 'Nested details';

    const page = await newSpecPage({
      components: [DataGrid],
      html: '<scale-data-grid></scale-data-grid>',
    });

    page.root.fields = [
      {
        type: 'html',
        label: 'Details',
        width: 96,
      },
    ];
    page.root.rows = [[nestedContent]];

    await page.waitForChanges();

    expect(
      page.root.shadowRoot.querySelector('.tbody__cell scale-button')
    ).toBeTruthy();
    expect(
      page.root.shadowRoot.querySelector('.tbody__nested div').textContent
    ).toBe('Nested details');
  });

  it('uses the longest inline html content for auto width checks', () => {
    const shortButton = document.createElement('button');
    shortButton.textContent = 'Open';
    const longButton = document.createElement('button');
    longButton.textContent = 'Open ticket details';

    const longestContent = HTMLCell.getLongestContent({
      rows: [[shortButton], [longButton]],
      columnIndex: 0,
      field: { display: 'inline' },
    });

    expect(longestContent).toBe(longButton);
  });

  it('uses inline html content with empty text for auto width checks', () => {
    const iconOnlyButton = document.createElement('button');
    iconOnlyButton.setAttribute('aria-label', 'Open details');

    const longestContent = HTMLCell.getLongestContent({
      rows: [[iconOnlyButton]],
      columnIndex: 0,
      field: { display: 'inline' },
    });

    expect(longestContent).toBe(iconOnlyButton);
  });

  it('should forward accessibility titles to prefix and suffix text cell icons', async () => {
    const page = await newSpecPage({
      components: [DataGrid],
      html: `<scale-data-grid hide-menu hide-info fields='[{"type":"text","label":"Attachment","iconPrefix":"action-download","iconPrefixAccessibilityTitle":"Download attachment","iconSuffix":"action-download","iconSuffixAccessibilityTitle":"Attachment ready"}]' rows='[["Invoice.pdf"]]'></scale-data-grid>`,
    });

    const icons = page.root.shadowRoot.querySelectorAll(
      'scale-icon-action-download'
    ) as NodeListOf<HTMLElement>;

    expect(icons).toHaveLength(2);
    expect(icons[0].getAttribute('accessibility-title')).toBe(
      'Download attachment'
    );
    expect(icons[1].getAttribute('accessibility-title')).toBe(
      'Attachment ready'
    );
  });

  it('should preserve label fallback when text cell icon accessibility titles are not provided', async () => {
    const page = await newSpecPage({
      components: [DataGrid],
      html: `<scale-data-grid hide-menu hide-info fields='[{"type":"text","label":"Status","iconPrefix":"action-download","iconSuffix":"action-download"}]' rows='[["Complete"]]'></scale-data-grid>`,
    });

    const icons = page.root.shadowRoot.querySelectorAll(
      'scale-icon-action-download'
    ) as NodeListOf<HTMLElement>;

    expect(icons).toHaveLength(2);
    expect(icons[0].getAttribute('accessibility-title')).toBe('Status');
    expect(icons[1].getAttribute('accessibility-title')).toBe('Status');
  });

  it('should fall back to label when accessibility titles are empty strings', async () => {
    const page = await newSpecPage({
      components: [DataGrid],
      html: `<scale-data-grid hide-menu hide-info fields='[{"type":"text","label":"Status","iconPrefix":"action-download","iconPrefixAccessibilityTitle":"","iconSuffix":"action-download","iconSuffixAccessibilityTitle":""}]' rows='[["Complete"]]'></scale-data-grid>`,
    });

    const icons = page.root.shadowRoot.querySelectorAll(
      'scale-icon-action-download'
    ) as NodeListOf<HTMLElement>;

    expect(icons).toHaveLength(2);
    expect(icons[0].getAttribute('accessibility-title')).toBe('Status');
    expect(icons[1].getAttribute('accessibility-title')).toBe('Status');
  });
});
