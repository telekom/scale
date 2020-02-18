import { newE2EPage } from '@stencil/core/testing';

describe('t-input-group', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<t-input-group/>');
    const element = await page.find('t-input-group');
    expect(element).toHaveClass('hydrated');
  });
});
