import { HTMLStencilElement } from '../../../dist/types/stencil.core';
export declare class Card {
    hostElement: HTMLStencilElement;
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
