describe('Table', () => {
  describe.each(['light', 'dark'])('%p', (mode) => {
    beforeAll(async () => {
      await global.runColorSetup('components-table--standard', mode);
    });
    test.each([['standard'], ['with-sorting-icons'], ['with-striped-rows']])(
      '%p',
      async (variant) => {
        await page.goto(
          `http://host.docker.internal:3123/iframe.html?id=components-table--${variant}&viewMode=story`
        );
        await global.page.waitForSelector('#root');
        await global.page.waitForTimeout(5000);
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
      }
    );
    test.each([['standard']])('%p', async (variant) => {
      await global.runSetup(`components-table--${variant}`);
      await global.page.waitForTimeout(5000);
      const row = await global.page.evaluateHandle(
        'document.querySelector("#sortable-table > tbody > tr:nth-child(3)")'
      );
      row.hover();
      await global.visualCheck();
    });
  });
});
