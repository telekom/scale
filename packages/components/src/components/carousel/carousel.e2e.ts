import { newE2EPage } from '@stencil/core/testing';

describe('scale-carousel', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<scale-carousel/>');
    const element = await page.find('scale-carousel');
    expect(element).toHaveClass('hydrated');
  });
});
