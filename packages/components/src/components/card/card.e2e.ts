import { newE2EPage } from '@stencil/core/testing';

describe('scale-card', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<scale-card>Click me!</scale-card>');
    const element = await page.find('scale-card');
    expect(element).toHaveClass('hydrated');
  });
});
