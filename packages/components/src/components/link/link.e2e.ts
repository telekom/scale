import { newE2EPage } from '@stencil/core/testing';

describe('scale-link', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<scale-link>default</scale-link>');
    const element = await page.find('scale-link');
    expect(element).toHaveClass('hydrated');
  });
});
