import {RouteConfiguration} from 'hapi';

export const HOME_ROUTE: RouteConfiguration = {
  method: 'GET',
  path: '/',
  handler: (request, reply) => {
    reply({message: 'API online' + ' ' + JSON.stringify(request.auth.credentials)});
  },
  config: {
    auth: 'token'
  },
};