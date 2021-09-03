describe('Button', () => {
  test.each([
    ['standard'],
    ['secondary'],
    ['secondary-disabled'],
    ['disabled'],
    ['with-icon-before'],
    ['with-icon-after'],
    ['icon-only'],
    ['link'],
    ['small-standard'],
    ['small-secondary'],
    ['small-secondary-disabled'],
    ['small-disabled'],
    ['small-with-icon-before'],
    ['small-with-icon-after'],
    ['small-icon-only'],
    ['small-link'],
  ])('%p', async (variant) => {
    await global.page.goto(
      `http://host.docker.internal:3123/iframe.html?id=components-button--${variant}&viewMode=story`
    );
    await page.waitForSelector('html.hydrated');
    const previewHtml = await page.$('body');
    const button = await page.evaluateHandle(
      `document.querySelector("#root scale-button").shadowRoot.querySelector(".button")`
    );
   /*  await button.focus();
    expect(await previewHtml.screenshot()).toMatchImageSnapshot()
    await button.hover();
    await page.waitFor(200);
    await button.hover();
    expect(await previewHtml.screenshot()).toMatchImageSnapshot(); */
    await page.mouse.move(20, 20);
    await page.mouse.down();
    await page.waitFor(200);
    expect(await previewHtml.screenshot()).toMatchImageSnapshot();
  });
});
