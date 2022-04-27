import { alpha, styled } from '@mui/material/styles';

import TextField from '@mui/material/TextField';

const Input = styled(TextField)(({ theme }) => ({
  '& .MuiFormHelperText-root': {
    marginLeft: 1,
  },
  '& .MuiFilledInput-root': {
    border: '1px solid #e2e2e1',
    overflow: 'hidden',
    borderRadius: 2,
    backgroundColor: theme.palette.mode === 'light' ? '#ffff' : '#2b2b2b',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    '&:hover': {
      backgroundColor: 'transparent',
    },
    '&.Mui-focused': {
      backgroundColor: 'transparent',
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

Input.defaultProps = {
  variant: 'filled',
  InputProps: { disableUnderline: true },
};
export default Input;
