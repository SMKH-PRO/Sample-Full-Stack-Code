/* eslint-disable react/jsx-props-no-spreading */
import { alpha, styled } from '@mui/material/styles';

import TextField, { TextFieldProps } from '@mui/material/TextField';
import { ReactElement } from 'react';
import FormHelperText from '@mui/material/FormHelperText';
import USFlag from '../Svgs/USFlag';
import './index.css';

interface Props {
  leftIcon?: ReactElement | undefined | null
}
const InputWithIcon = styled(({
  className, leftIcon, error, inputProps, helperText, ...props
}: Props & TextFieldProps) => (
  <>
    <div className={`${className as string} flex alignCenter`}>
      {leftIcon}
      <TextField
        data-testid="phone"
        error={error}
        inputProps={{ disableUnderline: true, ...inputProps || {} }}
        {...props}
      />
    </div>
    {helperText && <FormHelperText error={error} className="MuiFormHelperText-root">{helperText}</FormHelperText>}
  </>
))(({ theme, error }) => ({
  '& .MuiFormHelperText-root': {
    marginLeft: 1,
    color: error ? 'red' : null,
  },
  '& .MuiFilledInput-root': {
    border: 'none',
    background: 'transparent !important',
    backgroundColor: 'transparent !important',
    '&:hover': {
      backgroundColor: 'transparent !important',
    },
  },
  border: '1px solid #e2e2e1',
  overflow: 'hidden',
  borderRadius: 2,
  backgroundColor: theme.palette.mode === 'light' ? '#ffff' : '#2b2b2b',
  transition: theme.transitions.create([
    'border-color',
    'background-color',
    'box-shadow',
  ]),

  '&:focus, &:focus-within': {
    backgroundColor: 'transparent',
    boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
    borderColor: theme.palette.primary.main,
  },
  '& .MuiFilledInput-root:before, .MuiFilledInput-root:after, .MuiFilledInput-root:hover:not(.Mui-disabled):before, .MuiFilledInput-root.Mui-focused': {
    borderBottom: 'none',
    backgroundColor: 'transparent',
  },
}));

InputWithIcon.defaultProps = {
  variant: 'filled',
  leftIcon: (
    <span className="USFlagIcon">
      <USFlag />
    </span>
  ),
};
export default InputWithIcon;
