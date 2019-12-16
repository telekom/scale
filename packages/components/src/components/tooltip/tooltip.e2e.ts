import { newE2EPage } from '@stencil/core/testing';

describe('t-tooltip', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<t-tooltip>Tooltip</t-tooltip>');
    const element = await page.find('t-tooltip');
    expect(element).toHaveClass('hydrated');
  });
});
