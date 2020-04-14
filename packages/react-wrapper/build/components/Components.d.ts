import * as React from 'react';
import { StyleSheet } from 'jss';
interface AlertProps {
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
declare const Alert: React.FunctionComponent<AlertProps>;
interface ButtonProps {
    ariaLabel?: string;
    customClass?: string;
    disabled?: boolean;
    focusable?: boolean;
    href?: string;
    icon?: string;
    iconAfter?: string;
    iconBefore?: string;
    iconSize?: number;
    role?: string;
    size?: string;
    styles?: StyleSheet<string | number | symbol>;
    target?: string;
    variant?: string;
    [key: string]: any;
}
declare const Button: React.FunctionComponent<ButtonProps>;
interface CardProps {
    customClass?: string;
    disabled?: boolean;
    href?: string;
    interactive?: boolean;
    styles?: StyleSheet<string | number | symbol>;
    target?: string;
    [key: string]: any;
}
declare const Card: React.FunctionComponent<CardProps>;
interface CarouselProps {
    customClass?: string;
    styles?: StyleSheet<string | number | symbol>;
    vertical?: boolean;
    [key: string]: any;
}
declare const Carousel: React.FunctionComponent<CarouselProps>;
interface DividerProps {
    customClass?: string;
    size?: string;
    styles?: StyleSheet<string | number | symbol>;
    vertical?: boolean;
    [key: string]: any;
}
declare const Divider: React.FunctionComponent<DividerProps>;
interface IconProps {
    customClass?: string;
    focusable?: boolean;
    height?: number;
    name?: string;
    path: string;
    size?: number;
    styles?: StyleSheet<string | number | symbol>;
    viewBox?: string;
    width?: number;
    [key: string]: any;
}
declare const Icon: React.FunctionComponent<IconProps>;
interface InputProps {
    counter?: boolean;
    customClass?: string;
    disabled?: boolean;
    helperText?: string;
    label?: string;
    maxLength?: number;
    minLength?: number;
    name?: string;
    placeholder?: string;
    required?: boolean;
    size?: string;
    status?: string;
    styles?: StyleSheet<string | number | symbol>;
    type?: 'email' | 'hidden' | 'number' | 'password' | 'tel' | 'text' | 'url';
    value?: string;
    variant?: 'animated' | 'static';
    onBlur?: (event?: any) => void;
    onChange?: (event?: any) => void;
    onFocus?: (event?: any) => void;
    onKeyDown?: (event?: any) => void;
    [key: string]: any;
}
declare const Input: React.FunctionComponent<InputProps>;
interface LinkProps {
    block?: boolean;
    customClass?: string;
    disabled?: boolean;
    href: string;
    icon?: string;
    iconSize?: number;
    styles?: StyleSheet<string | number | symbol>;
    target?: string;
    underline?: boolean;
    variant?: string;
    [key: string]: any;
}
declare const Link: React.FunctionComponent<LinkProps>;
interface ModalProps {
    customClass?: string;
    opened?: boolean;
    size?: string;
    styles?: StyleSheet<string | number | symbol>;
    variant?: string;
    [key: string]: any;
}
declare const Modal: React.FunctionComponent<ModalProps>;
interface ProgressBarProps {
    customClass?: string;
    percentage: number;
    showText?: boolean;
    strokeWidth?: number;
    styles?: StyleSheet<string | number | symbol>;
    textInside?: boolean;
    variant?: string;
    [key: string]: any;
}
declare const ProgressBar: React.FunctionComponent<ProgressBarProps>;
interface SliderProps {
    customClass?: string;
    label: boolean;
    max?: number;
    min?: number;
    step: number;
    styles?: StyleSheet<string | number | symbol>;
    value: number;
    [key: string]: any;
}
declare const Slider: React.FunctionComponent<SliderProps>;
interface SwitchProps {
    active?: boolean;
    customClass?: string;
    disabled?: boolean;
    styles?: StyleSheet<string | number | symbol>;
    [key: string]: any;
}
declare const Switch: React.FunctionComponent<SwitchProps>;
interface TagProps {
    customClass?: string;
    disabled?: boolean;
    dismissable?: boolean;
    href?: string;
    size?: string;
    styles?: StyleSheet<string | number | symbol>;
    target?: string;
    variant?: string;
    onClose?: (event?: any) => void;
    [key: string]: any;
}
declare const Tag: React.FunctionComponent<TagProps>;
interface TextProps {
    customClass?: string;
    styles?: StyleSheet<string | number | symbol>;
    tag?: string;
    variant?: string;
    [key: string]: any;
}
declare const Text: React.FunctionComponent<TextProps>;
interface ToastProps {
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
declare const Toast: React.FunctionComponent<ToastProps>;
export { Alert, Button, Card, Carousel, Divider, Icon, Input, Link, Modal, ProgressBar, Slider, Switch, Tag, Text, Toast };
