import { newSpecPage } from '@stencil/core/testing';
import { DataGrid } from './data-grid';
import { ActionDownload } from '../icons/action-download/action-download';

describe('DataGrid', () => {
  beforeEach(() => {
    (global as any).ResizeObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
  });

  it('should forward accessibility titles to prefix and suffix text cell icons', async () => {
    const page = await newSpecPage({
      components: [DataGrid, ActionDownload],
      html: `<scale-data-grid hide-menu hide-info fields='[{"type":"text","label":"Attachment","iconPrefix":"action-download","iconPrefixAccessibilityTitle":"Download attachment","iconSuffix":"action-download","iconSuffixAccessibilityTitle":"Attachment ready"}]' rows='[["Invoice.pdf"]]'></scale-data-grid>`,
    });

    const icons = page.root.shadowRoot.querySelectorAll(
      'scale-icon-action-download'
    ) as NodeListOf<HTMLElement>;

    expect(icons).toHaveLength(2);
    expect(icons[0].getAttribute('accessibility-title')).toBe(
      'Download attachment'
    );
    expect(icons[0].querySelector('title').textContent).toBe(
      'Download attachment'
    );
    expect(icons[1].getAttribute('accessibility-title')).toBe(
      'Attachment ready'
    );
    expect(icons[1].querySelector('title').textContent).toBe(
      'Attachment ready'
    );
  });

  it('should preserve label fallback when text cell icon accessibility titles are not provided', async () => {
    const page = await newSpecPage({
      components: [DataGrid, ActionDownload],
      html: `<scale-data-grid hide-menu hide-info fields='[{"type":"text","label":"Status","iconPrefix":"action-download","iconSuffix":"action-download"}]' rows='[["Complete"]]'></scale-data-grid>`,
    });

    const icons = page.root.shadowRoot.querySelectorAll(
      'scale-icon-action-download'
    ) as NodeListOf<HTMLElement>;

    expect(icons).toHaveLength(2);
    expect(icons[0].getAttribute('accessibility-title')).toBe('Status');
    expect(icons[0].querySelector('title').textContent).toBe('Status');
    expect(icons[1].getAttribute('accessibility-title')).toBe('Status');
    expect(icons[1].querySelector('title').textContent).toBe('Status');
  });
});
