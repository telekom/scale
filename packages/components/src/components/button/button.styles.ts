import { JssStyle } from 'jss';
import { getTransition } from '../../theme/helpers';

const buttonVariant = (variant: string) => ({
  [`button--variant-${variant}`]: {
    color: ({ colors }) => colors[variant].contrastText,
    background: ({ colors }) => colors[variant].default,
    border: ({ colors }) => `1px solid ${colors[variant].default}`,
    '&:hover': {
      color: ({ colors }) => colors[variant].contrastText,
      background: ({ colors }) => colors[variant].darker,
      border: ({ colors }) => `1px solid ${colors[variant].darker}`,
    },
  },
});

export const styles: JssStyle = {
  button: {
    color: ({ colors }) => colors.common.black,
    background: ({ colors }) => colors.grey[300],
    border: ({ colors }) => `1px solid ${colors.grey[300]}`,
    borderRadius: ({ shape }) => shape.borderRadius,
    fontFamily: ({ typography }) => typography.variants.button.fontFamily,
    fontSize: ({ typography }) => typography.variants.button.fontSize,
    fontWeight: ({ typography }) =>
      typography.variants.button.fontWeightRegular,
    textTransform: ({ typography }) => typography.variants.button.textTransform,
    letterSpacing: ({ typography }) => typography.variants.button.letterSpacing,
    transition: theme => getTransition(theme, 'all', 'shorter', 'easeInOut'),
    boxSizing: 'border-box',
    position: 'relative',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    verticalAlign: 'middle',
    textAlign: 'center',
    cursor: 'pointer',
    userSelect: 'none',
    padding: '0.25rem 1rem',
    boxShadow: 'none',
    minHeight: 40,
    textDecoration: 'none',
    '&:before': {
      width: 0,
      content: '""',
      display: 'block',
      height: '100%',
    },
    '&:hover': {
      color: ({ colors }) => colors.common.white,
      background: ({ colors }) => colors.grey[700],
      borderColor: ({ colors }) => colors.grey[700],
      transition: theme => getTransition(theme, 'all', 'standard', 'easeInOut'),
      boxShadow: 'none',
      textDecoration: 'none',
    },
  },
  'button--disabled': {
    '&, &:hover': {
      opacity: ({ colors }) => colors.action.disabledOpacity,
      border: ({ colors }) => `1px solid ${colors.action.disabled}`,
      color: ({ colors }) => colors.text.disabled,
      background: ({ colors }) => colors.common.white,
      cursor: 'not-allowed',
    },
  },
  button__before: {
    marginRight: '.5rem',
    display: 'flex',
    alignItems: 'center',
  },
  button__after: {
    marginLeft: '.5rem',
    display: 'flex',
    alignItems: 'center',
  },
  'button--icon-only': {
    height: 40,
    width: 40,
  },
  ...buttonVariant('primary'),
  ...buttonVariant('secondary'),
  ...buttonVariant('error'),
  ...buttonVariant('warning'),
  ...buttonVariant('info'),
  ...buttonVariant('success'),
};
