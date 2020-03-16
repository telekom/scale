import * as React from 'react'
import { StyleSheet } from 'jss'
import WebComponentWrapper from './Wrapper'

interface ScaleAlertProps {
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

const ScaleAlert: React.FunctionComponent<ScaleAlertProps> = props => (
  <WebComponentWrapper component='scale-alert' {...props} />
)
interface ScaleBadgeProps {
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

const ScaleBadge: React.FunctionComponent<ScaleBadgeProps> = props => (
  <WebComponentWrapper component='scale-badge' {...props} />
)
interface ScaleButtonProps {
  // Web-component props
  customClass?: string
  disabled?: boolean
  href?: string
  size?: string
  styles?: StyleSheet<string | number | symbol>
  target?: string
  variant?: string
  // Allow custom props not yet specified in the types e.g. events onClick etc.
  // TODO: Find a possibility to only allow relevant types e.g. Button = onClick, onFocus etc.
  [key: string]: any
}

const ScaleButton: React.FunctionComponent<ScaleButtonProps> = props => (
  <WebComponentWrapper component='scale-button' {...props} />
)
interface ScaleCardProps {
  // Web-component props
  customClass?: string
  imageTop?: string
  imageTopAlt?: string
  size?: string
  styles?: StyleSheet<string | number | symbol>
  variant?: string
  // Allow custom props not yet specified in the types e.g. events onClick etc.
  // TODO: Find a possibility to only allow relevant types e.g. Button = onClick, onFocus etc.
  [key: string]: any
}

const ScaleCard: React.FunctionComponent<ScaleCardProps> = props => (
  <WebComponentWrapper component='scale-card' {...props} />
)
interface ScaleCarouselProps {
  // Web-component props
  customClass?: string
  styles?: StyleSheet<string | number | symbol>
  vertical?: boolean
  // Allow custom props not yet specified in the types e.g. events onClick etc.
  // TODO: Find a possibility to only allow relevant types e.g. Button = onClick, onFocus etc.
  [key: string]: any
}

const ScaleCarousel: React.FunctionComponent<ScaleCarouselProps> = props => (
  <WebComponentWrapper component='scale-carousel' {...props} />
)
interface ScaleDividerProps {
  // Web-component props
  customClass?: string
  size?: string
  styles?: StyleSheet<string | number | symbol>
  vertical?: boolean
  // Allow custom props not yet specified in the types e.g. events onClick etc.
  // TODO: Find a possibility to only allow relevant types e.g. Button = onClick, onFocus etc.
  [key: string]: any
}

const ScaleDivider: React.FunctionComponent<ScaleDividerProps> = props => (
  <WebComponentWrapper component='scale-divider' {...props} />
)
interface ScaleIconProps {
  // Web-component props
  customClass?: string
  name: string
  path: string
  styles?: StyleSheet<string | number | symbol>
  // Allow custom props not yet specified in the types e.g. events onClick etc.
  // TODO: Find a possibility to only allow relevant types e.g. Button = onClick, onFocus etc.
  [key: string]: any
}

const ScaleIcon: React.FunctionComponent<ScaleIconProps> = props => (
  <WebComponentWrapper component='scale-icon' {...props} />
)
interface ScaleInputProps {
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

const ScaleInput: React.FunctionComponent<ScaleInputProps> = props => (
  <WebComponentWrapper
    events={{ onChanged: 'changed' }}
    component='scale-input'
    {...props}
  />
)
interface ScaleInpuerrorProps {
  // Web-component props
  customClass?: string
  styles?: StyleSheet<string | number | symbol>
  // Allow custom props not yet specified in the types e.g. events onClick etc.
  // TODO: Find a possibility to only allow relevant types e.g. Button = onClick, onFocus etc.
  [key: string]: any
}

const ScaleInpuerror: React.FunctionComponent<ScaleInpuerrorProps> = props => (
  <WebComponentWrapper component='scale-input-error' {...props} />
)
interface ScaleInpugroupProps {
  // Web-component props
  customClass?: string
  styles?: StyleSheet<string | number | symbol>
  // Allow custom props not yet specified in the types e.g. events onClick etc.
  // TODO: Find a possibility to only allow relevant types e.g. Button = onClick, onFocus etc.
  [key: string]: any
}

const ScaleInpugroup: React.FunctionComponent<ScaleInpugroupProps> = props => (
  <WebComponentWrapper component='scale-input-group' {...props} />
)
interface ScaleInpulabelProps {
  // Web-component props
  customClass?: string
  styles?: StyleSheet<string | number | symbol>
  // Allow custom props not yet specified in the types e.g. events onClick etc.
  // TODO: Find a possibility to only allow relevant types e.g. Button = onClick, onFocus etc.
  [key: string]: any
}

const ScaleInpulabel: React.FunctionComponent<ScaleInpulabelProps> = props => (
  <WebComponentWrapper component='scale-input-label' {...props} />
)
interface ScaleLinkProps {
  // Web-component props
  customClass?: string
  disabled?: boolean
  href?: string
  openNewTab?: boolean
  styles?: StyleSheet<string | number | symbol>
  underline?: boolean
  variant?: string
  // Allow custom props not yet specified in the types e.g. events onClick etc.
  // TODO: Find a possibility to only allow relevant types e.g. Button = onClick, onFocus etc.
  [key: string]: any
}

const ScaleLink: React.FunctionComponent<ScaleLinkProps> = props => (
  <WebComponentWrapper component='scale-link' {...props} />
)
interface ScaleModalProps {
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

const ScaleModal: React.FunctionComponent<ScaleModalProps> = props => (
  <WebComponentWrapper component='scale-modal' {...props} />
)
interface ScaleProgressBarProps {
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

const ScaleProgressBar: React.FunctionComponent<ScaleProgressBarProps> = props => (
  <WebComponentWrapper component='scale-progress-bar' {...props} />
)
interface ScaleSliderProps {
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

const ScaleSlider: React.FunctionComponent<ScaleSliderProps> = props => (
  <WebComponentWrapper component='scale-slider' {...props} />
)
interface ScaleSwitchProps {
  // Web-component props
  active?: boolean
  customClass?: string
  disabled?: boolean
  styles?: StyleSheet<string | number | symbol>
  // Allow custom props not yet specified in the types e.g. events onClick etc.
  // TODO: Find a possibility to only allow relevant types e.g. Button = onClick, onFocus etc.
  [key: string]: any
}

const ScaleSwitch: React.FunctionComponent<ScaleSwitchProps> = props => (
  <WebComponentWrapper component='scale-switch' {...props} />
)
interface ScaleTagProps {
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

const ScaleTag: React.FunctionComponent<ScaleTagProps> = props => (
  <WebComponentWrapper component='scale-tag' {...props} />
)
interface ScaleTextProps {
  // Web-component props
  customClass?: string
  styles?: StyleSheet<string | number | symbol>
  // Allow custom props not yet specified in the types e.g. events onClick etc.
  // TODO: Find a possibility to only allow relevant types e.g. Button = onClick, onFocus etc.
  [key: string]: any
}

const ScaleText: React.FunctionComponent<ScaleTextProps> = props => (
  <WebComponentWrapper component='scale-text' {...props} />
)
interface ScaleToastProps {
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

const ScaleToast: React.FunctionComponent<ScaleToastProps> = props => (
  <WebComponentWrapper component='scale-toast' {...props} />
)

export {
  ScaleAlert,
  ScaleBadge,
  ScaleButton,
  ScaleCard,
  ScaleCarousel,
  ScaleDivider,
  ScaleIcon,
  ScaleInput,
  ScaleInpuerror,
  ScaleInpugroup,
  ScaleInpulabel,
  ScaleLink,
  ScaleModal,
  ScaleProgressBar,
  ScaleSlider,
  ScaleSwitch,
  ScaleTag,
  ScaleText,
  ScaleToast
}
