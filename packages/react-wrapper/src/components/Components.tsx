import * as React from 'react'
import WebComponentWrapper from './Wrapper'

interface AlertProps {
  customClass?: string
  headline: string
  icon?: string
  opened: boolean
  size?: string
  theme?: string
  timeout?: boolean | number
  variant?: string
}

const Alert: React.FunctionComponent<AlertProps> = props => (
  <WebComponentWrapper events={{}} component='t-alert' {...props} />
)
interface BadgeProps {
  customClass?: string
  link?: string
  pill?: boolean
  size?: string
  variant?: string
}

const Badge: React.FunctionComponent<BadgeProps> = props => (
  <WebComponentWrapper events={{}} component='t-badge' {...props} />
)
interface ButtonProps {
  customClass?: string
  deselected?: boolean
  disabled?: boolean
  size?: string
  theme?: string
  variant?: string
}

const Button: React.FunctionComponent<ButtonProps> = props => (
  <WebComponentWrapper events={{}} component='t-button' {...props} />
)
interface CardProps {
  customClass?: string
  deselected?: boolean
  disabled?: boolean
  imageTop?: string
  imageTopAlt?: string
  size?: string
  theme?: string
  variant?: string
}

const Card: React.FunctionComponent<CardProps> = props => (
  <WebComponentWrapper events={{}} component='t-card' {...props} />
)
interface CarouselProps {
  vertical?: boolean
}

const Carousel: React.FunctionComponent<CarouselProps> = props => (
  <WebComponentWrapper events={{}} component='t-carousel' {...props} />
)
interface DividerProps {
  customClass?: string
  size?: string
  theme?: string
  vertical?: boolean
}

const Divider: React.FunctionComponent<DividerProps> = props => (
  <WebComponentWrapper events={{}} component='t-divider' {...props} />
)
interface IconProps {
  customClass?: string
  name: string
  path: string
  theme?: string
}

const Icon: React.FunctionComponent<IconProps> = props => (
  <WebComponentWrapper events={{}} component='t-icon' {...props} />
)
interface InputProps {
  customClass?: string
  errorMessage?: string
  name?: string
  theme?: string
  type?: 'email' | 'hidden' | 'number' | 'password' | 'tel' | 'text' | 'url'
  value: string
}

const Input: React.FunctionComponent<InputProps> = props => (
  <WebComponentWrapper
    events={{ onChanged: 'changed' }}
    component='t-input'
    {...props}
  />
)
interface InputErrorProps {
  customClass?: string
  theme?: string
}

const InputError: React.FunctionComponent<InputErrorProps> = props => (
  <WebComponentWrapper events={{}} component='t-input-error' {...props} />
)
interface InputGroupProps {
  customClass?: string
  theme?: string
}

const InputGroup: React.FunctionComponent<InputGroupProps> = props => (
  <WebComponentWrapper events={{}} component='t-input-group' {...props} />
)
interface InputLabelProps {
  customClass?: string
  theme?: string
}

const InputLabel: React.FunctionComponent<InputLabelProps> = props => (
  <WebComponentWrapper events={{}} component='t-input-label' {...props} />
)
interface LinkProps {
  customClass?: string
  disabled?: boolean
  href?: string
  openNewTab?: boolean
  underline?: boolean
  variant?: string
}

const Link: React.FunctionComponent<LinkProps> = props => (
  <WebComponentWrapper events={{}} component='t-link' {...props} />
)
interface ModalProps {
  customClass?: string
  opened?: boolean
  size?: string
  theme?: string
  variant?: string
}

const Modal: React.FunctionComponent<ModalProps> = props => (
  <WebComponentWrapper events={{}} component='t-modal' {...props} />
)
interface ProgressBarProps {
  customClass?: string
  percentage: number
  showText?: boolean
  strokeWidth?: number
  textInside?: boolean
  variant?: string
}

const ProgressBar: React.FunctionComponent<ProgressBarProps> = props => (
  <WebComponentWrapper events={{}} component='t-progress-bar' {...props} />
)
interface SliderProps {
  customClass?: string
  label: boolean
  max?: number
  min?: number
  step: number
  value: number
}

const Slider: React.FunctionComponent<SliderProps> = props => (
  <WebComponentWrapper events={{}} component='t-slider' {...props} />
)
interface SwitchProps {
  active?: boolean
  customClass?: string
  disabled?: boolean
  theme?: string
}

const Switch: React.FunctionComponent<SwitchProps> = props => (
  <WebComponentWrapper events={{}} component='t-switch' {...props} />
)
interface TagProps {
  customClass?: string
  link?: string
  pill?: boolean
  theme?: string
  variant?: string
}

const Tag: React.FunctionComponent<TagProps> = props => (
  <WebComponentWrapper events={{}} component='t-tag' {...props} />
)
interface TextProps {
  customClass?: string
  theme?: string
}

const Text: React.FunctionComponent<TextProps> = props => (
  <WebComponentWrapper events={{}} component='t-text' {...props} />
)
interface ToastProps {
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
}

const Toast: React.FunctionComponent<ToastProps> = props => (
  <WebComponentWrapper events={{}} component='t-toast' {...props} />
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
