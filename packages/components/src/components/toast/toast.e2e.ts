import { newE2EPage } from '@stencil/core/testing';

describe('scale-toast', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<scale-toast>Toast message</scale-toast>');
    const element = await page.find('scale-toast');
    expect(element).toHaveClass('hydrated');
  });
});
