/* eslint-disable import/prefer-default-export */

export const phoneRegExp = /^\([0-9]{3}\) [0-9]{3} - [0-9]{4}$/;
export const capitalize = (txt: string) => (
  txt.charAt(0).toUpperCase() + txt.substring(1, txt.length)
);
