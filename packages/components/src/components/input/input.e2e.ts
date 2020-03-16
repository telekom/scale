import { newE2EPage } from '@stencil/core/testing';

describe('scale-input', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<scale-input/>');
    const element = await page.find('scale-input');
    expect(element).toHaveClass('hydrated');
  });
});
