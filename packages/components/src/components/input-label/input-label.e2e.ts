import { newE2EPage } from '@stencil/core/testing';

describe('scale-input-label', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<scale-input-label/>');
    const element = await page.find('scale-input-label');
    expect(element).toHaveClass('hydrated');
  });
});
