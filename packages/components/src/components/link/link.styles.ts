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
    fontSize: 14,
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
  'link--variant-primary': {
    color: '#409eff',
    '--icon-color': '#409eff',
  },
  'link--variant-success': {
    color: '#67c23a',
    '--icon-color': '#67c23a',
  },
  'link--variant-warning': {
    color: '#e6a23c',
    '--icon-color': '#e6a23c',
  },
  'link--variant-danger': {
    color: '#f56c6c',
    '--icon-color': '#f56c6c',
  },
  'link--variant-info': {
    color: '#909399',
    '--icon-color': '#909399',
  },
};
