import * as React from 'react';
import { StyleSheet } from 'jss';
interface ScaleAlertProps {
    customClass?: string;
    headline: string;
    icon?: string;
    opened: boolean;
    size?: string;
    styles?: StyleSheet<string | number | symbol>;
    timeout?: boolean | number;
    variant?: string;
    [key: string]: any;
}
declare const ScaleAlert: React.FunctionComponent<ScaleAlertProps>;
interface ScaleBadgeProps {
    customClass?: string;
    link?: string;
    pill?: boolean;
    size?: string;
    styles?: StyleSheet<string | number | symbol>;
    variant?: string;
    [key: string]: any;
}
declare const ScaleBadge: React.FunctionComponent<ScaleBadgeProps>;
interface ScaleButtonProps {
    customClass?: string;
    disabled?: boolean;
    href?: string;
    size?: string;
    styles?: StyleSheet<string | number | symbol>;
    target?: string;
    variant?: string;
    [key: string]: any;
}
declare const ScaleButton: React.FunctionComponent<ScaleButtonProps>;
interface ScaleCardProps {
    customClass?: string;
    imageTop?: string;
    imageTopAlt?: string;
    size?: string;
    styles?: StyleSheet<string | number | symbol>;
    variant?: string;
    [key: string]: any;
}
declare const ScaleCard: React.FunctionComponent<ScaleCardProps>;
interface ScaleCarouselProps {
    customClass?: string;
    styles?: StyleSheet<string | number | symbol>;
    vertical?: boolean;
    [key: string]: any;
}
declare const ScaleCarousel: React.FunctionComponent<ScaleCarouselProps>;
interface ScaleDividerProps {
    customClass?: string;
    size?: string;
    styles?: StyleSheet<string | number | symbol>;
    vertical?: boolean;
    [key: string]: any;
}
declare const ScaleDivider: React.FunctionComponent<ScaleDividerProps>;
interface ScaleIconProps {
    customClass?: string;
    name: string;
    path: string;
    styles?: StyleSheet<string | number | symbol>;
    [key: string]: any;
}
declare const ScaleIcon: React.FunctionComponent<ScaleIconProps>;
interface ScaleInputProps {
    customClass?: string;
    errorMessage?: string;
    name?: string;
    styles?: StyleSheet<string | number | symbol>;
    type?: 'email' | 'hidden' | 'number' | 'password' | 'tel' | 'text' | 'url';
    value?: string;
    onChanged?: (event?: any) => void;
    [key: string]: any;
}
declare const ScaleInput: React.FunctionComponent<ScaleInputProps>;
interface ScaleInpuerrorProps {
    customClass?: string;
    styles?: StyleSheet<string | number | symbol>;
    [key: string]: any;
}
declare const ScaleInpuerror: React.FunctionComponent<ScaleInpuerrorProps>;
interface ScaleInpugroupProps {
    customClass?: string;
    styles?: StyleSheet<string | number | symbol>;
    [key: string]: any;
}
declare const ScaleInpugroup: React.FunctionComponent<ScaleInpugroupProps>;
interface ScaleInpulabelProps {
    customClass?: string;
    styles?: StyleSheet<string | number | symbol>;
    [key: string]: any;
}
declare const ScaleInpulabel: React.FunctionComponent<ScaleInpulabelProps>;
interface ScaleLinkProps {
    customClass?: string;
    disabled?: boolean;
    href?: string;
    openNewTab?: boolean;
    styles?: StyleSheet<string | number | symbol>;
    underline?: boolean;
    variant?: string;
    [key: string]: any;
}
declare const ScaleLink: React.FunctionComponent<ScaleLinkProps>;
interface ScaleModalProps {
    customClass?: string;
    opened?: boolean;
    size?: string;
    styles?: StyleSheet<string | number | symbol>;
    variant?: string;
    [key: string]: any;
}
declare const ScaleModal: React.FunctionComponent<ScaleModalProps>;
interface ScaleProgressBarProps {
    customClass?: string;
    percentage: number;
    showText?: boolean;
    strokeWidth?: number;
    styles?: StyleSheet<string | number | symbol>;
    textInside?: boolean;
    variant?: string;
    [key: string]: any;
}
declare const ScaleProgressBar: React.FunctionComponent<ScaleProgressBarProps>;
interface ScaleSliderProps {
    customClass?: string;
    label: boolean;
    max?: number;
    min?: number;
    step: number;
    styles?: StyleSheet<string | number | symbol>;
    value: number;
    [key: string]: any;
}
declare const ScaleSlider: React.FunctionComponent<ScaleSliderProps>;
interface ScaleSwitchProps {
    active?: boolean;
    customClass?: string;
    disabled?: boolean;
    styles?: StyleSheet<string | number | symbol>;
    [key: string]: any;
}
declare const ScaleSwitch: React.FunctionComponent<ScaleSwitchProps>;
interface ScaleTagProps {
    customClass?: string;
    link?: string;
    pill?: boolean;
    styles?: StyleSheet<string | number | symbol>;
    variant?: string;
    [key: string]: any;
}
declare const ScaleTag: React.FunctionComponent<ScaleTagProps>;
interface ScaleTextProps {
    customClass?: string;
    styles?: StyleSheet<string | number | symbol>;
    [key: string]: any;
}
declare const ScaleText: React.FunctionComponent<ScaleTextProps>;
interface ScaleToastProps {
    animated?: boolean;
    autoHide?: boolean | number;
    customClass?: string;
    fadeDuration?: number;
    opened?: boolean;
    positionRight?: number;
    positionTop?: number;
    size?: string;
    styles?: StyleSheet<string | number | symbol>;
    time?: number;
    variant?: string;
    [key: string]: any;
}
declare const ScaleToast: React.FunctionComponent<ScaleToastProps>;
export { ScaleAlert, ScaleBadge, ScaleButton, ScaleCard, ScaleCarousel, ScaleDivider, ScaleIcon, ScaleInput, ScaleInpuerror, ScaleInpugroup, ScaleInpulabel, ScaleLink, ScaleModal, ScaleProgressBar, ScaleSlider, ScaleSwitch, ScaleTag, ScaleText, ScaleToast };
