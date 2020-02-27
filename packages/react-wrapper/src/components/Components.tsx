import * as React from 'react'
import WebComponentWrapper from './Wrapper'

interface AlertInterface {
  customClass?: string
  headline: string
  icon?: string
  opened: boolean
  size?: string
  theme?: string
  timeout?: boolean | number
  variant?: string
}

const Alert = (props: AlertInterface) => (
  <WebComponentWrapper events={{}} component='t-alert' {...props} />
)
interface BadgeInterface {
  customClass?: string
  link?: string
  pill?: boolean
  size?: string
  variant?: string
}

const Badge = (props: BadgeInterface) => (
  <WebComponentWrapper events={{}} component='t-badge' {...props} />
)
interface ButtonInterface {
  customClass?: string
  deselected?: boolean
  disabled?: boolean
  size?: string
  theme?: string
  variant?: string
}

const Button = (props: ButtonInterface) => (
  <WebComponentWrapper events={{}} component='t-button' {...props} />
)
interface CardInterface {
  customClass?: string
  deselected?: boolean
  disabled?: boolean
  imageTop?: string
  imageTopAlt?: string
  size?: string
  theme?: string
  variant?: string
}

const Card = (props: CardInterface) => (
  <WebComponentWrapper events={{}} component='t-card' {...props} />
)
interface CarouselInterface {
  vertical?: boolean
}

const Carousel = (props: CarouselInterface) => (
  <WebComponentWrapper events={{}} component='t-carousel' {...props} />
)
interface DividerInterface {
  customClass?: string
  size?: string
  theme?: string
  vertical?: boolean
}

const Divider = (props: DividerInterface) => (
  <WebComponentWrapper events={{}} component='t-divider' {...props} />
)
interface IconInterface {
  customClass?: string
  name: string
  path: string
  theme?: string
}

const Icon = (props: IconInterface) => (
  <WebComponentWrapper events={{}} component='t-icon' {...props} />
)
interface InputInterface {
  customClass?: string
  errorMessage?: string
  name?: string
  theme?: string
  type?: 'email' | 'hidden' | 'number' | 'password' | 'tel' | 'text' | 'url'
  value: string
}

const Input = (props: InputInterface) => (
  <WebComponentWrapper
    events={{ onChanged: 'changed' }}
    component='t-input'
    {...props}
  />
)
interface InputErrorInterface {
  customClass?: string
  theme?: string
}

const InputError = (props: InputErrorInterface) => (
  <WebComponentWrapper events={{}} component='t-input-error' {...props} />
)
interface InputGroupInterface {
  customClass?: string
  theme?: string
}

const InputGroup = (props: InputGroupInterface) => (
  <WebComponentWrapper events={{}} component='t-input-group' {...props} />
)
interface InputLabelInterface {
  customClass?: string
  theme?: string
}

const InputLabel = (props: InputLabelInterface) => (
  <WebComponentWrapper events={{}} component='t-input-label' {...props} />
)
interface LinkInterface {
  customClass?: string
  disabled?: boolean
  href?: string
  openNewTab?: boolean
  underline?: boolean
  variant?: string
}

const Link = (props: LinkInterface) => (
  <WebComponentWrapper events={{}} component='t-link' {...props} />
)
interface ModalInterface {
  customClass?: string
  opened?: boolean
  size?: string
  theme?: string
  variant?: string
}

const Modal = (props: ModalInterface) => (
  <WebComponentWrapper events={{}} component='t-modal' {...props} />
)
interface ProgressBarInterface {
  customClass?: string
  percentage: number
  showText?: boolean
  strokeWidth?: number
  textInside?: boolean
  variant?: string
}

const ProgressBar = (props: ProgressBarInterface) => (
  <WebComponentWrapper events={{}} component='t-progress-bar' {...props} />
)
interface SliderInterface {
  customClass?: string
  label: boolean
  max?: number
  min?: number
  step: number
  value: number
}

const Slider = (props: SliderInterface) => (
  <WebComponentWrapper events={{}} component='t-slider' {...props} />
)
interface SwitchInterface {
  active?: boolean
  customClass?: string
  disabled?: boolean
  theme?: string
}

const Switch = (props: SwitchInterface) => (
  <WebComponentWrapper events={{}} component='t-switch' {...props} />
)
interface TagInterface {
  customClass?: string
  link?: string
  pill?: boolean
  theme?: string
  variant?: string
}

const Tag = (props: TagInterface) => (
  <WebComponentWrapper events={{}} component='t-tag' {...props} />
)
interface TextInterface {
  customClass?: string
  theme?: string
}

const Text = (props: TextInterface) => (
  <WebComponentWrapper events={{}} component='t-text' {...props} />
)
interface ToastInterface {
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

const Toast = (props: ToastInterface) => (
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
