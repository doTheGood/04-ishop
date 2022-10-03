import { styled } from '../../styles';

export const CartButtonContainer = styled('button', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'none',
  borderRadius: 6,
  position: 'relative',
  background: '$gray800',
  color: '$gray500',

  '&:disabled': {
    opacity: 0.6,
    cursor: 'not-allowed',
  },

  width: '3rem',
  height: '3rem',

  svg: {
    fontSize: 24,
  },
});
