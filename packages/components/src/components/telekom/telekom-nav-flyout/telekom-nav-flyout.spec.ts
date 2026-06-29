import { newSpecPage } from '@stencil/core/testing';
import { TelekomNavItem } from './telekom-nav-flyout';

const keyboardEvent = (key: string) =>
  new KeyboardEvent('keydown', {
    bubbles: true,
    cancelable: true,
    key,
  });

describe('scale-telekom-nav-flyout', () => {
  it('opens a collapsed hover flyout on Enter', async () => {
    const page = await newSpecPage({
      components: [TelekomNavItem],
      html: `
        <a id="trigger" href="#target">Topic One</a>
        <scale-telekom-nav-flyout hover>
          <scale-telekom-mega-menu></scale-telekom-mega-menu>
        </scale-telekom-nav-flyout>
      `,
    });
    const trigger = page.doc.querySelector('#trigger') as HTMLAnchorElement;
    const flyout = page.root as HTMLScaleTelekomNavFlyoutElement;

    const keydown = keyboardEvent('Enter');
    trigger.dispatchEvent(keydown);
    await page.waitForChanges();

    expect(keydown.defaultPrevented).toBe(true);
    expect(flyout.expanded).toBe(true);

    const click = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      detail: 0,
    });
    trigger.dispatchEvent(click);

    expect(click.defaultPrevented).toBe(true);
  });

  it('does not block keyboard activation when a hover flyout is already expanded', async () => {
    const page = await newSpecPage({
      components: [TelekomNavItem],
      html: `
        <a id="trigger" href="#target">Topic One</a>
        <scale-telekom-nav-flyout hover expanded>
          <scale-telekom-mega-menu></scale-telekom-mega-menu>
        </scale-telekom-nav-flyout>
      `,
    });
    const trigger = page.doc.querySelector('#trigger') as HTMLAnchorElement;

    const keydown = keyboardEvent('Enter');
    trigger.dispatchEvent(keydown);
    await page.waitForChanges();

    expect(keydown.defaultPrevented).toBe(false);
  });

  it('does not block a second Enter activation after the flyout was opened by Enter', async () => {
    const page = await newSpecPage({
      components: [TelekomNavItem],
      html: `
        <a id="trigger" href="#target">Topic One</a>
        <scale-telekom-nav-flyout hover>
          <scale-telekom-mega-menu></scale-telekom-mega-menu>
        </scale-telekom-nav-flyout>
      `,
    });
    const trigger = page.doc.querySelector('#trigger') as HTMLAnchorElement;
    const flyout = page.root as HTMLScaleTelekomNavFlyoutElement;

    const firstKeydown = keyboardEvent('Enter');
    trigger.dispatchEvent(firstKeydown);
    await page.waitForChanges();

    expect(firstKeydown.defaultPrevented).toBe(true);
    expect(flyout.expanded).toBe(true);

    const firstClick = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      detail: 0,
    });
    trigger.dispatchEvent(firstClick);

    const secondKeydown = keyboardEvent('Enter');
    trigger.dispatchEvent(secondKeydown);
    await page.waitForChanges();

    expect(secondKeydown.defaultPrevented).toBe(false);

    const secondClick = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      detail: 0,
    });
    trigger.dispatchEvent(secondClick);

    expect(secondClick.defaultPrevented).toBe(false);
  });

  it('runs show only once when opening via Enter in hover mode', async () => {
    const page = await newSpecPage({
      components: [TelekomNavItem],
      html: `
        <a id="trigger" href="#target">Topic One</a>
        <scale-telekom-nav-flyout hover>
          <scale-telekom-mega-menu></scale-telekom-mega-menu>
        </scale-telekom-nav-flyout>
      `,
    });
    const trigger = page.doc.querySelector('#trigger') as HTMLAnchorElement;
    const flyout = page.rootInstance as TelekomNavItem;
    const showSpy = jest.spyOn(flyout, 'show');

    const keydown = keyboardEvent('Enter');
    trigger.dispatchEvent(keydown);
    await page.waitForChanges();

    expect(showSpy).toHaveBeenCalledTimes(1);
  });
});
