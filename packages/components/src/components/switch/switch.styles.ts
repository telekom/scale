import { JssStyle } from 'jss';

export const styles: JssStyle = {
  switch: {
    margin: 0,
    padding: '0 6px',
    display: 'inline-flex',
    position: 'relative',
    width: 32,
    height: 20,
    border: '1px solid #000',
    borderRadius: 10,
    backgroundColor: '#fff',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
    justifyContent: 'flex-end',
    alignItems: 'center',
    '&:after': {
      content: '""',
      position: 'absolute',
      top: 2,
      left: 1,
      borderRadius: '100%',
      width: 16,
      height: 16,
      backgroundColor: '#000',
    },
    '& .switch--off': {
      color: '#000',
      display: 'inline-flex',
      alignItems: 'center',
    },
  },
  'switch--active': {
    borderColor: '#409eff',
    backgroundColor: '#409eff',
    justifyContent: 'flex-start',
    '&:after': {
      left: 'auto',
      right: 1,
      backgroundColor: '#fff',
    },
    '& .switch--on': {
      color: '#fff',
      display: 'inline-flex',
      alignItems: 'center',
    },
    '& scale-icon': {
      '--icon-color': '#fff',
    },
  },
  'switch--disabled': {
    cursor: 'not-allowed',
    opacity: 0.5,
  },
};
