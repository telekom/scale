import { Component, Prop, h } from '@stencil/core';
import { CssClassMap } from '../../utils/utils';
import classNames from 'classnames';

@Component({
    tag: 't-tooltip',
    styleUrl:'tooltip.css',
    shadow: true
})

export class Tooltip {
    @Prop() size?: string = '';
    @Prop() delay?: number | object = 0;
    @Prop() placement?: 'auto' | 'top' | 'bottom' | 'left' | 'right' = 'auto';
    @Prop() offset?: string | number= '';

    private getCssClassMap(): CssClassMap {
        return classNames(
            'tooltip',
            this.size && `tooltip--size-${this.size}`,
            this.delay && `tooltip--delay-${this.delay}`,
            this.placement && `tooltip--placement-${this.placement}`,
            this.offset && `tooltip--offset-${this.offset}`,
        );
    }

    render() {
        return (
            <span class={this.getCssClassMap()}>
                <slot/>
            </span>
        );
    }
}