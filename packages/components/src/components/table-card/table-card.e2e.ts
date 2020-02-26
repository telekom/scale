import { newE2EPage } from '@stencil/core/testing';

describe('t-table-card', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<t-table-card>this is a tag</t-table-card>');
    const element = await page.find('t-table-card');
    expect(element).toHaveClass('hydrated');
  });
});
