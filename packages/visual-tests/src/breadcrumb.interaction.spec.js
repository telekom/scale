const { test, expect } = require('./test-fixtures');

test('breadcrumb link navigates by pointer and marks the current link @interaction', async ({
  page,
  story,
}) => {
  await story.open('components-breadcrumb--standard');
  const breadcrumb = page.getByRole('navigation', { name: 'Breadcrumb' });
  const homeLink = breadcrumb.getByRole('link', {
    name: 'Home',
    exact: true,
  });
  const currentLink = breadcrumb.getByRole('link', {
    name: 'Current Page',
    exact: true,
  });

  await expect(homeLink).toHaveAttribute(
    'href',
    /\/iframe\.html\?id=components-breadcrumb--standard&viewMode=story#1$/
  );
  await expect(currentLink).toHaveAttribute('aria-current', 'page');
  await homeLink.click();

  await expect(page).toHaveURL(/#1$/);
});

test('breadcrumb links navigate by keyboard @interaction', async ({
  page,
  story,
}) => {
  await story.open('components-breadcrumb--standard');
  const breadcrumb = page.getByRole('navigation', { name: 'Breadcrumb' });
  const links = [
    breadcrumb.getByRole('link', { name: 'Home', exact: true }),
    breadcrumb.getByRole('link', { name: 'Page 1', exact: true }),
    breadcrumb.getByRole('link', { name: 'Page 2', exact: true }),
    breadcrumb.getByRole('link', { name: 'Current Page', exact: true }),
  ];

  for (const link of links) {
    await page.keyboard.press('Tab');
    await expect(link).toBeFocused();
  }
  await expect(links[3]).toHaveAttribute('aria-current', 'page');
  await expect(links[3]).toHaveAttribute(
    'href',
    /\/iframe\.html\?id=components-breadcrumb--standard&viewMode=story#3$/
  );
  await page.keyboard.press('Enter');

  await expect(page).toHaveURL(/#3$/);
});
