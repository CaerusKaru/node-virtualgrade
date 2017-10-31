import {COOKIE_CONFIG} from './cookie-config';
import {RouteConfiguration} from 'hapi';

export const LOGOUT_ROUTE: RouteConfiguration = {
  method: 'POST',
  path: '/logout',
  handler: (req, reply) => {
    reply({
      error: false,
      message: 'logout successful'
    }).unstate('access_token', COOKIE_CONFIG);
  }
};