describe('Badge', () => {
  test.each([['standard'], ['sizes'], ['rotation'], ['color-choosing'], ['asterisk']])(
    '%p',
    async (variant) => {
      await global.page.goto(
        `http://host.docker.internal:3123/iframe.html?id=beta-components-badge--${variant}&viewMode=story`
      );
      await page.waitForSelector('html.hydrated');
      const previewHtml = await page.$('body');
      expect(await previewHtml.screenshot()).toMatchImageSnapshot();
    }
  );
});