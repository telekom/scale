describe('Menu', () => {
  test.each([
    ['standard'],
    ['cascading-menu'],
    ['checked-toggle'],
    ['brand-header-primary-navigation'],
  ])('%p', async (variant) => {
    await global.page.goto(
      `http://host.docker.internal:3123/iframe.html?id=components-flyout-menu--${variant}&viewMode=story`
    );
    await page.waitForSelector('html.hydrated');
    const previewHtml = await page.$('body');
    expect(await previewHtml.screenshot()).toMatchImageSnapshot();
  });
  // open menu on click
  test.each([['standard'], ['cascading-menu']])('%p', async (variant) => {
    await global.page.goto(
      `http://host.docker.internal:3123/iframe.html?id=components-flyout-menu--${variant}&viewMode=story`
    );
    await page.waitForSelector('html.hydrated');
    const previewHtml = await page.$('body');

    const button = await page.evaluateHandle(
      `document.querySelector("#root scale-menu-flyout > scale-button").shadowRoot.querySelector("button")`
    );
    await button.click();
    await page.waitForTimeout(500);
    await expect(await previewHtml.screenshot()).toMatchImageSnapshot();
  });
  // open 2nd and 3rd level of cascading menu on click
  // hover, active, focus
  test.each([['cascading-menu']])('%p', async (variant) => {
    await global.page.goto(
      `http://host.docker.internal:3123/iframe.html?id=components-flyout-menu--${variant}&viewMode=story`
    );
    await page.waitForSelector('html.hydrated');
    const previewHtml = await page.$('body');

    const button = await page.evaluateHandle(
      `document.querySelector("#root scale-menu-flyout > scale-button").shadowRoot.querySelector("button")`
    );
    const flyoutItemOne = await page.evaluateHandle(
      `document.querySelector("#root scale-menu-flyout > scale-menu-flyout-list > scale-menu-flyout-item:nth-child(8)")`
    );
    const flyoutItemTwo = await page.evaluateHandle(
      `document.querySelector("#root scale-menu-flyout > scale-menu-flyout-list > scale-menu-flyout-item:nth-child(8) > scale-menu-flyout-list > scale-menu-flyout-item:nth-child(2)")`
    );
    const base = await page.evaluateHandle(`document.querySelector("#root")`);
    await button.click();
    await page.waitForTimeout(300);
    await flyoutItemOne.hover();
    await page.waitForTimeout(300);
    await expect(await previewHtml.screenshot()).toMatchImageSnapshot();
    await base.click();
    await button.click();
    await page.waitForTimeout(300);
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(300);
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(300);
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(300);
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(300);
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(300);
    await expect(await previewHtml.screenshot()).toMatchImageSnapshot();
    await flyoutItemOne.click();
    await page.waitForTimeout(300);
    await expect(await previewHtml.screenshot()).toMatchImageSnapshot();
    await flyoutItemTwo.focus();
    await expect(await previewHtml.screenshot()).toMatchImageSnapshot();
    await flyoutItemTwo.click();
    await expect(await previewHtml.screenshot()).toMatchImageSnapshot();
  });
});
