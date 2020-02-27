import * as React from 'react';
interface AlertProps extends React.FC {
    customClass?: string;
    headline: string;
    icon?: string;
    opened: boolean;
    size?: string;
    theme?: string;
    timeout?: boolean | number;
    variant?: string;
}
declare const Alert: (props: AlertProps) => JSX.Element;
interface BadgeProps extends React.FC {
    customClass?: string;
    link?: string;
    pill?: boolean;
    size?: string;
    variant?: string;
}
declare const Badge: (props: BadgeProps) => JSX.Element;
interface ButtonProps extends React.FC {
    customClass?: string;
    deselected?: boolean;
    disabled?: boolean;
    size?: string;
    theme?: string;
    variant?: string;
}
declare const Button: (props: ButtonProps) => JSX.Element;
interface CardProps extends React.FC {
    customClass?: string;
    deselected?: boolean;
    disabled?: boolean;
    imageTop?: string;
    imageTopAlt?: string;
    size?: string;
    theme?: string;
    variant?: string;
}
declare const Card: (props: CardProps) => JSX.Element;
interface CarouselProps extends React.FC {
    vertical?: boolean;
}
declare const Carousel: (props: CarouselProps) => JSX.Element;
interface DividerProps extends React.FC {
    customClass?: string;
    size?: string;
    theme?: string;
    vertical?: boolean;
}
declare const Divider: (props: DividerProps) => JSX.Element;
interface IconProps extends React.FC {
    customClass?: string;
    name: string;
    path: string;
    theme?: string;
}
declare const Icon: (props: IconProps) => JSX.Element;
interface InputProps extends React.FC {
    customClass?: string;
    errorMessage?: string;
    name?: string;
    theme?: string;
    type?: 'email' | 'hidden' | 'number' | 'password' | 'tel' | 'text' | 'url';
    value: string;
}
declare const Input: (props: InputProps) => JSX.Element;
interface InputErrorProps extends React.FC {
    customClass?: string;
    theme?: string;
}
declare const InputError: (props: InputErrorProps) => JSX.Element;
interface InputGroupProps extends React.FC {
    customClass?: string;
    theme?: string;
}
declare const InputGroup: (props: InputGroupProps) => JSX.Element;
interface InputLabelProps extends React.FC {
    customClass?: string;
    theme?: string;
}
declare const InputLabel: (props: InputLabelProps) => JSX.Element;
interface LinkProps extends React.FC {
    customClass?: string;
    disabled?: boolean;
    href?: string;
    openNewTab?: boolean;
    underline?: boolean;
    variant?: string;
}
declare const Link: (props: LinkProps) => JSX.Element;
interface ModalProps extends React.FC {
    customClass?: string;
    opened?: boolean;
    size?: string;
    theme?: string;
    variant?: string;
}
declare const Modal: (props: ModalProps) => JSX.Element;
interface ProgressBarProps extends React.FC {
    customClass?: string;
    percentage: number;
    showText?: boolean;
    strokeWidth?: number;
    textInside?: boolean;
    variant?: string;
}
declare const ProgressBar: (props: ProgressBarProps) => JSX.Element;
interface SliderProps extends React.FC {
    customClass?: string;
    label: boolean;
    max?: number;
    min?: number;
    step: number;
    value: number;
}
declare const Slider: (props: SliderProps) => JSX.Element;
interface SwitchProps extends React.FC {
    active?: boolean;
    customClass?: string;
    disabled?: boolean;
    theme?: string;
}
declare const Switch: (props: SwitchProps) => JSX.Element;
interface TagProps extends React.FC {
    customClass?: string;
    link?: string;
    pill?: boolean;
    theme?: string;
    variant?: string;
}
declare const Tag: (props: TagProps) => JSX.Element;
interface TextProps extends React.FC {
    customClass?: string;
    theme?: string;
}
declare const Text: (props: TextProps) => JSX.Element;
interface ToastProps extends React.FC {
    animated?: boolean;
    autoHide?: boolean | number;
    customClass?: string;
    fadeDuration?: number;
    opened?: boolean;
    positionRight?: number;
    positionTop?: number;
    size?: string;
    theme?: string;
    time?: number;
    variant?: string;
}
declare const Toast: (props: ToastProps) => JSX.Element;
export { Alert, Badge, Button, Card, Carousel, Divider, Icon, Input, InputError, InputGroup, InputLabel, Link, Modal, ProgressBar, Slider, Switch, Tag, Text, Toast };
