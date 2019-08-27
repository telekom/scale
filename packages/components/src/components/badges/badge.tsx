import { Component, Prop, h } from '@stencil/core';
import { CssClassMap } from '../../utils/utils';
import classNames from 'classnames';

@Component({
    tag: 't-badge',
    styleUrl:
        'badge.css',
    shadow: true
})

export class Badge {
    @Prop() size?: string = '';
    @Prop() variant?: string = '';
    @Prop() pill?: string = '';


    private getCssClassMap(): CssClassMap {
        return classNames(
            'badge',
            this.size && `badge--size-${this.size}`,
            this.variant && `badge--variant-${this.variant}`,
            this.pill && `badge--pill-${this.pill}`,
        );
    }

    render() {
        return (
            <div class={this.getCssClassMap()}>
                <div class="container">
                    <span class="badge badge-pill badge--primary">Primary</span>
                    <span class="badge badge-pill badge--secondary">Secondary</span>
                    <span class="badge badge-pill badge--success">Success</span>
                    <span class="badge badge-pill badge--danger">Danger</span>
                    <span class="badge badge-pill badge--warning">Warning</span>
                    <span class="badge badge-pill badge--info">Info</span>
                    <span class="badge badge-pill badge--light">Light</span>
                    <span class="badge badge-pill badge--dark">Dark</span>
                </div>
            </div>
        );
    }
}
