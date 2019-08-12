import { newE2EPage } from '@stencil/core/testing';

describe('t-card', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<t-card>Click me!</t-card>');
    const element = await page.find('t-card');
    expect(element).toHaveClass('hydrated');
  });
});
// Todo: Add test for image
// Todo: Add test for image alt text