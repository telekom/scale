import * as React from 'react'
import WebComponentWrapper from './Wrapper'

interface AlertProps {
  // Web-component props
  customClass?: string
  headline: string
  icon?: string
  opened: boolean
  size?: string
  styles?: Record<string, any>
  timeout?: boolean | number
  variant?: string
  // Allow custom props not yet specified in the types e.g. events onClick etc.
  // TODO: Find a possibility to only allow relevant types e.g. Button = onClick, onFocus etc.
  [key: string]: any
}
const Alert: React.FunctionComponent<AlertProps> = props => (
  <WebComponentWrapper component='scale-alert' {...props} />
)
interface ButtonProps {
  // Web-component props
  ariaLabel?: string
  customClass?: string
  disabled?: boolean
  focusable?: boolean
  href?: string
  icon?: string
  iconAfter?: string
  iconBefore?: string
  iconSize?: number
  role?: string
  size?: string
  styles?: Record<string, any>
  target?: string
  variant?: string
  // Allow custom props not yet specified in the types e.g. events onClick etc.
  // TODO: Find a possibility to only allow relevant types e.g. Button = onClick, onFocus etc.
  [key: string]: any
}
const Button: React.FunctionComponent<ButtonProps> = props => (
  <WebComponentWrapper component='scale-button' {...props} />
)
interface CardProps {
  // Web-component props
  customClass?: string
  disabled?: boolean
  href?: string
  interactive?: boolean
  styles?: Record<string, any>
  target?: string
  // Allow custom props not yet specified in the types e.g. events onClick etc.
  // TODO: Find a possibility to only allow relevant types e.g. Button = onClick, onFocus etc.
  [key: string]: any
}
const Card: React.FunctionComponent<CardProps> = props => (
  <WebComponentWrapper component='scale-card' {...props} />
)
interface CarouselProps {
  // Web-component props
  customClass?: string
  styles?: Record<string, any>
  vertical?: boolean
  // Allow custom props not yet specified in the types e.g. events onClick etc.
  // TODO: Find a possibility to only allow relevant types e.g. Button = onClick, onFocus etc.
  [key: string]: any
}
const Carousel: React.FunctionComponent<CarouselProps> = props => (
  <WebComponentWrapper component='scale-carousel' {...props} />
)
interface DividerProps {
  // Web-component props
  customClass?: string
  size?: string
  styles?: Record<string, any>
  vertical?: boolean
  // Allow custom props not yet specified in the types e.g. events onClick etc.
  // TODO: Find a possibility to only allow relevant types e.g. Button = onClick, onFocus etc.
  [key: string]: any
}
const Divider: React.FunctionComponent<DividerProps> = props => (
  <WebComponentWrapper component='scale-divider' {...props} />
)
interface IconProps {
  // Web-component props
  customClass?: string
  focusable?: boolean
  height?: number
  name?: string
  path: string
  size?: number
  styles?: Record<string, any>
  viewBox?: string
  width?: number
  // Allow custom props not yet specified in the types e.g. events onClick etc.
  // TODO: Find a possibility to only allow relevant types e.g. Button = onClick, onFocus etc.
  [key: string]: any
}
const Icon: React.FunctionComponent<IconProps> = props => (
  <WebComponentWrapper component='scale-icon' {...props} />
)
interface InputProps {
  // Web-component props
  counter?: boolean
  customClass?: string
  disabled?: boolean
  helperText?: string
  label?: string
  maxLength?: number
  minLength?: number
  name?: string
  placeholder?: string
  required?: boolean
  size?: string
  status?: string
  styles?: Record<string, any>
  type?: 'email' | 'hidden' | 'number' | 'password' | 'tel' | 'text' | 'url'
  value?: string
  variant?: 'animated' | 'static'
  // Web-component custom events
  // TODO: Provide events types
  onBlur?: (event?: any) => void
  onChange?: (event?: any) => void
  onFocus?: (event?: any) => void
  onKeyDown?: (event?: any) => void
  // Allow custom props not yet specified in the types e.g. events onClick etc.
  // TODO: Find a possibility to only allow relevant types e.g. Button = onClick, onFocus etc.
  [key: string]: any
}
const Input: React.FunctionComponent<InputProps> = props => (
  <WebComponentWrapper
    events={{
      onBlur: 'blurEvent',
      onChange: 'changeEvent',
      onFocus: 'focusEvent',
      onKeyDown: 'keyDownEvent'
    }}
    component='scale-input'
    {...props}
  />
)
interface LinkProps {
  // Web-component props
  block?: boolean
  customClass?: string
  disabled?: boolean
  href: string
  icon?: string
  iconSize?: number
  styles?: Record<string, any>
  target?: string
  underline?: boolean
  variant?: string
  // Allow custom props not yet specified in the types e.g. events onClick etc.
  // TODO: Find a possibility to only allow relevant types e.g. Button = onClick, onFocus etc.
  [key: string]: any
}
const Link: React.FunctionComponent<LinkProps> = props => (
  <WebComponentWrapper component='scale-link' {...props} />
)
interface ModalProps {
  // Web-component props
  customClass?: string
  opened?: boolean
  size?: string
  styles?: Record<string, any>
  variant?: string
  // Allow custom props not yet specified in the types e.g. events onClick etc.
  // TODO: Find a possibility to only allow relevant types e.g. Button = onClick, onFocus etc.
  [key: string]: any
}
const Modal: React.FunctionComponent<ModalProps> = props => (
  <WebComponentWrapper component='scale-modal' {...props} />
)
interface ProgressBarProps {
  // Web-component props
  customClass?: string
  percentage: number
  showText?: boolean
  strokeWidth?: number
  styles?: Record<string, any>
  textInside?: boolean
  variant?: string
  // Allow custom props not yet specified in the types e.g. events onClick etc.
  // TODO: Find a possibility to only allow relevant types e.g. Button = onClick, onFocus etc.
  [key: string]: any
}
const ProgressBar: React.FunctionComponent<ProgressBarProps> = props => (
  <WebComponentWrapper component='scale-progress-bar' {...props} />
)
interface SliderProps {
  // Web-component props
  customClass?: string
  label: boolean
  max?: number
  min?: number
  step: number
  styles?: Record<string, any>
  value: number
  // Allow custom props not yet specified in the types e.g. events onClick etc.
  // TODO: Find a possibility to only allow relevant types e.g. Button = onClick, onFocus etc.
  [key: string]: any
}
const Slider: React.FunctionComponent<SliderProps> = props => (
  <WebComponentWrapper component='scale-slider' {...props} />
)
interface SwitchProps {
  // Web-component props
  active?: boolean
  customClass?: string
  disabled?: boolean
  styles?: Record<string, any>
  // Allow custom props not yet specified in the types e.g. events onClick etc.
  // TODO: Find a possibility to only allow relevant types e.g. Button = onClick, onFocus etc.
  [key: string]: any
}
const Switch: React.FunctionComponent<SwitchProps> = props => (
  <WebComponentWrapper component='scale-switch' {...props} />
)
interface TagProps {
  // Web-component props
  customClass?: string
  disabled?: boolean
  dismissable?: boolean
  href?: string
  size?: string
  styles?: Record<string, any>
  target?: string
  variant?: string
  // Web-component custom events
  // TODO: Provide events types
  onClose?: (event?: any) => void
  // Allow custom props not yet specified in the types e.g. events onClick etc.
  // TODO: Find a possibility to only allow relevant types e.g. Button = onClick, onFocus etc.
  [key: string]: any
}
const Tag: React.FunctionComponent<TagProps> = props => (
  <WebComponentWrapper
    events={{ onClose: 'close' }}
    component='scale-tag'
    {...props}
  />
)
interface TextProps {
  // Web-component props
  customClass?: string
  styles?: Record<string, any>
  tag?: string
  variant?: string
  // Allow custom props not yet specified in the types e.g. events onClick etc.
  // TODO: Find a possibility to only allow relevant types e.g. Button = onClick, onFocus etc.
  [key: string]: any
}
const Text: React.FunctionComponent<TextProps> = props => (
  <WebComponentWrapper component='scale-text' {...props} />
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
  styles?: Record<string, any>
  time?: number
  variant?: string
  // Allow custom props not yet specified in the types e.g. events onClick etc.
  // TODO: Find a possibility to only allow relevant types e.g. Button = onClick, onFocus etc.
  [key: string]: any
}
const Toast: React.FunctionComponent<ToastProps> = props => (
  <WebComponentWrapper component='scale-toast' {...props} />
)

export {
  Alert,
  Button,
  Card,
  Carousel,
  Divider,
  Icon,
  Input,
  Link,
  Modal,
  ProgressBar,
  Slider,
  Switch,
  Tag,
  Text,
  Toast
}
