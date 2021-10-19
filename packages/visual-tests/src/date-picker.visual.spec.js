describe('DatePicker', () => {
  test.each([['standard']])('%p', async (variant) => {
    await global.page.goto(
      `http://host.docker.internal:3123/iframe.html?id=components-date-picker--${variant}&viewMode=story`
    );
    await page.waitForSelector('html.hydrated');

    const openButton = await page.evaluateHandle(
      `document.querySelector("#root > div > scale-date-picker > div > duet-date-picker > div > div.duet-date__input-wrapper > button")`
    );
    await openButton.click();

    const previewHtml = await page.$('body');
    await page.waitFor(3000);

    expect(await previewHtml.screenshot()).toMatchImageSnapshot();
  });
  test.each([['helper-text'], ['with-error'], ['disabled']])(
    '%p',
    async (variant) => {
      await global.page.goto(
        `http://host.docker.internal:3123/iframe.html?id=components-date-picker--${variant}&viewMode=story`
      );
      await page.waitForSelector('html.hydrated');
      const previewHtml = await page.$('body');

      expect(await previewHtml.screenshot()).toMatchImageSnapshot();
    }
  );
});
