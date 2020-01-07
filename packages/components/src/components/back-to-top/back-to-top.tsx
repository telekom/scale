import { Component, h, State, Prop, Listen } from '@stencil/core';
import { CssClassMap } from '../../utils/utils';
import classNames from 'classnames';

@Component({
  tag: 't-back-to-top',
  styleUrl: 'back-to-top.css',
  shadow: true,
})
export class BackToTop {
  @Prop() public visibilityHeight?: number = 200;

  @State() private visible: boolean = false;

  @Listen('scroll', { target: 'window' })
  public handleScroll(ev) {
    if (
      (ev.target.documentElement &&
        ev.target.documentElement.scrollTop > this.visibilityHeight) ||
      (ev.target.body && ev.target.body.scrollTop > this.visibilityHeight)
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
        <slot />
      </div>
    );
  }

  private getCssClassMap(): CssClassMap {
    return classNames(
      'back-to-top--container',
      this.visible && `back-to-top--container-visible`
    );
  }
}
