import { newSpecPage } from '@stencil/core/testing';
import { SearchSelectItem } from './search-list-item';

describe('SearchSelectItem', () => {
  it('should match snapshot', async () => {
    const page = await newSpecPage({
      components: [SearchSelectItem],
      html: `<scale-search-list-item>Item 01</scale-search-list-item>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('should reflect attributes/props being set', async () => {
    const specPage = await newSpecPage({
      components: [SearchSelectItem],
      html: `<scale-search-list-item dismissible=true>
      <scale-icon-action-search
        size="24"
        slot="prefix"
      ></scale-icon-action-search>
      Item 01
      <div slot="supporting-text">Supporting text</div>
      <scale-icon-button size="medium" slot="suffix">
        <scale-icon-navigation-external-link
          size="24"
        ></scale-icon-navigation-external-link>
      </scale-icon-button>
    </scale-search-list-item>`,
    });

    expect(specPage.rootInstance.dismissible).toBe(true);
  });
});
