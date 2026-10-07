const path = require('path');
const { test: base, expect } = require('@playwright/test');

const test = base.extend({
  story: async ({ page, browser, colorScheme }, use, testInfo) => {
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('response', (response) => {
      if (response.status() >= 400)
        errors.push(`${response.status()} ${response.url()}`);
    });
    await page.clock.setFixedTime(new Date('2026-01-15T12:00:00.000Z'));
    await page.addInitScript((mode) => {
      localStorage.setItem('persistedColorMode', JSON.stringify(mode));
    }, colorScheme);

    const open = async (id) => {
      const response = await page.goto(`/iframe.html?id=${id}&viewMode=story`);
      expect(response.ok()).toBe(true);
      await expect(page.locator('#root, #storybook-root')).toBeVisible();
      await page.evaluate(async () => {
        const root = document.querySelector('#root, #storybook-root');
        const ready = async (element) => {
          if (element.localName.includes('-')) {
            await customElements.whenDefined(element.localName);
            if (element.componentOnReady) await element.componentOnReady();
          }
          await Promise.all(
            [...element.children, ...(element.shadowRoot?.children || [])].map(
              ready
            )
          );
        };
        await ready(root);
        await document.fonts.ready;
        await Promise.all(
          Array.from(document.images, (image) => image.decode())
        );
        for (const token of [
          '--telekom-motion-duration-immediate',
          '--telekom-motion-duration-transition',
          '--telekom-motion-duration-animation',
          '--telekom-motion-duration-animation-deliberate',
        ]) {
          document.body.style.setProperty(token, '0s');
        }
      });
    };

    let capture = 0;
    const screenshot = async (name) => {
      if (
        process.platform !== 'linux' ||
        process.arch !== 'x64' ||
        browser.version() !== '153.0.8010.12'
      ) {
        throw new Error(
          'Visual comparisons require the pinned Linux x64 image.'
        );
      }
      capture += 1;
      const filename = name || `state-${capture}.png`;
      await expect(page.locator('body')).toHaveScreenshot(filename);
      const baseline = testInfo.snapshotPath(filename);
      await testInfo.attach(
        path.relative(path.join(__dirname, '__image_snapshots__'), baseline),
        { path: baseline, contentType: 'image/png' }
      );
    };

    await use({ open, screenshot });
    expect(errors, 'Browser errors and failed asset requests').toEqual([]);
  },
});

module.exports = { test, expect };
