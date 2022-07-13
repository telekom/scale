import { newE2EPage } from '@stencil/core/testing';

describe('brand-header', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<brand-header></brand-header>');

    const element = await page.find('brand-header');
    expect(element).toHaveClass('hydrated');
  });
});
