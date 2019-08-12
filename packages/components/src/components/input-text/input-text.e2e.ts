import { newE2EPage } from '@stencil/core/testing';

describe('t-input-text', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<t-input-text/>');
    const element = await page.find('t-input-text');
    expect(element).toHaveClass('hydrated');
  });
});
