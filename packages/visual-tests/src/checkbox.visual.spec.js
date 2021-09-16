describe('Checkbox', () => {
  test.each([
    ['standard'],
    ['standard-disabled'],
    ['selected'],
    ['selected-disabled'],
    ['helper-text'],
    ['error'],
    ['custom-label'],
  ])('%p', async (variant) => {
    await global.page.goto(
      `http://host.docker.internal:3123/iframe.html?id=components-checkbox--${variant}&viewMode=story`
    );
    await page.waitForSelector('html.hydrated');
    const previewHtml = await page.$('body');
    expect(await previewHtml.screenshot()).toMatchImageSnapshot();
  });
  test.each([['standard'], ['selected'], ['custom-label']])(
    '%p',
    async (variant) => {
      await global.page.goto(
        `http://host.docker.internal:3123/iframe.html?id=components-checkbox--${variant}&viewMode=story`
      );
      await page.waitForSelector('html.hydrated');

      await page.evaluate(() => {
        const transitions = [
          '--scl-motion-duration-immediate',
          '--scl-motion-duration-fast',
          '--scl-motion-duration-slower',
          '--scl-motion-duration-deliberate',
        ];

        transitions.forEach((transitionSpeed) => {
          document.body.style.setProperty(transitionSpeed, '0s');
        });
      });

      const previewHtml = await page.$('body');
      const checkbox = await page.evaluateHandle(
        `document.querySelector("#root > scale-checkbox > label")`
      );
      await checkbox.hover();
      expect(await previewHtml.screenshot()).toMatchImageSnapshot();
      await page.mouse.move(20, 20);
      await page.mouse.down();
      expect(await previewHtml.screenshot()).toMatchImageSnapshot();
      await page.mouse.up();
      await page.mouse.move(0, 0);
      await checkbox.focus();
      expect(await previewHtml.screenshot()).toMatchImageSnapshot();
    }
  );
});
