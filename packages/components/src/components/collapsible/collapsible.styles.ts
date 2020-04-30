import { JssStyle } from 'jss';

export const styles: JssStyle = {
  collapsible: {
    width: '100%',
    appearance: 'none',
    padding: 0,
    color: 'inherit',
    background: 'transparent',
    font: 'inherit',
    fontWeight: 'inherit',
    border: 'none',
    borderRadius: 0,
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'left',
    '&[aria-expanded="true"] svg': {
      transform: 'rotate(180deg)',
    }
  },
};
