import { newE2EPage } from '@stencil/core/testing';

describe('t-input-label', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<t-input-label/>');
    const element = await page.find('t-input-label');
    expect(element).toHaveClass('hydrated');
  });
});
