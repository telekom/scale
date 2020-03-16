import { newE2EPage } from '@stencil/core/testing';

describe('scale-input-error', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<scale-input-error/>');
    const element = await page.find('scale-input-error');
    expect(element).toHaveClass('hydrated');
  });
});
