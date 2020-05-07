import { JssStyle } from 'jss';

const progressBarVariant = variant => ({
  [`progress-bar--variant-${variant}`]: {
    background: ({ palette }) => palette.variants[variant].dark.fill,
  },
});

export const styles: JssStyle = {
  'progress-bar': {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    boxSizing: 'border-box',
  },
  'progress-bar__outer': {
    margin: '12px 12px 12px 0',
    position: 'relative',
    height: '6px',
    borderRadius: '100px',
    background: '#ebeef5',
    overflow: 'hidden',
    width: '400px',
  },
  'progress-bar__inner': {
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    borderRadius: '100px',
    whiteSpace: 'nowrap',
    transition: 'width 0.5s ease-in-out',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  'progress-bar__inner-text': {
    color: '#fff',
    fontSize: '12px',
    padding: '0 12px',
  },
  'progress-bar__text': {
    color: '#606266',
    fontSize: '14px',
    display: 'inline-block',
  },
  ...progressBarVariant('brand'),
  ...progressBarVariant('error'),
  ...progressBarVariant('warning'),
  ...progressBarVariant('info'),
  ...progressBarVariant('success'),
};
