import { newSpecPage } from '@stencil/core/testing';
import { SearchListItem } from './search-list-item';

describe('SearchListItem', () => {
  let page;

  beforeEach(async () => {
    page = await newSpecPage({
      components: [SearchListItem],
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
  });

  it('should match snapshot', async () => {
    expect(page.root).toMatchSnapshot();
  });

  it('should reflect attributes/props being set', async () => {
    const specPage = await newSpecPage({
      components: [SearchListItem],
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
