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
  @Prop({reflectToAttr: true, mutable: true}) opened: boolean;

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
    console.log('alert closed');
    this.opened = false;
  };

  @Method()
  open() {
    this.opened = true;
  }

  render() {

    let mainContent = <slot />;

    return (
      <div class={this.getCssClassMap()}>
        <header>

          <h4 class="alert--title">
            {this.title}
          </h4>
          <button
            onClick={this.onCloseAlert}
          >x
          </button>
        </header>
        <body>

        {mainContent}
        </body>


      </div>
    );
  }
}
