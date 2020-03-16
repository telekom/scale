import { newE2EPage } from '@stencil/core/testing';

describe('scale-slider', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<scale-slider/>');
    const element = await page.find('scale-slider');
    expect(element).toHaveClass('hydrated');
  });
});
