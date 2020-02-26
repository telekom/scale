import { Component, h, Prop } from '@stencil/core';
import { CssClassMap } from '../../utils/utils';
import classNames from 'classnames';
import { TableRow } from './../table-row/table-row';

@Component({
  tag: 't-table-card',
  styleUrl: 'table-card.css',
  shadow: true,
})
export class TableCard {
  /** (optional) Tag class */
  @Prop() public customClass?: string = '';
  /** (optional) Tag theme */
  @Prop() public theme?: string = '';
  @Prop() public items: string[] = [];

  public render() {
    return (
      <table class={this.getCssClassMap()}>
        {this.items.map(item => {
          return <TableRow item={item} />;
        })}
      </table>
    );
  }

  private getCssClassMap(): CssClassMap {
    return classNames(
      'table-card',
      this.customClass && this.customClass,
      this.theme && `table-card--theme-${this.theme}`
    );
  }
}
