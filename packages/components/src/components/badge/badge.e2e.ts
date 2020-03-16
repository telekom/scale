import { newE2EPage } from '@stencil/core/testing';

describe('scale-badge', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<scale-badge>Click me!</scale-badge>');
    const element = await page.find('scale-badge');
    expect(element).toHaveClass('hydrated');
  });
});
