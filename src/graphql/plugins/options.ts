import {SCHEMA as schema} from '../schema';

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
        schema,
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
    graphiqlOptions: {
      endpointURL: '/graphql',
      subscriptionsEndpoint: `ws://localhost:4000/subscriptions`
    }
  }
};