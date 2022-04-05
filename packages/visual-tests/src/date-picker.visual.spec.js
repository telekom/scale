describe('DatePicker', () => {
  describe.each(['light', 'dark'])('%p', (mode) => {
    beforeAll(async () => {
      await page.goto(
        `http://host.docker.internal:3123/iframe.html?id=components-date-picker--standard&viewMode=story`
      );
      await page.evaluate((mode) => {
        localStorage.setItem('persistedColorMode', JSON.stringify(mode));
      }, mode);
    });
    // open date-picker
    test.each([['standard']])('%p', async (variant) => {
      await page.goto(
        `http://host.docker.internal:3123/iframe.html?id=components-date-picker--${variant}&viewMode=story`
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
      const openButton = await page.evaluateHandle(
        `document.querySelector("#root > div > scale-date-picker > div > duet-date-picker > div > div.duet-date__input-wrapper > button")`
      );
      await openButton.click();
      await page.waitFor(3000);
      expect(await previewHtml.screenshot()).toMatchImageSnapshot();
    });
    // screenshots of stories
    test.each([
      ['standard'],
      ['helper-text'],
      ['with-error'],
      ['disabled'],
      ['small'],
      ['date-range-picker'],
    ])('%p', async (variant) => {
      await page.goto(
        `http://host.docker.internal:3123/iframe.html?id=components-date-picker--${variant}&viewMode=story`
      );
      await page.waitForSelector('html.hydrated');
      const previewHtml = await page.$('body');

      expect(await previewHtml.screenshot()).toMatchImageSnapshot();
    });
    // hover, active, focus
    test.each([['standard']])('%p', async (variant) => {
      await page.goto(
        `http://host.docker.internal:3123/iframe.html?id=components-date-picker--${variant}&viewMode=story`
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
      const datePicker = await page.evaluateHandle(
        `document.querySelector("#root > div > scale-date-picker > div > duet-date-picker > div > div.duet-date__input-wrapper > .duet-date__input")`
      );
      datePicker.hover();
      expect(await previewHtml.screenshot()).toMatchImageSnapshot();
      datePicker.focus();
      expect(await previewHtml.screenshot()).toMatchImageSnapshot();
    });
  });
});
