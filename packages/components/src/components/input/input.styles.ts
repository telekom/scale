import { JssStyle } from 'jss';

export const styles: JssStyle = {
  input: {
    '& input': {
      display: 'flex',
      width: '100%',
      borderRadius: '4px',
      border: '1px solid #cecece',
      padding: '0.5rem',
      fontSize: '16px',
      fontFamily: 'inherit',
      boxSizing: 'border-box',
      '&:not(.tabbing):focus': {
        outline: 0,
      },
    },
    '& .input__counter': {
      display: 'flex',
      justifyContent: 'flex-end',
      fontSize: '12px',
    },
    '& .input__helper-text': {
      fontSize: '9px',
    },
  },
  'input--status-error': {
    '& input': {
      border: '1px solid red',
    },
    '& .input__helper-text': {
      color: 'red',
    },
  },
  'input--variant-inline': {
    position: 'relative',
    '& label': {
      color: '#dfdfdf',
      height: '12px',
      position: 'absolute',
      top: 0,
      left: 0,
      transform: 'translate(0.5rem, 16px) scale(1)',
      zIndex: 1,
      transition: 'all 0.3s ease-in-out',
    },
    '& input': {
      marginTop: '24px',
      height: '48px',
    },
    '& input:focus + label': {
      transform: 'translate(0.5rem, 0) scale(0.75)',
      color: '#000',
      transition: 'all 0.3s ease-in-out',
    },
  },
  'input--variant-inline-animated': {
    '& label': {
      transform: 'translate(0.5rem, 0) scale(0.75)',
      color: '#000',
      transition: 'all 0.3s ease-in-out',
    },
  },
  'input--disabled': {
    '& label, & input': {
      opacity: '0.5',
      cursor: 'not-allowed',
    },
  },
};
