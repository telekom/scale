import { newE2EPage } from '@stencil/core/testing';

describe('scale-table', () => {
  it('should match snapshot', async () => {
    const page = await newE2EPage();
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
            <div slot="header">Table Header</div>
            <div slot="table">
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
            </div>

          </scale-table>
        </body>
      </html>
    `);
    const element = await page.find('scale-table');
    expect(element).toHaveClass('hydrated');
  });
});
