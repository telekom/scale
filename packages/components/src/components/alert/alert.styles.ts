import { JssStyle } from 'jss';

const alertVariant = variant => ({
  [`alert--variant-${variant}`]: {
    color: ({ palette }) => palette.colors.neutral[100],
    background: ({ palette }) => palette.variants[variant].normal.fill,
  },
});

export const styles: JssStyle = {
  alert: {
    boxSizing: 'border-box',
    background: '#eee',
    color: '#333',
    width: '100%',
    padding: '1rem',
    textAlign: 'left',
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
  },
  alert__body: {
    display: 'flex',
  },
  alert__headline: {
    fontSize: '1rem',
    color: 'white',
    margin: 0,
  },
  alert__icon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'none',
    height: '24px',
    width: '24px',
    margin: '0 0.5rem 0 0',
    borderRadius: '4px',
  },
  alert__close: {
    height: '16px',
    opacity: '0.5',
    cursor: 'pointer',
    '&hover': {
      opacity: 1,
    },
  },
  ...alertVariant('brand'),
  ...alertVariant('error'),
  ...alertVariant('warning'),
  ...alertVariant('info'),
  ...alertVariant('success'),
};
