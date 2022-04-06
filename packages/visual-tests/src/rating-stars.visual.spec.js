describe('RatingStars', () => {
  describe.each(['light', 'dark'])('%p', (mode) => {
    beforeAll(async () => {
      await page.goto(
        `http://host.docker.internal:3123/iframe.html?id=components-rating-stars--standard&viewMode=story`
      );
      await page.evaluate((mode) => {
        localStorage.setItem('persistedColorMode', JSON.stringify(mode));
      }, mode);
    });
    test.each([
      ['info-text-and-custom-label'],
      ['disabled'],
      ['small-with-info-text'],
      ['hidden-label'],
      ['readonly'],
    ])('%p', async (variant) => {
      await page.goto(
        `http://host.docker.internal:3123/iframe.html?id=components-rating-stars--${variant}&viewMode=story`
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
    // focus, active
    test.each([['info-text-and-custom-label']])('%p', async (variant) => {
      await page.goto(
        `http://host.docker.internal:3123/iframe.html?id=components-rating-stars--${variant}&viewMode=story`
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
      const input = await page.evaluateHandle(
        `document.querySelector("#root > scale-rating-stars").shadowRoot.querySelector("input[type=range]")`
      );
      await input.focus();
      expect(await previewHtml.screenshot()).toMatchImageSnapshot();
      await page.mouse.move(40, 60);
      await page.mouse.down();
      await page.waitFor(500);
      expect(await previewHtml.screenshot()).toMatchImageSnapshot();
    });
  });
});
