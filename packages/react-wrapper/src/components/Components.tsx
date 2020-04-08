import * as React from 'react'
import { StyleSheet } from 'jss'
import WebComponentWrapper from './Wrapper'

interface AlertProps {
  // Web-component props
  customClass?: string
  headline: string
  icon?: string
  opened: boolean
  size?: string
  styles?: StyleSheet<string | number | symbol>
  timeout?: boolean | number
  variant?: string
  // Allow custom props not yet specified in the types e.g. events onClick etc.
  // TODO: Find a possibility to only allow relevant types e.g. Button = onClick, onFocus etc.
  [key: string]: any
}
const Alert: React.FunctionComponent<AlertProps> = props => (
  <WebComponentWrapper component='scale-alert' {...props} />
)
interface BadgeProps {
  // Web-component props
  customClass?: string
  link?: string
  pill?: boolean
  size?: string
  styles?: StyleSheet<string | number | symbol>
  variant?: string
  // Allow custom props not yet specified in the types e.g. events onClick etc.
  // TODO: Find a possibility to only allow relevant types e.g. Button = onClick, onFocus etc.
  [key: string]: any
}
const Badge: React.FunctionComponent<BadgeProps> = props => (
  <WebComponentWrapper component='scale-badge' {...props} />
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
  styles?: StyleSheet<string | number | symbol>
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
  styles?: StyleSheet<string | number | symbol>
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
  styles?: StyleSheet<string | number | symbol>
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
  styles?: StyleSheet<string | number | symbol>
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
  height?: number
  name?: string
  path: string
  size?: number
  styles?: StyleSheet<string | number | symbol>
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
  customClass?: string
  errorMessage?: string
  name?: string
  styles?: StyleSheet<string | number | symbol>
  type?: 'email' | 'hidden' | 'number' | 'password' | 'tel' | 'text' | 'url'
  value?: string
  // Web-component custom events
  // TODO: Provide events types
  onChanged?: (event?: any) => void
  // Allow custom props not yet specified in the types e.g. events onClick etc.
  // TODO: Find a possibility to only allow relevant types e.g. Button = onClick, onFocus etc.
  [key: string]: any
}
const Input: React.FunctionComponent<InputProps> = props => (
  <WebComponentWrapper
    events={{ onChanged: 'changed' }}
    component='scale-input'
    {...props}
  />
)
interface InputErrorProps {
  // Web-component props
  customClass?: string
  styles?: StyleSheet<string | number | symbol>
  // Allow custom props not yet specified in the types e.g. events onClick etc.
  // TODO: Find a possibility to only allow relevant types e.g. Button = onClick, onFocus etc.
  [key: string]: any
}
const InputError: React.FunctionComponent<InputErrorProps> = props => (
  <WebComponentWrapper component='scale-input-error' {...props} />
)
interface InputGroupProps {
  // Web-component props
  customClass?: string
  styles?: StyleSheet<string | number | symbol>
  // Allow custom props not yet specified in the types e.g. events onClick etc.
  // TODO: Find a possibility to only allow relevant types e.g. Button = onClick, onFocus etc.
  [key: string]: any
}
const InputGroup: React.FunctionComponent<InputGroupProps> = props => (
  <WebComponentWrapper component='scale-input-group' {...props} />
)
interface InputLabelProps {
  // Web-component props
  customClass?: string
  styles?: StyleSheet<string | number | symbol>
  // Allow custom props not yet specified in the types e.g. events onClick etc.
  // TODO: Find a possibility to only allow relevant types e.g. Button = onClick, onFocus etc.
  [key: string]: any
}
const InputLabel: React.FunctionComponent<InputLabelProps> = props => (
  <WebComponentWrapper component='scale-input-label' {...props} />
)
interface LinkProps {
  // Web-component props
  block?: boolean
  customClass?: string
  disabled?: boolean
  href: string
  icon?: string
  iconSize?: number
  styles?: StyleSheet<string | number | symbol>
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
  styles?: StyleSheet<string | number | symbol>
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
  styles?: StyleSheet<string | number | symbol>
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
  styles?: StyleSheet<string | number | symbol>
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
  styles?: StyleSheet<string | number | symbol>
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
  link?: string
  pill?: boolean
  styles?: StyleSheet<string | number | symbol>
  variant?: string
  // Allow custom props not yet specified in the types e.g. events onClick etc.
  // TODO: Find a possibility to only allow relevant types e.g. Button = onClick, onFocus etc.
  [key: string]: any
}
const Tag: React.FunctionComponent<TagProps> = props => (
  <WebComponentWrapper component='scale-tag' {...props} />
)
interface TextProps {
  // Web-component props
  customClass?: string
  styles?: StyleSheet<string | number | symbol>
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
  styles?: StyleSheet<string | number | symbol>
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
