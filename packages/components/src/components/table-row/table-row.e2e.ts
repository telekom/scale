import { newE2EPage } from '@stencil/core/testing';

describe('t-table-row', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<t-table-row>this is a tag</t-table-row>');
    const element = await page.find('t-table-row');
    expect(element).toHaveClass('hydrated');
  });
});
