import { JssStyle } from 'jss';

export const styles: JssStyle = {
  switch: {
    margin: 0,
    display: 'inline-block',
    position: 'relative',
    width: '40px',
    height: '20px',
    border: '1px solid #dcdfe6',
    outline: 'none',
    borderRadius: '10px',
    background: '#dcdfe6',
    cursor: 'pointer',
    transition: 'all 0.3s ease-in-out',
    verticalAlign: 'middle',
    '&:after': {
      content: '""',
      position: 'absolute',
      top: '2px',
      left: '1px',
      borderRadius: '100%',
      transition: 'all 0.3s ease-in-out',
      width: '16px',
      height: '16px',
      backgroundColor: '#fff',
    },
  },
  'switch--active': {
    borderColor: '#409eff',
    backgroundColor: '#409eff',
    '&:after': {
      left: '100%',
      marginLeft: '-17px',
    },
  },
  'switch--disabled': {
    cursor: 'not-allowed',
    opacity: 0.5,
  },
};
