import { Element } from '@stencil/core';
export declare class Card {
    hostElement: HTMLElement;
    size?: string;
    theme?: string;
    variant?: string;
    disabled?: boolean;
    deselected?: boolean;
    imageTop?: string;
    imageTopAlt?: string;
    private hasSlotHeader;
    private hasSlotFooter;
    private getCssClassMap;
    componentWillLoad(): void;
    render(): any;
}
