import { newE2EPage } from '@stencil/core/testing';

describe('scale-progress-bar', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<scale-progress-bar/>');
    const element = await page.find('scale-progress-bar');
    expect(element).toHaveClass('hydrated');
  });
});
