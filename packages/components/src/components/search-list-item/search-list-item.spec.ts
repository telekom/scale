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
});
