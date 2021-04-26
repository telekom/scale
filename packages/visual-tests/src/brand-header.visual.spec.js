describe('Brand Header', () => {
  it('hovering in mega menu', async () => {
    await global.page.goto(
      `http://host.docker.internal:3123/iframe.html?id=components-brand-header-navigation--standard&viewMode=story`
    );
    await page.waitForSelector('html.hydrated');

    const firstLink = await page.evaluateHandle(
      `document.querySelector("#root > div > scale-app-shell").shadowRoot.querySelector("div > scale-app-header > header > nav.header__nav > div > div.header__nav-menu-wrapper > div.header__nav-menu-main > ul > scale-nav-main:nth-child(1) > li > a")`
    );
    await firstLink.hover();

    const previewHtml = await page.$('body');
    expect(await previewHtml.screenshot()).toMatchImageSnapshot();
  });

  it('hovering in custom mega menu', async () => {
    await global.page.goto(
      `http://host.docker.internal:3123/iframe.html?id=components-brand-header-navigation--custom-main-navigation&viewMode=story`
    );
    await page.waitForSelector('html.hydrated');

    const firstLink = await page.evaluateHandle(
      `document.querySelector("#nav-main-with-mega-menu > li > a")`
    );
    await firstLink.hover();

    const previewHtml = await page.$('body');
    expect(await previewHtml.screenshot()).toMatchImageSnapshot();
  });

  test.each([
    ['standard'],
    ['custom-main-navigation'],
    ['custom-icon-navigation'],
    ['custom-sector-navigation'],
    ['custom-addon-navigation'],
    ['custom-logo'],
  ])('%p', async (variant) => {
    await global.page.goto(
      `http://host.docker.internal:3123/iframe.html?id=components-brand-header-navigation--${variant}&viewMode=story`
    );
    await page.waitForSelector('html.hydrated');

    const previewHtml = await page.$('body');
    expect(await previewHtml.screenshot()).toMatchImageSnapshot();
  });
});
