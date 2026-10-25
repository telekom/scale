const { test, expect } = require('./test-fixtures');

test('sidebar follows an updated nested link while preserving its current item @interaction', async ({
  page,
  story,
}) => {
  await story.open('components-sidebar-navigation--standard');
  const initialURL = page.url();
  const endpoint1 = page.getByRole('link', {
    name: /Endpoint 1/,
  });
  await endpoint1.evaluate((link) => {
    const label = Array.from(link.childNodes).find(
      (node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim()
    );
    label.textContent = 'Endpoint Live';
    link.setAttribute('href', '#endpoint-live');
  });
  const liveEndpoint = page.getByRole('link', { name: /Endpoint Live/ });
  await expect(liveEndpoint).toHaveAttribute('href', '#endpoint-live');
  await expect(liveEndpoint).toHaveAttribute('aria-current', 'page');
  await liveEndpoint.click();
  await expect(page).toHaveURL(`${initialURL}#endpoint-live`);
});
