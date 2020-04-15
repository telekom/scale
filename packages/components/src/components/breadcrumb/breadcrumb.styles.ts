import { JssStyle } from 'jss';
// import { getTransition } from '../../theme/helpers';

const icon = `<svg width='11' height='19' xmlns='http://www.w3.org/2000/svg'><path d='M.793 17.947a1 1 0 01-.058-1.35l.058-.064 7.414-7.411L.793 1.707A1 1 0 01.734.357L.793.293a1 1 0 011.35-.059l.064.059 8.828 8.828-8.828 8.826a1 1 0 01-1.414 0z' fill='black' fill-rule='nonzero'/></svg>`;

export const styles: JssStyle = {
  breadcrumb: {
    display: 'flex',
    '& ::slotted(a)': {
      color: ({ colors }) => colors.text.default,
      textDecoration: 'none',
      display: 'inline-block',
      marginRight: '1ch',
    },
    '& ::slotted(a:last-child)': {
      marginRight: 0,
    },
    '& ::slotted(a:not(:last-child)):after': {
      content: '""',
      display: 'inline-block',
      marginLeft: '1ch',
      width: '1ch',
      height: '1em',
      verticalAlign: 'text-bottom',
      background: 'center / contain no-repeat',
      backgroundImage: `url("data:image/svg+xml;utf8,${icon}")`,
    },
    '& ::slotted(a[aria-current])': {
      fontWeight: ({ typography }) => typography.fontWeightBold,
    },
  },
};
