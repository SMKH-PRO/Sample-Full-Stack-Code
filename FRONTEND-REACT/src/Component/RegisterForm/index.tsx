/* eslint-disable react/jsx-props-no-spreading */
import {
  Button, CircularProgress, InputProps, TextFieldProps,
} from '@mui/material';
import { useFormik } from 'formik';
import { FormEvent, ReactNode, useContext } from 'react';
import InputMask, { Props } from 'react-input-mask';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { UserContext } from '../../Utils/ContextAPI';
import Input from '../Input';
import './index.css';
import { capitalize, phoneRegExp } from '../../Utils/Constants';
import USFlag from '../Svgs/USFlag';
import InputWithIcon from '../Input/InputWithIcon';
import { apiRegistration } from '../../Utils/Helpers';

interface Values {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
}

const validationSchema = yup.object({
  firstName: yup.string().required('First Name is required.'),
  lastName: yup.string().required('Last Name is required.'),
  email: yup.string().email('Invalid email address').required('Email is required.'),
  phone: yup.string().matches(phoneRegExp, 'Phone number is not valid'),
  password: yup
    .string()
    .required('Password is required.').min(8, 'Oops! You need a password longer than 8 characters with numbers and letters.')
    .matches(/^(?=.*[a-z])/, 'Must contain at least one lowercase character')
    .matches(/^(?=.*[A-Z])/, 'Must contain at least one uppercase character')
    .matches(/^(?=.*[0-9])/, 'Must contain at least one number'),
});

const RegisterForm = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      password: '',
    } as Values,
    validationSchema,
    onSubmit: async (values) => {
      const isValid = await validationSchema.isValid(values);
      if (isValid) {
        try {
          formik.setSubmitting(true);
          await axios.post(apiRegistration, values);
          dispatch({ type: 'SET_USER_DATA', payload: values });
          navigate('/success');
        } catch (e: any | { message: string }) {
          console.error(e);
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          enqueueSnackbar(`Couldn't submit!, ${e?.message as string}`, { variant: 'error' });
        }
        formik.setSubmitting(false);
      }
    },
  });

  const maskedInput = (innerProps: TextFieldProps & Props) => (
    <InputWithIcon
      className="formItems"
      fullWidth
      label="Phone number"
      error={formik.touched.phone && Boolean(formik.errors.phone)}
      helperText={formik.touched.phone && formik.errors.phone}
      {...innerProps}
    />
  );
  return (
    <div className="formContainer">
      <div className="formContainerChild">
        <form onSubmit={formik.handleSubmit}>

          <div className="flex spaceBetween">

            <Input
              data-testid="first_name"
              value={formik.values.firstName}
              onChange={(e) => {
                e.target.value = capitalize(e.target.value);
                formik.handleChange(e);
              }}
              name="firstName"
              className="halfInputLeft formItems"
              label="First name"
              error={formik.touched.firstName && Boolean(formik.errors.firstName)}
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
            <Input
              data-testid="last_name"
              value={formik.values.lastName}
              onChange={(e) => {
                e.target.value = capitalize(e.target.value);
                formik.handleChange(e);
              }}
              name="lastName"
              className="halfInputRight formItems"
              label="Last name"
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />

          </div>

          <InputMask
            name="phone"
            mask="(999) 999 - 9999"
            value={formik.values.phone}
            onChange={formik.handleChange}
          >
            {maskedInput as unknown as ReactNode}
          </InputMask>

          <Input
            data-testid="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            name="email"
            fullWidth
            className="formItems"
            label="Email"
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <Input
            data-testid="pw"
            value={formik.values.password}
            onChange={formik.handleChange}
            name="password"
            fullWidth
            className="formItems"
            label="Password"
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button
            data-testid="submit_btn"
            className="formSubmit formItems"
            color="primary"
            variant="contained"
            fullWidth
            size="large"
            type="submit"
            disabled={formik.isSubmitting}
          >
            {(formik.isSubmitting) ? <CircularProgress size={30} color="secondary" /> : 'NEXT'}

          </Button>
        </form>

      </div>

    </div>
  );
};

export default RegisterForm;
