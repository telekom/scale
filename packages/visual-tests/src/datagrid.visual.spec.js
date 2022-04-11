describe('DataGrid', () => {
  describe.each(['light', 'dark'])('%p', (mode) => {
    beforeAll(async () => {
      await page.goto(
        `http://host.docker.internal:3123/iframe.html?id=components-data-grid--standard&viewMode=story`
      );
      await page.evaluate((mode) => {
        localStorage.setItem('persistedColorMode', JSON.stringify(mode));
      }, mode);
    });
    test.each([
      ['email-cell'],
      ['date-cell'],
      ['html-cell'],
      ['number-cell'],
      ['select-cell'],
      ['text-cell'],
      ['heading'],
      ['hide-extras'],
      ['pagination'],
      ['column-stretch'],
      ['tags-cell'],
      ['telephone-cell'],
      ['selection-export'],
    ])('%p', async (variant) => {
      await page.goto(
        `http://host.docker.internal:3123/iframe.html?id=components-data-grid--${variant}&viewMode=story`
      );
      await page.waitForSelector('html.hydrated');
      const previewHtml = await page.$('body');
      await page.evaluate(() => {
        [
          '--telekom-motion-duration-immediate',
          '--telekom-motion-duration-transition',
          '--telekom-motion-duration-animation',
          '--telekom-motion-duration-animation-deliberate',
        ].forEach((transitionSpeed) => {
          document.body.style.setProperty(transitionSpeed, '0s');
        });
      });

      expect(await previewHtml.screenshot()).toMatchImageSnapshot();
    });
  });
});
