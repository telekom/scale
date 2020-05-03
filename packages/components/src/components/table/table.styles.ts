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
    },
    '& th, td': {
      padding: '0 8px',
    },
    '& td': {
      padding: '16px 8px',
    },
  },

  'table--variant-compressed': {
    '& td': {
      padding: '8px',
    },
  },
};
