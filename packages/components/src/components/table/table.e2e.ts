import { newE2EPage } from '@stencil/core/testing';

describe('scale-table', () => {
  let page;
  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(`
      <html>
        <head></head>
        <body>
          <script>
            function sort(element) {
              const prevSort = element.getAttribute('aria-sort');
              const newSort = prevSort === 'descending' ? 'ascending' : prevSort === 'ascending' ? 'none' : 'descending';
              element.setAttribute('aria-sort', newSort)
            }
          </script>

          <scale-table>
          <table>
            <thead>
              <tr>
                <th id="title-header" onclick="sort(this)">Title</th>
                <th>Time</th>
                <th>Euros</th>
              </tr>
            </thead>
            <tbody>
            <tr>
              <td>University of Plymouth</td>
              <td>00:00:20</td>
              <td>100.245,10</td>
            </tr>
            <tr>
              <td>University of Plymouth</td>
              <td>00:00:20</td>
              <td>100.245,10</td>
            </tr>
            <tr>
              <td>University of Plymouth</td>
              <td>00:00:20</td>
              <td>100.245,10</td>
            </tr>
            </tbody>
            <tfoot>
              <tr>
                <td>Total</td>
                <td />
                <td />
                <td>00:00:20</td>
                <td>100.245,10</td>
              </tr>
            </tfoot>
          </table>
        </scale-table>
        </body>
      </html>
    `);
  });

  it('should not render sort icon initially', async () => {
    expect(await page.find('svg')).toMatchInlineSnapshot(`null`);
  });

  it('should render descending sort icon once table head is clicked', async () => {
    await page.click('#title-header');
    await page.waitForChanges();

    expect(
      (await page.find('polygon')).getAttribute('fill')
    ).toMatchInlineSnapshot(`"#CDCDCD"`);
  });

  it('should render ascending sort icon when table head is clicked twice', async () => {
    await page.click('#title-header');
    await page.click('#title-header');
    await page.waitForChanges();

    expect(
      (await page.find('polygon')).getAttribute('fill')
    ).toMatchInlineSnapshot(`"#000000"`);
  });

  it('should not render a sort icon when clicked the third time', async () => {
    await page.click('#title-header');
    await page.click('#title-header');
    await page.click('#title-header');
    await page.waitForChanges();

    expect(await page.find('svg')).toMatchInlineSnapshot(`null`);
  });
});
