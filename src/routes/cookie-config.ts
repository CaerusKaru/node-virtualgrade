export const COOKIE_CONFIG = {
  isSecure: !process.env.NODE_ENV,
  isSameSite: process.env.NODE_ENV ? false : 'Strict',
  path: '/'
};