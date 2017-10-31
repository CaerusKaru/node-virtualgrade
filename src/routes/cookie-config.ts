import {ServerStateCookieConfiguationObject} from 'hapi';

export const COOKIE_CONFIG: ServerStateCookieConfiguationObject = {
  isSecure: !process.env.NODE_ENV,
  isSameSite: process.env.NODE_ENV ? false : 'Strict',
  path: '/'
};