import { JssStyle } from 'jss';

const input = {
  small: {
    paddingX: 12,
    paddingY: 8,
    height: 40,
    fontSize: 16,
    labelTop: 4,
  },
  large: {
    paddingX: 12,
    paddingY: 12,
    height: 48,
    fontSize: 16,
    labelTop: 8,
  },
};

const defaultTransition = 'all 0.2s ease-in-out';

const animated = (size: string) => ({
  start: {
    fontSize: 16,
    color: '#dfdfdf',
    transform: `translate(${input[size].paddingX + 1}px, ${(input[size].height -
      input[size].fontSize) /
      2}px)`,
    transition: defaultTransition,
    fontWeight: 400,
  },
  end: {
    fontSize: 10,
    transform: `translate(${input[size].paddingX}px, ${input[size].labelTop}px)`,
    color: ({ colors }) => colors.primary.default,
    transition: defaultTransition,
    fontWeight: 700,
  },
});

export const styles: JssStyle = {
  input: {
    position: 'relative',
    '& .input__input': {
      display: 'flex',
      width: '100%',
      borderRadius: 4,
      border: '1px solid #cecece',
      padding: `${input.large.paddingY}px ${input.large.paddingX}px`,
      fontSize: 16,
      fontFamily: 'inherit',
      boxSizing: 'border-box',
      zIndex: 1,
      height: input.large.height,
      transition: defaultTransition,
    },
    '& .input__counter': {
      display: 'flex',
      justifyContent: 'flex-end',
      fontSize: 12,
      marginLeft: 'auto',
      color: '#333',
      transition: defaultTransition,
    },
    '& .input__helper-text': {
      fontSize: 12,
      transition: defaultTransition,
    },
    '& .input__meta': {
      marginTop: 6,
      display: 'flex',
      justifyContent: 'space-between',
    },
    '&:not($input--disabled)': {
      '& .input__input': {
        '&:hover, &:focus': {
          borderColor: ({ colors }) => colors.primary.default,
        },
      }
    },
  },
  'input--variant-static': {
    '& .input__label': {
      display: 'flex',
      marginBottom: 12,
    },
  },
  'input--variant-animated': {
    '& .input__input.has-label': {
      padding: `${input.large.paddingY}px ${input.large.paddingX}px 0 ${input
        .large.paddingY - 1}px`,
    },
    '& .input__label': {
      position: 'absolute',
      pointerEvents: 'none',
      top: 0,
      left: 0,
      display: 'flex',
      zIndex: 10,
      ...animated('large').start,
    },
    '& .input__input:focus + .input__label, &.animated .input__label': animated(
      'large'
    ).end,
  },
  'input--status-error': {
    '&.animated .input__label': {
      color: ({ colors }) => `${colors.error.default} !important`,
    },
    '& .input__input:focus + .input__label': {
      color: ({ colors }) => `${colors.error.default} !important`,
    },
    '& .input__input': {
      border: ({ colors }) => `1px solid ${colors.error.default}`,
    },
    '& .input__helper-text': {
      color: ({ colors }) => `${colors.error.default}`,
    },
    '& .input__counter': {
      color: ({ colors }) => `${colors.error.default}`,
    },
  },
  'input--size-small': {
    '& .input__input': {
      height: input.small.height,
    },
    '& .input__label': {
      position: 'absolute',
      pointerEvents: 'none',
      top: 0,
      left: 0,
      display: 'flex',
      zIndex: 10,
      ...animated('small').start,
    },
    '& .input__input:focus + .input__label, &.animated .input__label': animated(
      'small'
    ).end,
  },
  'input--disabled': {
    '& .input__label, & .input__input': {
      opacity: '0.5',
      cursor: 'not-allowed',
    },
  }
};
