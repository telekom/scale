describe('Divider', () => {
  test.each([['standard'], ['vertical']])(
    '%p',
    async (variant) => {
      await global.page.goto(
        `http://host.docker.internal:3123/iframe.html?id=components-divider--${variant}&viewMode=story`
      );
      await page.waitForSelector('html.hydrated');
      const previewHtml = await page.$('body');
      expect(await previewHtml.screenshot()).toMatchImageSnapshot();
    }
  );
});
