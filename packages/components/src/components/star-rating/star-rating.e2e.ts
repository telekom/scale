import { newE2EPage } from '@stencil/core/testing';

describe('t-star-rating', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<t-star-rating></t-star-rating>');
    const element = await page.find('t-star-rating');
    expect(element).toHaveClass('hydrated');
  });
});
