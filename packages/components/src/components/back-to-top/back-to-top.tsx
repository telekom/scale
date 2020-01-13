import { Component, h, State, Prop, Listen } from '@stencil/core';
import { CssClassMap } from '../../utils/utils';
import classNames from 'classnames';

@Component({
  tag: 't-back-to-top',
  styleUrl: 'back-to-top.css',
  shadow: true,
})
export class BackToTop {
  /** (optional) define the scroll height value, the back to top button will not show until the height reaches the value */
  @Prop() public visibilityHeight?: number = 200;
  /** (optional) text inside back to top button */
  @Prop() public text?: string = '⬆';

  @State() private visible: boolean = false;

  @Listen('scroll', { target: 'window' })
  public handleScroll(event) {
    if (
      (event.target.documentElement &&
        event.target.documentElement.scrollTop > this.visibilityHeight) ||
      (event.target.body && event.target.body.scrollTop > this.visibilityHeight)
    ) {
      this.visible = true;
    } else {
      this.visible = false;
    }
  }

  public scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  public render() {
    this.visible = document.documentElement.scrollTop > this.visibilityHeight;
    return (
      <div
        class={this.getCssClassMap()}
        onClick={this.scrollToTop}
        onScroll={() => this.handleScroll}
      >
        {this.text}
      </div>
    );
  }

  private getCssClassMap(): CssClassMap {
    return classNames(
      'back-to-top__container',
      this.visible && `back-to-top__container-visible`
    );
  }
}
