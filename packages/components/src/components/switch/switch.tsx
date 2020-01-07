import { Component, h, Prop } from '@stencil/core';
import { CssClassMap } from '../../utils/utils';
import classNames from 'classnames';

@Component({
  tag: 't-switch',
  styleUrl: 'switch.css',
  shadow: true,
})
export class Switch {
  /** (optional) Switch class */
  @Prop() public customClass?: string = '';
  /** (optional) Switch theme */
  @Prop() public theme?: string = '';
  /** (optional) Active switch */
  @Prop() public active?: boolean = false;
  /** (optional) Disabled switch */
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
      this.customClass && this.customClass,
      this.theme && `alert--theme-${this.theme}`,
      this.active && `switch--active`,
      this.disabled && `switch--disabled`
    );
  }
}
