import { newE2EPage } from '@stencil/core/testing';

describe('t-rating', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<t-rating></t-rating>');
    const element = await page.find('t-rating');
    expect(element).toHaveClass('hydrated');
  });
});
