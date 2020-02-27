import * as React from 'react'
import WebComponentWrapper from './Wrapper'

interface AlertProps extends React.FC {
  customClass?: string
  headline: string
  icon?: string
  opened: boolean
  size?: string
  theme?: string
  timeout?: boolean | number
  variant?: string
}

const Alert = (props: AlertProps) => (
  <WebComponentWrapper events={{}} component='t-alert' {...props} />
)
interface BadgeProps extends React.FC {
  customClass?: string
  link?: string
  pill?: boolean
  size?: string
  variant?: string
}

const Badge = (props: BadgeProps) => (
  <WebComponentWrapper events={{}} component='t-badge' {...props} />
)
interface ButtonProps extends React.FC {
  customClass?: string
  deselected?: boolean
  disabled?: boolean
  size?: string
  theme?: string
  variant?: string
}

const Button = (props: ButtonProps) => (
  <WebComponentWrapper events={{}} component='t-button' {...props} />
)
interface CardProps extends React.FC {
  customClass?: string
  deselected?: boolean
  disabled?: boolean
  imageTop?: string
  imageTopAlt?: string
  size?: string
  theme?: string
  variant?: string
}

const Card = (props: CardProps) => (
  <WebComponentWrapper events={{}} component='t-card' {...props} />
)
interface CarouselProps extends React.FC {
  vertical?: boolean
}

const Carousel = (props: CarouselProps) => (
  <WebComponentWrapper events={{}} component='t-carousel' {...props} />
)
interface DividerProps extends React.FC {
  customClass?: string
  size?: string
  theme?: string
  vertical?: boolean
}

const Divider = (props: DividerProps) => (
  <WebComponentWrapper events={{}} component='t-divider' {...props} />
)
interface IconProps extends React.FC {
  customClass?: string
  name: string
  path: string
  theme?: string
}

const Icon = (props: IconProps) => (
  <WebComponentWrapper events={{}} component='t-icon' {...props} />
)
interface InputProps extends React.FC {
  customClass?: string
  errorMessage?: string
  name?: string
  theme?: string
  type?: 'email' | 'hidden' | 'number' | 'password' | 'tel' | 'text' | 'url'
  value: string
}

const Input = (props: InputProps) => (
  <WebComponentWrapper
    events={{ onChanged: 'changed' }}
    component='t-input'
    {...props}
  />
)
interface InputErrorProps extends React.FC {
  customClass?: string
  theme?: string
}

const InputError = (props: InputErrorProps) => (
  <WebComponentWrapper events={{}} component='t-input-error' {...props} />
)
interface InputGroupProps extends React.FC {
  customClass?: string
  theme?: string
}

const InputGroup = (props: InputGroupProps) => (
  <WebComponentWrapper events={{}} component='t-input-group' {...props} />
)
interface InputLabelProps extends React.FC {
  customClass?: string
  theme?: string
}

const InputLabel = (props: InputLabelProps) => (
  <WebComponentWrapper events={{}} component='t-input-label' {...props} />
)
interface LinkProps extends React.FC {
  customClass?: string
  disabled?: boolean
  href?: string
  openNewTab?: boolean
  underline?: boolean
  variant?: string
}

const Link = (props: LinkProps) => (
  <WebComponentWrapper events={{}} component='t-link' {...props} />
)
interface ModalProps extends React.FC {
  customClass?: string
  opened?: boolean
  size?: string
  theme?: string
  variant?: string
}

const Modal = (props: ModalProps) => (
  <WebComponentWrapper events={{}} component='t-modal' {...props} />
)
interface ProgressBarProps extends React.FC {
  customClass?: string
  percentage: number
  showText?: boolean
  strokeWidth?: number
  textInside?: boolean
  variant?: string
}

const ProgressBar = (props: ProgressBarProps) => (
  <WebComponentWrapper events={{}} component='t-progress-bar' {...props} />
)
interface SliderProps extends React.FC {
  customClass?: string
  label: boolean
  max?: number
  min?: number
  step: number
  value: number
}

const Slider = (props: SliderProps) => (
  <WebComponentWrapper events={{}} component='t-slider' {...props} />
)
interface SwitchProps extends React.FC {
  active?: boolean
  customClass?: string
  disabled?: boolean
  theme?: string
}

const Switch = (props: SwitchProps) => (
  <WebComponentWrapper events={{}} component='t-switch' {...props} />
)
interface TagProps extends React.FC {
  customClass?: string
  link?: string
  pill?: boolean
  theme?: string
  variant?: string
}

const Tag = (props: TagProps) => (
  <WebComponentWrapper events={{}} component='t-tag' {...props} />
)
interface TextProps extends React.FC {
  customClass?: string
  theme?: string
}

const Text = (props: TextProps) => (
  <WebComponentWrapper events={{}} component='t-text' {...props} />
)
interface ToastProps extends React.FC {
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

const Toast = (props: ToastProps) => (
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
