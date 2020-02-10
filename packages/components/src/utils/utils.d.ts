export { defaultTheme, theme } from './theme';
export declare type CssClassMap = string | {
    [className: string]: boolean;
};
export declare const css: (styles: TemplateStringsArray, ..._vars: (string | number)[]) => string;
