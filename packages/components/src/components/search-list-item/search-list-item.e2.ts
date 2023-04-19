import { newE2EPage } from '@stencil/core/testing';

describe('scale-search-list-item', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<scale-search-list-item>Item 01</scale-search-list-item>'
    );
    const element = await page.find('scale-search-list-item');
    expect(element).toHaveClass('hydrated');
  });
});
