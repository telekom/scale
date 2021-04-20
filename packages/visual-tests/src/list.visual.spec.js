describe('List', () => {
  test.each([['ordered'], ['unordered'], ['unordered-with-custom-icon']])(
    '%p',
    async variant => {
      await global.page.goto(
        `http://host.docker.internal:3123/iframe.html?id=components-list--${variant}&viewMode=story`
      );
      await page.waitForSelector('html.hydrated');
      await page.waitFor(1000);
      const previewHtml = await page.$('body');
      expect(await previewHtml.screenshot()).toMatchImageSnapshot();
    }
  );
});
