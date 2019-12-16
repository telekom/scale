import { Component, h, Prop } from '@stencil/core';
import { CssClassMap } from '../../utils/utils';
import classNames from 'classnames';

@Component({
  tag: 't-switch',
  styleUrl: 'switch.css',
  shadow: true,
})
export class Switch {
  /** Switch props active optional */
  @Prop() public active?: boolean = false;
  /** Switch props disabled optional */
  @Prop() public disabled?: boolean = false;

  public toggleSwitch = () => {
    if (this.disabled) {
      return;
    }
    this.active = !this.active;
  };

  public render() {
    return <div class={this.getCssClassMap()} onClick={this.toggleSwitch} />;
  }

  private getCssClassMap(): CssClassMap {
    return classNames(
      'switch',
      this.active && `switch--active`,
      this.disabled && `switch--disabled`
    );
  }
}
