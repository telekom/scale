import { JssStyle } from 'jss';

export const styles: JssStyle = {
  link: {
    display: 'inline-flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    textDecoration: 'none',
    outline: 'none',
    cursor: 'pointer',
    padding: 0,
    fontSize: '14px',
    fontWeight: 500,
    color: '#000',
  },
  'link--underline': {
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  'link--disabled': {
    cursor: 'not-allowed',
    opacity: 0.5,
  },
  'link--variant-primary': {
    color: '#409eff',
  },
  'link--variant-success': {
    color: '#67c23a',
  },
  'link--variant-warning': {
    color: '#e6a23c',
  },
  'link--variant-danger': {
    color: '#f56c6c',
  },
  'link--variant-info': {
    color: '#909399',
  },
};
