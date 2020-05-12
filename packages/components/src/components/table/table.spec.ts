import { newSpecPage } from '@stencil/core/testing';
import { Table } from './table';
import { styles } from './table.styles';
import jss from 'jss';

describe('Table', () => {
  let element;
  let stylesheet;

  beforeEach(async () => {
    element = new Table();
    stylesheet = element.stylesheet = jss.createStyleSheet(styles as any);
  });

  it('should match snapshot', async () => {
    const page = await newSpecPage({
      components: [Table],
      html: `
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
      `,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('should handle css classes', () => {
    element.customClass = 'custom';
    expect(element.getCssClassMap()).toContain('custom');

    element.size = 'big';
    stylesheet.addRule('table--size-big', {});
    expect(element.getCssClassMap()).toContain(
      stylesheet.classes['table--size-big']
    );
  });
});
