describe('Logo', () => {
  test.each([['standard'], ['white'], ['sizing'], ['link'], ['macedonia-cyrillic'], ['macedonia-latin-script']])('%p', async (variant) => {
    await global.page.goto(
      `http://host.docker.internal:3123/iframe.html?id=beta-components-logo--${variant}&viewMode=story`
    );
    await page.waitForSelector('html.hydrated');
    const previewHtml = await page.$('body');
    expect(await previewHtml.screenshot()).toMatchImageSnapshot();
    const image = await page.evaluateHandle(
      `document.querySelector("#root > scale-logo").shadowRoot.querySelector("svg")`
    );
    await image.focus();
    expect(await previewHtml.screenshot()).toMatchImageSnapshot();
  });
});
