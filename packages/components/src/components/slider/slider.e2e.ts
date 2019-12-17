import { newE2EPage } from '@stencil/core/testing';

describe('t-slider', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<t-slider></t-slider>');
    const element = await page.find('t-slider');
    expect(element).toHaveClass('hydrated');
  });
});
