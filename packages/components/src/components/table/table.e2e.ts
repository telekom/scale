import { newE2EPage } from '@stencil/core/testing';

describe('scale-table', () => {
  it('should match snapshot', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <scale-table>
        <div>Table header</div>
        <table>
          <thead>
            <tr>
              <th>Title</th>
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
    `);
    const element = await page.find('scale-table');
    expect(element).toHaveClass('hydrated');
  });
});
