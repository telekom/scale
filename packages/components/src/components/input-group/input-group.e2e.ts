import { newE2EPage } from '@stencil/core/testing';

describe('scale-input-group', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<scale-input-group/>');
    const element = await page.find('scale-input-group');
    expect(element).toHaveClass('hydrated');
  });
});
