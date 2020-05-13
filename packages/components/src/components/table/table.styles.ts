import { JssStyle } from 'jss';

export const styles: JssStyle = {
  table: {
    display: 'block',
    overflow: 'auto',
    borderRadius: '4px 4px 0 0',
    background: ({ colors }) => colors.grey[100],

    '& table': {
      fontFamily: ({ typography }) => typography.fontFamily,
      borderSpacing: 0,
      borderCollapse: 'collapse',
      width: '100%',
      whiteSpace: 'nowrap',
    },

    '& th': {
      color: ({ colors }) => colors.grey[600],
      lineHeight: '32px',
      fontSize: 12,
      textAlign: 'left',
      userSelect: 'none',
    },
    '& th, td': {
      padding: '0 8px',
    },

    '& tbody tr td': {
      padding: '8px',
    },

    '& tfoot, tbody': {
      background: '#FFFFFF',
    },

    '& tfoot tr td': {
      fontWeight: 600,
      padding: '8px',
      borderBottom: '1px solid #000000',
    },

    '& .scale-sort-indicator svg': {
      display: 'none',
    },
  },

  'table--size-default': {
    '& tbody tr td': {
      padding: '16px 8px',
    },
  },

  'table--sortable': {
    '& th': {
      cursor: 'pointer',

      '& .scale-sort-indicator svg': {
        display: 'block',
      },
      '&[aria-disabled="true"]': {
        pointerEvents: 'none',
      },
      '&[aria-sort="descending"] .scale-sort-indicator polygon:first-of-type': {
        fill: '#000000',
      },
      '&[aria-sort="descending"] .scale-sort-indicator polygon': {
        fill: '#DCDCDC',
      },
      '&[aria-sort="ascending"] .scale-sort-indicator polygon:first-of-type': {
        fill: '#DCDCDC',
      },
      '&[aria-sort="ascending"] .scale-sort-indicator polygon': {
        fill: '#000000',
      },
      '& .scale-sort-indicator': {
        left: '-8px',
        position: 'relative',
        display: 'inline-block',
        width: '12px',
        height: '20px',
        '& > svg': {
          position: 'absolute',
          left: 0,
          top: '4px',
          height: '24px',
          width: '24px',
        },
        '& polygon': {
          fill: '#DCDCDC',
        },
      },
    },
  },
};
