import { JssStyle } from 'jss';

const tagVariant = (variant: string) => ({
  [`tag--variant-${variant}`]: {
    color: ({ colors }) => colors[variant].contrastText,
    background: ({ colors }) => colors[variant].default,
    border: ({ colors }) => `1px solid ${colors[variant].default}`,
  },
});

const tagVariantLink = (variant: string) => ({
  [`&$tag--variant-${variant}`]: {
    ...tagVariant(variant),
    '&:hover': {
      color: ({ colors }) => colors[variant].contrastText,
      background: ({ colors }) => colors[variant].darker,
      border: ({ colors }) => `1px solid ${colors[variant].darker}`,
    },
    '&:active': {
      color: ({ colors }) => colors[variant].contrastText,
      background: ({ colors }) => colors[variant].darker,
      border: ({ colors }) => `1px solid ${colors[variant].darker}`,
    },
  },
});

export const styles: JssStyle = {
  tag: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '6px 12px',
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 1,
    textAlign: 'center',
    whiteSpace: 'nowrap',
    verticalAlign: 'baseline',
    borderRadius: 4,
    transition: 'all 0.15s ease-in-out',
    background: '#343a40',
    color: ' #fff',
    '--icon-color': '#fff',
    '& scale-icon': {
      marginLeft: 2,
    },
    '&:not($tag--disabled)': {
      '& scale-icon': {
        '&:hover': {
          '--icon-color': 'red',
        },
      },
    },
  },
  'tag--dismissable': {
    paddingRight: 8,
  },
  'tag--size-small': {
    padding: '4px 8px',
    fontSize: 12,
    '& scale-icon': {
      height: 12,
      width: 12,
    },
    '&$tag--dismissable': {
      paddingRight: 4,
    },
  },
  ...tagVariant('primary'),
  ...tagVariant('secondary'),
  ...tagVariant('error'),
  ...tagVariant('warning'),
  ...tagVariant('info'),
  ...tagVariant('success'),
  'tag--link': {
    textDecoration: 'none',
    ...tagVariantLink('primary'),
    ...tagVariantLink('secondary'),
    ...tagVariantLink('error'),
    ...tagVariantLink('warning'),
    ...tagVariantLink('info'),
    ...tagVariantLink('success'),
  },
  'tag--disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
};
