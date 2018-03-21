import {ServerStateCookieOptions} from 'hapi';

export const COOKIE_CONFIG: ServerStateCookieOptions = {
  isSecure: !process.env.NODE_ENV,
  isSameSite: process.env.NODE_ENV ? false : 'Strict',
  path: '/'
};