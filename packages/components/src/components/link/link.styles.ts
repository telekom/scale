import { JssStyle } from 'jss';

const linkVariant = variant => ({
  [`link--variant-${variant}`]: {
    color: ({ palette }) => palette.variants[variant].normal.fill,
    '--icon-color': ({ palette }) =>
      palette.variants[variant].normal.contrast,
  },
});

export const styles: JssStyle = {
  link: {
    display: 'inline-flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative',
    textDecoration: 'none',
    outline: 'none',
    cursor: 'pointer',
    padding: 0,
    fontSize: 16,
    fontWeight: 500,
    color: '#000',
    transition: 'all .2s ease-in-out',
    '--icon-color': '#000',
    '& scale-icon': {
      marginLeft: 4,
    },
    '&:hover&:not($link--disabled)': {
      color: 'black',
      '--icon-color': 'black',
    },
  },
  'link--underline': {
    '&:hover:not($link--disabled)': {
      textDecoration: 'underline',
    },
  },
  'link--disabled': {
    cursor: 'not-allowed',
    opacity: 0.5,
  },
  'link--block': {
    display: 'flex',
  },
  ...linkVariant('brand'),
  ...linkVariant('success'),
  ...linkVariant('error'),
  ...linkVariant('info'),
  ...linkVariant('warning'),
};
