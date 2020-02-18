import { newE2EPage } from '@stencil/core/testing';

describe('t-input-error', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<t-input-error/>');
    const element = await page.find('t-input-error');
    expect(element).toHaveClass('hydrated');
  });
});
