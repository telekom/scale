describe('Card', () => {
  test.each([['standard'], ['with-link'], ['with-image']])(
    '%p',
    async (variant) => {
      await global.page.goto(
        `http://host.docker.internal:3123/iframe.html?id=components-card--${variant}&viewMode=story`
      );
      await page.waitForSelector('html.hydrated');
      const previewHtml = await page.$('body');
      expect(await previewHtml.screenshot()).toMatchImageSnapshot();
    }
  );
});
