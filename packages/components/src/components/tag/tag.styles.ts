import { JssStyle } from 'jss';

const tagVariant = (variant: string) => ({
  [`tag--variant-${variant}`]: {
    color: ({ palette }) => palette.colors.neutral[100],
    background: ({ palette }) => palette.variants[variant].normal.fill,
    border: ({ palette }) =>
      `1px solid ${palette.variants[variant].normal.fill}`,
  },
});

const tagVariantLink = (variant: string) => ({
  [`&$tag--variant-${variant}`]: {
    ...tagVariant(variant),
    '&:hover': {
      color: ({ palette }) => palette.colors.neutral[100],
      background: ({ palette }) => palette.variants[variant].dark.fill,
      border: ({ palette }) =>
        `1px solid ${palette.variants[variant].dark.fill}`,
    },
    '&:active': {
      color: ({ palette }) => palette.colors.neutral[100],
      background: ({ palette }) => palette.variants[variant].dark.fill,
      border: ({ palette }) =>
        `1px solid ${palette.variants[variant].dark.fill}`,
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
  ...tagVariant('brand'),
  ...tagVariant('error'),
  ...tagVariant('warning'),
  ...tagVariant('info'),
  ...tagVariant('success'),
  'tag--link': {
    textDecoration: 'none',
    ...tagVariantLink('brand'),
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
