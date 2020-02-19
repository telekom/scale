import { newE2EPage } from '@stencil/core/testing';

describe('t-input', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<t-input/>');
    const element = await page.find('t-input');
    expect(element).toHaveClass('hydrated');
  });
});
