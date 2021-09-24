describe('Accordion', () => {
  test.each([['standard'], ['dependent']])('%p', async (variant) => {
    await global.page.goto(
      `http://host.docker.internal:3123/iframe.html?id=components-accordion--${variant}&viewMode=story`
    );
    await page.waitForSelector('html.hydrated');
    const previewHtml = await page.$('body');

    const firstButton = await page.evaluateHandle(
      `document.querySelector("#root > scale-accordion > scale-collapsible:nth-child(1)").shadowRoot.querySelector("div > h2 > button")`
    );
    await firstButton.click();

    await page.waitFor(1000);

    expect(await previewHtml.screenshot()).toMatchImageSnapshot();
  });
});
