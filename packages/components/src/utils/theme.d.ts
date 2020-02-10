interface Theme {
    unit: string;
    breakpoints: {
        [key: string]: (string | number);
    };
    colors: {
        [key: string]: string;
    };
}
export declare const defaultTheme: Theme;
export declare const theme: (overrides?: Partial<Theme>) => {
    unit: string;
    breakpoints: {
        [key: string]: string | number;
    };
    colors: {
        [key: string]: string;
    };
};
export {};
