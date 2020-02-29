import * as React from 'react'
import WebComponentWrapper from './Wrapper'

interface AlertProps {
  // Web-component props
  customClass?: string
  headline: string
  icon?: string
  opened: boolean
  size?: string
  theme?: string
  timeout?: boolean | number
  variant?: string
  // Allow css-in-js-styles
  styles?: object
  // Allow custom props not yet specified in the types e.g. events onClick etc.
  // TODO: Find a possibility to only allow relevant types e.g. Button = onClick, onFocus etc.
  [key: string]: any
}

const Alert: React.FunctionComponent<AlertProps> = props => (
  <WebComponentWrapper component='t-alert' {...props} />
)
interface BadgeProps {
  // Web-component props
  customClass?: string
  link?: string
  pill?: boolean
  size?: string
  variant?: string
  // Allow css-in-js-styles
  styles?: object
  // Allow custom props not yet specified in the types e.g. events onClick etc.
  // TODO: Find a possibility to only allow relevant types e.g. Button = onClick, onFocus etc.
  [key: string]: any
}

const Badge: React.FunctionComponent<BadgeProps> = props => (
  <WebComponentWrapper component='t-badge' {...props} />
)
interface ButtonProps {
  // Web-component props
  customClass?: string
  deselected?: boolean
  disabled?: boolean
  size?: string
  theme?: string
  variant?: string
  // Allow css-in-js-styles
  styles?: object
  // Allow custom props not yet specified in the types e.g. events onClick etc.
  // TODO: Find a possibility to only allow relevant types e.g. Button = onClick, onFocus etc.
  [key: string]: any
}

const Button: React.FunctionComponent<ButtonProps> = props => (
  <WebComponentWrapper component='t-button' {...props} />
)
interface CardProps {
  // Web-component props
  customClass?: string
  deselected?: boolean
  disabled?: boolean
  imageTop?: string
  imageTopAlt?: string
  size?: string
  theme?: string
  variant?: string
  // Allow css-in-js-styles
  styles?: object
  // Allow custom props not yet specified in the types e.g. events onClick etc.
  // TODO: Find a possibility to only allow relevant types e.g. Button = onClick, onFocus etc.
  [key: string]: any
}

const Card: React.FunctionComponent<CardProps> = props => (
  <WebComponentWrapper component='t-card' {...props} />
)
interface CarouselProps {
  // Web-component props
  vertical?: boolean
  // Allow css-in-js-styles
  styles?: object
  // Allow custom props not yet specified in the types e.g. events onClick etc.
  // TODO: Find a possibility to only allow relevant types e.g. Button = onClick, onFocus etc.
  [key: string]: any
}

const Carousel: React.FunctionComponent<CarouselProps> = props => (
  <WebComponentWrapper component='t-carousel' {...props} />
)
interface DividerProps {
  // Web-component props
  customClass?: string
  size?: string
  theme?: string
  vertical?: boolean
  // Allow css-in-js-styles
  styles?: object
  // Allow custom props not yet specified in the types e.g. events onClick etc.
  // TODO: Find a possibility to only allow relevant types e.g. Button = onClick, onFocus etc.
  [key: string]: any
}

const Divider: React.FunctionComponent<DividerProps> = props => (
  <WebComponentWrapper component='t-divider' {...props} />
)
interface IconProps {
  // Web-component props
  customClass?: string
  name: string
  path: string
  theme?: string
  // Allow css-in-js-styles
  styles?: object
  // Allow custom props not yet specified in the types e.g. events onClick etc.
  // TODO: Find a possibility to only allow relevant types e.g. Button = onClick, onFocus etc.
  [key: string]: any
}

const Icon: React.FunctionComponent<IconProps> = props => (
  <WebComponentWrapper component='t-icon' {...props} />
)
interface InputProps {
  // Web-component props
  customClass?: string
  errorMessage?: string
  name?: string
  theme?: string
  type?: 'email' | 'hidden' | 'number' | 'password' | 'tel' | 'text' | 'url'
  value?: string
  // Allow css-in-js-styles
  styles?: object
  // Allow custom props not yet specified in the types e.g. events onClick etc.
  // TODO: Find a possibility to only allow relevant types e.g. Button = onClick, onFocus etc.
  [key: string]: any
  // Web-component custom events
  // TODO: Provide events types
  onChanged?: (event?: any) => void
}

const Input: React.FunctionComponent<InputProps> = props => (
  <WebComponentWrapper
    events={{ onChanged: 'changed' }}
    component='t-input'
    {...props}
  />
)
interface InputErrorProps {
  // Web-component props
  customClass?: string
  theme?: string
  // Allow css-in-js-styles
  styles?: object
  // Allow custom props not yet specified in the types e.g. events onClick etc.
  // TODO: Find a possibility to only allow relevant types e.g. Button = onClick, onFocus etc.
  [key: string]: any
}

const InputError: React.FunctionComponent<InputErrorProps> = props => (
  <WebComponentWrapper component='t-input-error' {...props} />
)
interface InputGroupProps {
  // Web-component props
  customClass?: string
  theme?: string
  // Allow css-in-js-styles
  styles?: object
  // Allow custom props not yet specified in the types e.g. events onClick etc.
  // TODO: Find a possibility to only allow relevant types e.g. Button = onClick, onFocus etc.
  [key: string]: any
}

const InputGroup: React.FunctionComponent<InputGroupProps> = props => (
  <WebComponentWrapper component='t-input-group' {...props} />
)
interface InputLabelProps {
  // Web-component props
  customClass?: string
  theme?: string
  // Allow css-in-js-styles
  styles?: object
  // Allow custom props not yet specified in the types e.g. events onClick etc.
  // TODO: Find a possibility to only allow relevant types e.g. Button = onClick, onFocus etc.
  [key: string]: any
}

const InputLabel: React.FunctionComponent<InputLabelProps> = props => (
  <WebComponentWrapper component='t-input-label' {...props} />
)
interface LinkProps {
  // Web-component props
  customClass?: string
  disabled?: boolean
  href?: string
  openNewTab?: boolean
  underline?: boolean
  variant?: string
  // Allow css-in-js-styles
  styles?: object
  // Allow custom props not yet specified in the types e.g. events onClick etc.
  // TODO: Find a possibility to only allow relevant types e.g. Button = onClick, onFocus etc.
  [key: string]: any
}

const Link: React.FunctionComponent<LinkProps> = props => (
  <WebComponentWrapper component='t-link' {...props} />
)
interface ModalProps {
  // Web-component props
  customClass?: string
  opened?: boolean
  size?: string
  theme?: string
  variant?: string
  // Allow css-in-js-styles
  styles?: object
  // Allow custom props not yet specified in the types e.g. events onClick etc.
  // TODO: Find a possibility to only allow relevant types e.g. Button = onClick, onFocus etc.
  [key: string]: any
}

const Modal: React.FunctionComponent<ModalProps> = props => (
  <WebComponentWrapper component='t-modal' {...props} />
)
interface ProgressBarProps {
  // Web-component props
  customClass?: string
  percentage: number
  showText?: boolean
  strokeWidth?: number
  textInside?: boolean
  variant?: string
  // Allow css-in-js-styles
  styles?: object
  // Allow custom props not yet specified in the types e.g. events onClick etc.
  // TODO: Find a possibility to only allow relevant types e.g. Button = onClick, onFocus etc.
  [key: string]: any
}

const ProgressBar: React.FunctionComponent<ProgressBarProps> = props => (
  <WebComponentWrapper component='t-progress-bar' {...props} />
)
interface SliderProps {
  // Web-component props
  customClass?: string
  label: boolean
  max?: number
  min?: number
  step: number
  value: number
  // Allow css-in-js-styles
  styles?: object
  // Allow custom props not yet specified in the types e.g. events onClick etc.
  // TODO: Find a possibility to only allow relevant types e.g. Button = onClick, onFocus etc.
  [key: string]: any
}

const Slider: React.FunctionComponent<SliderProps> = props => (
  <WebComponentWrapper component='t-slider' {...props} />
)
interface SwitchProps {
  // Web-component props
  active?: boolean
  customClass?: string
  disabled?: boolean
  theme?: string
  // Allow css-in-js-styles
  styles?: object
  // Allow custom props not yet specified in the types e.g. events onClick etc.
  // TODO: Find a possibility to only allow relevant types e.g. Button = onClick, onFocus etc.
  [key: string]: any
}

const Switch: React.FunctionComponent<SwitchProps> = props => (
  <WebComponentWrapper component='t-switch' {...props} />
)
interface TagProps {
  // Web-component props
  customClass?: string
  link?: string
  pill?: boolean
  theme?: string
  variant?: string
  // Allow css-in-js-styles
  styles?: object
  // Allow custom props not yet specified in the types e.g. events onClick etc.
  // TODO: Find a possibility to only allow relevant types e.g. Button = onClick, onFocus etc.
  [key: string]: any
}

const Tag: React.FunctionComponent<TagProps> = props => (
  <WebComponentWrapper component='t-tag' {...props} />
)
interface TextProps {
  // Web-component props
  customClass?: string
  theme?: string
  // Allow css-in-js-styles
  styles?: object
  // Allow custom props not yet specified in the types e.g. events onClick etc.
  // TODO: Find a possibility to only allow relevant types e.g. Button = onClick, onFocus etc.
  [key: string]: any
}

const Text: React.FunctionComponent<TextProps> = props => (
  <WebComponentWrapper component='t-text' {...props} />
)
interface ToastProps {
  // Web-component props
  animated?: boolean
  autoHide?: boolean | number
  customClass?: string
  fadeDuration?: number
  opened?: boolean
  positionRight?: number
  positionTop?: number
  size?: string
  theme?: string
  time?: number
  variant?: string
  // Allow css-in-js-styles
  styles?: object
  // Allow custom props not yet specified in the types e.g. events onClick etc.
  // TODO: Find a possibility to only allow relevant types e.g. Button = onClick, onFocus etc.
  [key: string]: any
}

const Toast: React.FunctionComponent<ToastProps> = props => (
  <WebComponentWrapper component='t-toast' {...props} />
)

export {
  Alert,
  Badge,
  Button,
  Card,
  Carousel,
  Divider,
  Icon,
  Input,
  InputError,
  InputGroup,
  InputLabel,
  Link,
  Modal,
  ProgressBar,
  Slider,
  Switch,
  Tag,
  Text,
  Toast
}
