import {Component, Prop, h, Method} from '@stencil/core';
import {CssClassMap} from '../../utils/utils';
import classNames from 'classnames';

@Component({
  tag: 't-alert',
  styleUrls: [
    'alert.css'
  ],
  shadow: true
})
export class alert {
  @Prop() customClass?: string = '';
  @Prop() size?: string = '';
  @Prop() theme?: string = '';
  @Prop() variant?: string = '';
  @Prop({reflectToAttr: true}) title: string;
  @Prop({reflectToAttr: true}) opened: boolean;

  private getCssClassMap(): CssClassMap {
    return classNames(
      'alert',
      this.customClass && this.customClass,
      this.size && `alert--size-${this.size}`,
      this.theme && `alert--theme-${this.theme}`,
      this.variant && `alert--variant-${this.variant}`
    );
  }

  onCloseAlert = () => {
    this.opened = false;
  };

  @Method()
  open() {
    this.opened = true;
  }

  render() {
    let mainContent = <slot />;
    let alertContent = null;
    if (this.opened) {
      alertContent = (
        <div class={this.getCssClassMap()}>
          <h4 class="alert--title">
            <i class="alert--icon"></i>
            {this.title}
            <button
              onClick={this.onCloseAlert}
            >x
            </button>
          </h4>
          <p>{mainContent}</p>
        </div>
      )
    }

    return alertContent;
  }
}
