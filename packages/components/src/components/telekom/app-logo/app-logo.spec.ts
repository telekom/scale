import { newSpecPage } from '@stencil/core/testing';
import { Logo } from './app-logo';

describe('AppLogo', () => {
  let page;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [Logo],
      html: `<app-logo></app-logo>`,
    });
  });
  it('should match snapshot', async () => {
    expect(page.root).toMatchSnapshot();
  });

  it('should handle claim propertie', async () => {
    const page = await newSpecPage({
      components: [Logo],
      html: `
        <app-logo
            claim=true
        ></app-logo>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('should handle de language', async () => {
    const page = await newSpecPage({
      components: [Logo],
      html: `
            <app-logo
                claim=true
                claim-lang='de'
            ></app-logo>`,
    });
    expect(page.rootInstance.claimLang).toBe('de');
  });

  it('should emit on focus', async () => {
    const page = await newSpecPage({
      components: [Logo],
      html: `
          <app-logo
              claim=true
          ></app-logo>`,
    });
    expect(page.root).toMatchSnapshot();
    const element = page.doc.querySelector('a');
    window.scrollTo = jest.fn();
    await element.dispatchEvent(new Event('focus'));
    await page.waitForChanges();
    expect(window.scrollTo).toBeCalled();
  });
});
