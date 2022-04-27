/* eslint-disable import/prefer-default-export */
export const IsDev = process.env.NODE_ENV === 'development';

const apiBase = IsDev ? 'http://localhost:3000/api' : '/api';
export const apiRegistration = `${apiBase}/register`; // POST>BODY => {firstName,lastName,email,phone,passwordx}
