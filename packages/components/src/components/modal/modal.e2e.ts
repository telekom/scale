import { newE2EPage } from '@stencil/core/testing';

describe('t-modal', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<t-modal>Notification</t-modal>');
    const element = await page.find('t-modal');
    expect(element).toHaveClass('hydrated');
  });
});
