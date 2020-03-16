import { newE2EPage } from '@stencil/core/testing';

describe('scale-icon', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<scale-icon path="m 10 10">Label</scale-icon>');
    const element = await page.find('scale-icon');
    expect(element).toHaveClass('hydrated');
  });
});
