import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReactElement } from 'react';
import { BrowserRouter } from 'react-router-dom';
import RegisterForm from '../Component/RegisterForm/index';
import Providers from '../Providers';

interface PropType { children: ReactElement }

const RenderWithProvider = ({ children }: PropType) => (

  <Providers>
    <BrowserRouter>
      {children}
    </BrowserRouter>
  </Providers>
);
test('Render Component RegisterForm', () => {
  render(<RenderWithProvider><RegisterForm /></RenderWithProvider>);
});

test('First Name Label Text', () => {
  render(<RenderWithProvider><RegisterForm /></RenderWithProvider>);
  const firstName = screen.getByText('First name');
  expect(firstName).toBeInTheDocument();
});
test('Last Name Label Text', () => {
  render(<RenderWithProvider><RegisterForm /></RenderWithProvider>);
  const firstName = screen.getByText('Last name');
  expect(firstName).toBeInTheDocument();
});

test('Phone Label Text', () => {
  render(<RenderWithProvider><RegisterForm /></RenderWithProvider>);
  const phone = screen.getByText('Phone number');
  expect(phone).toBeInTheDocument();
});

test('Email Label Text', () => {
  render(<RenderWithProvider><RegisterForm /></RenderWithProvider>);
  const email = screen.getByText('Email');
  expect(email).toBeInTheDocument();
});

test('Password Label Text', () => {
  render(<RenderWithProvider><RegisterForm /></RenderWithProvider>);
  const pw = screen.getByText('Password');
  expect(pw).toBeInTheDocument();
});

test('Submit Button Text', () => {
  render(<RenderWithProvider><RegisterForm /></RenderWithProvider>);
  const submitBtn = screen.getByText('NEXT');
  expect(submitBtn).toBeInTheDocument();
});

test('When All fields are Empty ', async () => {
  const component = render(<RenderWithProvider><RegisterForm /></RenderWithProvider>);
  const submitBtn = screen.getByText('NEXT');

  const firstName = screen.getByTestId('first_name');
  userEvent.type(firstName, '');

  const lastName = screen.getByTestId('last_name');
  userEvent.type(lastName, '');

  const email = screen.getByTestId('email');
  userEvent.type(email, '');

  const pw = screen.getByTestId('pw');
  userEvent.type(pw, '');

  // when clicked
  component.debug();

  userEvent.click(submitBtn);
  const firstNameErr = await screen.findByText('First Name is required.');
  const lastNameErr = await screen.findByText('Last Name is required.');
  const emailErr = await screen.findByText('Email is required.');
  const pwErr = await screen.findByText('Password is required.');

  userEvent.click(submitBtn);
  expect(firstNameErr).toBeInTheDocument();
  expect(lastNameErr).toBeInTheDocument();
  expect(emailErr).toBeInTheDocument();
  expect(pwErr).toBeInTheDocument();
});

test('When Email field have an invalid Email ', async () => {
  const component = render(<RenderWithProvider><RegisterForm /></RenderWithProvider>);
  const textPW = await screen.findByTestId('email');
  const inputEl = textPW.querySelector('input') as HTMLInputElement;
  userEvent.type(inputEl, 'email@.com');
  const submitBtn = screen.getByText('NEXT');

  // when clicked
  component.debug();

  userEvent.click(submitBtn);

  expect(await screen.findByText('Invalid email address')).toBeInTheDocument();
});

test('When Password field is less than 8 Characters  ', async () => {
  const component = render(<RenderWithProvider><RegisterForm /></RenderWithProvider>);
  const textPW = await screen.findByTestId('pw');
  const inputEl = textPW.querySelector('input') as HTMLInputElement;
  userEvent.type(inputEl, '123456');
  const submitBtn = screen.getByText('NEXT');

  // when clicked
  component.debug();

  userEvent.click(submitBtn);

  expect(await screen.findByText('Oops! You need a password longer than 8 characters with numbers and letters.')).toBeInTheDocument();
});

test("When Password field Doesn't have LowerCase character  ", async () => {
  const component = render(<RenderWithProvider><RegisterForm /></RenderWithProvider>);
  const textPW = await screen.findByTestId('pw');
  const inputEl = textPW.querySelector('input') as HTMLInputElement;
  userEvent.type(inputEl, 'QWERTY123');
  const submitBtn = screen.getByText('NEXT');

  // when clicked
  component.debug();

  userEvent.click(submitBtn);

  expect(await screen.findByText('Must contain at least one lowercase character')).toBeInTheDocument();
});

test("When Password field Doesn't have Uppercase Character  ", async () => {
  const component = render(<RenderWithProvider><RegisterForm /></RenderWithProvider>);
  const textPW = await screen.findByTestId('pw');
  const inputEl = textPW.querySelector('input') as HTMLInputElement;
  userEvent.type(inputEl, 'qwerty123');
  const submitBtn = screen.getByText('NEXT');

  // when clicked
  component.debug();

  userEvent.click(submitBtn);

  expect(await screen.findByText('Must contain at least one uppercase character')).toBeInTheDocument();
});

test("When Password field Doesn't have any Number Character  ", async () => {
  const component = render(<RenderWithProvider><RegisterForm /></RenderWithProvider>);
  const textPW = await screen.findByTestId('pw');
  const inputEl = textPW.querySelector('input') as HTMLInputElement;
  userEvent.type(inputEl, 'Qwertyuio');
  const submitBtn = screen.getByText('NEXT');

  // when clicked
  component.debug();

  userEvent.click(submitBtn);

  expect(await screen.findByText('Must contain at least one number')).toBeInTheDocument();
});

test('When Phone Number is Not Valid  ', async () => {
  const component = render(<RenderWithProvider><RegisterForm /></RenderWithProvider>);
  const textPW = await screen.findByTestId('phone');
  const inputEl = textPW.querySelector('input') as HTMLInputElement;
  userEvent.type(inputEl, '(032) 02 - 1706');
  const submitBtn = screen.getByText('NEXT');

  // when clicked
  component.debug();

  userEvent.click(submitBtn);

  expect(await screen.findByText('Phone number is not valid')).toBeInTheDocument();
});
