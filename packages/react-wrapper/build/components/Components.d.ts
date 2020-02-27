/// <reference types="react" />
interface AlertInterface {
    customClass: string;
    headline: string;
    icon: string;
    opened: boolean;
    size: string;
    theme: string;
    timeout: boolean | number;
    variant: string;
}
declare const Alert: (props: AlertInterface) => JSX.Element;
interface BadgeInterface {
    customClass: string;
    link: string;
    pill: boolean;
    size: string;
    variant: string;
}
declare const Badge: (props: BadgeInterface) => JSX.Element;
interface ButtonInterface {
    customClass: string;
    deselected: boolean;
    disabled: boolean;
    size: string;
    theme: string;
    variant: string;
}
declare const Button: (props: ButtonInterface) => JSX.Element;
interface CardInterface {
    customClass: string;
    deselected: boolean;
    disabled: boolean;
    imageTop: string;
    imageTopAlt: string;
    size: string;
    theme: string;
    variant: string;
}
declare const Card: (props: CardInterface) => JSX.Element;
interface CarouselInterface {
    vertical: boolean;
}
declare const Carousel: (props: CarouselInterface) => JSX.Element;
interface DividerInterface {
    customClass: string;
    size: string;
    theme: string;
    vertical: boolean;
}
declare const Divider: (props: DividerInterface) => JSX.Element;
interface IconInterface {
    customClass: string;
    name: string;
    path: string;
    theme: string;
}
declare const Icon: (props: IconInterface) => JSX.Element;
interface InputInterface {
    customClass: string;
    errorMessage: string;
    name: string;
    theme: string;
    type: 'email' | 'hidden' | 'number' | 'password' | 'tel' | 'text' | 'url';
    value: string;
}
declare const Input: (props: InputInterface) => JSX.Element;
interface InputErrorInterface {
    customClass: string;
    theme: string;
}
declare const InputError: (props: InputErrorInterface) => JSX.Element;
interface InputGroupInterface {
    customClass: string;
    theme: string;
}
declare const InputGroup: (props: InputGroupInterface) => JSX.Element;
interface InputLabelInterface {
    customClass: string;
    theme: string;
}
declare const InputLabel: (props: InputLabelInterface) => JSX.Element;
interface LinkInterface {
    customClass: string;
    disabled: boolean;
    href: string;
    openNewTab: boolean;
    underline: boolean;
    variant: string;
}
declare const Link: (props: LinkInterface) => JSX.Element;
interface ModalInterface {
    customClass: string;
    opened: boolean;
    size: string;
    theme: string;
    variant: string;
}
declare const Modal: (props: ModalInterface) => JSX.Element;
interface ProgressBarInterface {
    customClass: string;
    percentage: number;
    showText: boolean;
    strokeWidth: number;
    textInside: boolean;
    variant: string;
}
declare const ProgressBar: (props: ProgressBarInterface) => JSX.Element;
interface SliderInterface {
    customClass: string;
    label: boolean;
    max: number;
    min: number;
    step: number;
    value: number;
}
declare const Slider: (props: SliderInterface) => JSX.Element;
interface SwitchInterface {
    active: boolean;
    customClass: string;
    disabled: boolean;
    theme: string;
}
declare const Switch: (props: SwitchInterface) => JSX.Element;
interface TagInterface {
    customClass: string;
    link: string;
    pill: boolean;
    theme: string;
    variant: string;
}
declare const Tag: (props: TagInterface) => JSX.Element;
interface TextInterface {
    customClass: string;
    theme: string;
}
declare const Text: (props: TextInterface) => JSX.Element;
interface ToastInterface {
    animated: boolean;
    autoHide: boolean | number;
    customClass: string;
    fadeDuration: number;
    opened: boolean;
    positionRight: number;
    positionTop: number;
    size: string;
    theme: string;
    time: number;
    variant: string;
}
declare const Toast: (props: ToastInterface) => JSX.Element;
export { Alert, Badge, Button, Card, Carousel, Divider, Icon, Input, InputError, InputGroup, InputLabel, Link, Modal, ProgressBar, Slider, Switch, Tag, Text, Toast };
