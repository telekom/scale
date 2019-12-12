import { newE2EPage } from '@stencil/core/testing';
import { execFile } from 'child_process';

describe('t-switch', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<t-switch></t-switch>');
    const element = await page.find('t-switch');
    expect(element).toHaveClass('hydrated');
  });

  it('should not toggle to active when switch is disabled ', async () => {
    const page = await newE2EPage({
      html: `<t-switch disabled="true" active="false"></t-switch>`,
    });
    const ele = await page.find('t-switch >>> .switch');
    await ele.click();
    expect(ele).not.toContain('.switch--active');
  });
});
