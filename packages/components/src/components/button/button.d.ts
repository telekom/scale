export declare class Button {
    /** (optional) Button size */
    size?: string;
    /** (optional) Button theme */
    theme?: string;
    /** (optional) Button variant */
    variant?: string;
    /** (optional) Disabled button */
    disabled?: boolean;
    /** (optional) Deselected button */
    deselected?: boolean;
    private getCssClassMap;
    disable(): Promise<void>;
    enable(): Promise<void>;
    render(): any;
}
