import { newE2EPage } from '@stencil/core/testing';

describe('scale-divider', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<scale-divider/>');
    const element = await page.find('scale-divider');
    expect(element).toHaveClass('hydrated');
  });
});
