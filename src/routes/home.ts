export const HOME_ROUTE = {
  method: 'GET',
  path: '/',
  handler: (request, h) => {
    return h.response({message: 'API online' + ' ' + JSON.stringify(request.auth.credentials)});
  },
  config: {
    auth: 'token'
  },
};