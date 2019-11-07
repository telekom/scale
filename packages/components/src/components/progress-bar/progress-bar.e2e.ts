import { newE2EPage } from '@stencil/core/testing';

describe('t-progress-bar', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<t-progress-bar/>');
    const element = await page.find('t-progress-bar');
    expect(element).toHaveClass('hydrated');
  });
});
