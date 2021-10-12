import { newSpecPage } from '@stencil/core/testing';
// import { remove } from 'lodash';
import { NotificationMessage } from './notification-message';

describe('NotificationMessage', () => {
  let element;

  beforeEach(async () => {
    element = new NotificationMessage();
  });

  it('should match snapshot', async () => {
    const page = await newSpecPage({
      components: [NotificationMessage],
      html: `<scale-notification-message opened="true"></scale-notification-message>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('should handle css classes', () => {
    element.variant = 'warning';
    expect(element.getCssClassMap()).toContain('variant-warning');
  });

  it('should test the close() fucntion', () => {
    expect(element.opened).toBe(undefined);
    element.close();
    expect(element.opened).toBe(false);
  });

  it('handle variant prop', async () => {
    const page = await newSpecPage({
      components: [NotificationMessage],
      html: `<scale-notification-message opened="true">Label</scale-notification-message>`,
    });
    page.root.variant = 'error';
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
    page.root.variant = 'warning';
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
    page.root.variant = 'informational';
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
    page.root.variant = 'success';
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });

  it('should emit onClick and set opened to false', async () => {
    const page = await newSpecPage({
      components: [NotificationMessage],
      html: `<scale-notification-message opened="true" has-close="true">Label</scale-notification-message>`,
    });
    const icon = page.root.shadowRoot.querySelector(
      '.notification-message__icon-close'
    );
    await page.waitForChanges();
    icon.dispatchEvent(new Event('click'));
    await page.waitForChanges();
    expect(page.rootInstance.opened).toBe(false);
  });

  it('should set timeout of the FIRST argument on function onCloseAlertWithTimeout()', async () => {
    const page = await newSpecPage({
      components: [NotificationMessage],
      html: `<scale-notification-message opened="true" >Label</scale-notification-message>`,
    });
    page.rootInstance.defaultTimeout = 1;
    page.rootInstance.timeout = true;
    await page.waitForChanges();
    expect(page.rootInstance.defaultTimeout).toBe(1);
    setTimeout(() => {
      expect(page.root.opened).toEqual(false);
    }, 1);
  });
});
