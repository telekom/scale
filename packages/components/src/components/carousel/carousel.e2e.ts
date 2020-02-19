import { newE2EPage } from '@stencil/core/testing';

describe('t-carousel', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<t-carousel/>');
    const element = await page.find('t-carousel');
    expect(element).toHaveClass('hydrated');
  });
});
