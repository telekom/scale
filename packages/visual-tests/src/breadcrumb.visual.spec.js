describe('Breadcrumb', () => {
  test.each([['standard']])('%p', async (variant) => {
    await global.page.goto(
      `http://host.docker.internal:3123/iframe.html?id=components-breadcrumb--${variant}&viewMode=story`
    );
    await page.waitForSelector('html.hydrated');
    
    const previewHtml = await page.$('body');
    const firstLink = await page.evaluateHandle(
      `document.querySelector("#root > scale-breadcrumb").shadowRoot.querySelector("nav > ol > li:nth-child(1) > a")`
    );
    expect(await previewHtml.screenshot()).toMatchImageSnapshot();
    await firstLink.hover();
    expect(await previewHtml.screenshot()).toMatchImageSnapshot();
    // mouse down on firstlink
    await page.mouse.move(40, 30);
    await page.mouse.down();
    expect(await previewHtml.screenshot()).toMatchImageSnapshot();
  });
});
