import {SCHEMA} from '../schema';

export const OPTIONS = {
  good: {
    reporters: {
      myConsoleReporter: [
        {
          module: 'good-squeeze',
          name: 'Squeeze',
          args: [{ response: '*' }]
        },
        {
          module: 'good-console'
        },
        'stdout'
      ]
    }
  },
  graphqlHapi: {
    path: '/graphql',
    graphqlOptions: (request) => {
      return {
        schema: SCHEMA,
        debug: true,
        context: request.auth.credentials
      };
    },
    route: {
      auth: 'token'
    }
  },
  graphiqlHapi: {
    path: '/graphiql',
    graphiqlOptions: { endpointURL: '/graphql' }
  }
};