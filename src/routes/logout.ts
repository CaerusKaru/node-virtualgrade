import {COOKIE_CONFIG} from './cookie-config';

export const LOGOUT_ROUTE = {
  method: 'POST',
  path: '/logout',
  handler: (req, reply) => {
    reply({
      error: false,
      message: 'logout successful'
    }).unstate('access_token', COOKIE_CONFIG);
  }
};