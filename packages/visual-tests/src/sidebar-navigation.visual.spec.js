const { test, expect } = require('./test-fixtures');

test.describe('SidebarNavigation', () => {
  for (const [variant, currentLink] of [
    ['standard', 'Endpoint 1'],
    ['active-on-level-1', 'Resources'],
    ['active-on-level-2', 'Day'],
    ['active-on-level-3', 'Endpoint 1'],
    ['custom-media-query', 'Endpoint 1'],
  ]) {
    test(`${variant}`, async ({ page, story }) => {
      await story.open(`components-sidebar-navigation--${variant}`);
      const navigation = page.getByRole('navigation');
      const sidebar = page.locator('scale-sidebar-nav');
      const current = sidebar.getByRole('link', {
        name: `${currentLink} Zurzeit aktiv`,
        exact: true,
      });
      await expect(navigation).toBeVisible();
      await expect(current).toBeVisible();
      await expect(current).toHaveAttribute('aria-current', 'page');
      await expect(sidebar.locator('a[aria-current="page"]')).toHaveCount(1);
      for (const link of await sidebar.getByRole('link').all()) {
        await expect(link).toHaveAttribute('href', '#');
      }
      if (variant !== 'active-on-level-1') {
        await expect(
          sidebar.getByRole('button', { name: 'Reference', exact: true })
        ).toHaveAttribute('aria-expanded', 'true');
      }
      await story.screenshot('default.png');
    });
  }

  test('standard selected', async ({ page, story }) => {
    await story.open('components-sidebar-navigation--standard');
    const initialURL = page.url();
    const reference = page.getByRole('button', {
      name: 'Reference',
      exact: true,
    });
    const functionA = page.getByRole('button', {
      name: 'Function A',
      exact: true,
    });
    const functionB = page.getByRole('button', {
      name: 'Function B',
      exact: true,
    });
    const endpoint1 = page.getByRole('link', { name: /Endpoint 1/ });
    const endpoint4 = page.getByRole('link', {
      name: 'Endpoint 4',
      exact: true,
    });
    await expect(endpoint1).toBeVisible();
    await expect(endpoint4).toBeHidden();
    await functionA.click();
    await expect(functionA).toHaveAttribute('aria-expanded', 'false');
    await expect(endpoint1).toBeHidden();
    await expect(functionB).toBeVisible();
    await story.screenshot('selected.png');
    await reference.click();
    await expect(reference).toHaveAttribute('aria-expanded', 'false');
    await expect(functionA).toBeHidden();
    await expect(functionB).toBeHidden();
    await expect(
      page.getByRole('link', { name: 'Console', exact: true })
    ).toBeVisible();
    await story.screenshot('selected-2.png');
    await reference.click();
    await expect(functionA).toHaveAttribute('aria-expanded', 'false');
    await expect(endpoint1).toBeHidden();
    await functionA.click();
    await expect(functionA).toHaveAttribute('aria-expanded', 'true');
    await expect(endpoint1).toBeVisible();
    await expect(endpoint1).toHaveAttribute('aria-current', 'page');
    await story.screenshot('reopened.png');
    await functionB.click();
    await expect(functionB).toHaveAttribute('aria-expanded', 'true');
    await expect(endpoint4).toBeVisible();
    await expect(
      page.getByRole('link', { name: 'Endpoint 6', exact: true })
    ).toBeVisible();
    await expect(page).toHaveURL(initialURL);
    await story.screenshot('function-b-expanded.png');
  });

  test('standard keyboard branches', async ({ page, story }) => {
    await story.open('components-sidebar-navigation--standard');
    const initialURL = page.url();
    const reference = page.getByRole('button', {
      name: 'Reference',
      exact: true,
    });
    await page.keyboard.press('Tab');
    await expect(
      page.getByRole('link', { name: 'Overview', exact: true })
    ).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(reference).toBeFocused();
    await page.keyboard.press('Space');
    await expect(reference).toHaveAttribute('aria-expanded', 'false');
    await expect(page.getByRole('link', { name: /Endpoint 1/ })).toBeHidden();
    await story.screenshot('keyboard-collapsed.png');
    await page.keyboard.press('Enter');
    await expect(reference).toHaveAttribute('aria-expanded', 'true');
    await expect(page.getByRole('link', { name: /Endpoint 1/ })).toBeVisible();
    await page.keyboard.press('Tab');
    const functionA = page.getByRole('button', {
      name: 'Function A',
      exact: true,
    });
    await expect(functionA).toBeFocused();
    await page.keyboard.press('Space');
    await expect(functionA).toHaveAttribute('aria-expanded', 'false');
    await expect(page.getByRole('link', { name: /Endpoint 1/ })).toBeHidden();
    await story.screenshot('keyboard-nested-collapsed.png');
    await page.keyboard.press('Enter');
    await expect(functionA).toHaveAttribute('aria-expanded', 'true');
    await expect(page.getByRole('link', { name: /Endpoint 1/ })).toBeVisible();
    await expect(page).toHaveURL(initialURL);
    await story.screenshot('keyboard-nested-expanded.png');
  });

  for (const [component, role, name, tabs] of [
    ['SidebarNavItem', 'link', 'Overview', 1],
    ['SidebarNavCollapsible', 'button', 'Reference', 2],
  ]) {
    test.describe(component, () => {
      test('standard states', async ({ page, story }) => {
        await story.open('components-sidebar-navigation--standard');
        const initialURL = page.url();
        const control = page.getByRole(role, { name, exact: true });
        for (let index = 0; index < tabs; index += 1) {
          await page.keyboard.press('Tab');
        }
        await expect(control).toBeFocused();
        await expect(control).not.toHaveCSS('box-shadow', 'none');
        await story.screenshot('focus.png');
        await control.evaluate((element) => element.blur());
        await control.hover();
        await expect(control).not.toBeFocused();
        await story.screenshot('hover.png');
        await page.mouse.down();
        try {
          await expect
            .poll(() =>
              control.evaluate((element) => element.matches(':active'))
            )
            .toBe(true);
          await story.screenshot('active.png');
        } finally {
          await page.mouse.up();
        }
        if (role === 'link') {
          await expect(page).toHaveURL(`${initialURL}#`);
        } else {
          await expect(control).toHaveAttribute('aria-expanded', 'false');
          await expect(
            page.getByRole('link', { name: /Endpoint 1/ })
          ).toBeHidden();
          await expect(page).toHaveURL(initialURL);
        }
      });
    });
  }

  test('custom-media-query responsive toggle', async ({ page, story }) => {
    await page.setViewportSize({ width: 700, height: 768 });
    await story.open('components-sidebar-navigation--custom-media-query');
    const menu = page.getByRole('button', { name: 'Menu', exact: true });
    const navigation = page.getByRole('navigation');
    await expect(menu).toBeVisible();
    await expect(menu).toHaveAttribute('aria-expanded', 'false');
    await expect(navigation).toBeHidden();
    await story.screenshot('collapsed.png');
    await page.keyboard.press('Tab');
    await expect(menu).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(menu).toHaveAttribute('aria-expanded', 'true');
    await expect(navigation).toBeVisible();
    await expect(page.getByRole('link', { name: /Endpoint 1/ })).toBeVisible();
    await story.screenshot('expanded.png');
    await page.keyboard.press('Space');
    await expect(menu).toHaveAttribute('aria-expanded', 'false');
    await expect(navigation).toBeHidden();
    await story.screenshot('recollapsed.png');
    await page.setViewportSize({ width: 705, height: 768 });
    await expect(menu).toBeHidden();
    await expect(navigation).toBeVisible();
    await expect(page.getByRole('link', { name: /Endpoint 1/ })).toBeVisible();
    await story.screenshot('above-breakpoint.png');
  });
});
