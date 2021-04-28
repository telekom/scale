describe('SidebarNavigation', () => {
  test.each([['standard']])('%p', async (variant) => {
    await global.page.goto(
      `http://host.docker.internal:3123/iframe.html?id=components-sidebar-navigation--${variant}&viewMode=story`
    );
    await page.waitForSelector('html.hydrated');

    const secondItem = await page.evaluateHandle(
      `document.querySelector("#root > div > scale-sidebar-nav > scale-sidebar-nav-collapsible:nth-child(2)").shadowRoot.querySelector("li > div > a")`
    );
    await secondItem.click();

    const previewHtml = await page.$('body');
    expect(await previewHtml.screenshot()).toMatchImageSnapshot();
  });
});
