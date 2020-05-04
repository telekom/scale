import { JssStyle } from 'jss';

export const styles: JssStyle = {
  table: {
    '& table': {
      fontFamily: ({ typography }) => typography.fontFamily,
      borderSpacing: 0,
    },
    '& th': {
      background: ({ colors }) => colors.grey[100],
      color: ({ colors }) => colors.grey[600],
      lineHeight: '32px',
      fontSize: 12,
      textAlign: 'left',
      cursor: 'pointer',

      '&[aria-disabled="true"]': {
        cursor: 'default',
        pointerEvents: 'none',
      },
    },
    '& th, td': {
      padding: '0 8px',
    },
    '& td': {
      padding: '16px 8px',
      borderBottom: '1px solid #DDDDDD',
    },

    '& tfoot tr td': {
      fontWeight: 600,
      padding: '8px',
      borderBottom: '1px solid black',
    },
  },

  'table--variant-compressed': {
    '& td': {
      padding: '8px',
    },
  },
};
