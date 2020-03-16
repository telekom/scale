import { newE2EPage } from '@stencil/core/testing';

describe('scale-text', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<scale-text>this is a tag</scale-text>');
    const element = await page.find('scale-text');
    expect(element).toHaveClass('hydrated');
  });
});
