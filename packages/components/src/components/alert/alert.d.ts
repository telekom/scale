export declare class Alert {
    /** (required) Alert class */
    customClass?: string;
    /** (optional) Alert size */
    size?: string;
    /** (optional) Alert theme */
    theme?: string;
    /** (optional) Alert variant */
    variant?: string;
    /** (optional) Alert title */
    headline: string;
    /** (required) Alert opened */
    opened: boolean;
    /** (optional) Alert timeout */
    timeout?: boolean | number;
    /** (optional) Alert icon */
    icon?: string;
    /** (required) Alert close */
    close?: string;
    private getCssClassMap;
    private defaultTimeout;
    onCloseAlert: () => void;
    open(): Promise<void>;
    onCloseAlertWithTimeout: () => any;
    render(): any;
}
