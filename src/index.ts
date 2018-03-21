import * as hapi from 'hapi';
import * as hapiJwt from 'hapi-auth-cookie-jwt';
import {getPlugins} from './graphql/plugins';
import {ROUTES} from './routes';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import {SCHEMA as schema} from './graphql/schema';

export const server = new hapi.Server({
  host: 'localhost',
  port: 4000,
  routes: {
    cors: {
      origin: ['http://localhost:4200'],
      credentials: true
    }
  },
  debug: { request: ['error'] } // TODO: REMOVE IN PRODUCTION
});
const plugins = getPlugins();

const startup = (async () => {
  try {
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
  } catch (err) {
    console.log(err);
  }
});

(async () => {
  await server.register({
    plugin: hapiJwt
  });

  await server.register({
    plugin: require('hapi-compat'),
    options: {
      server
    }
  });

  server.auth.strategy('token', 'jwt-cookie', {
    key: process.env.JWT_SECRET,
    verifyOptions: {
      algorithms: [ 'HS256' ],
    }
  });
  server.auth.default({
    mode: 'required',
    strategy: 'token'
  });

  await server.register(plugins);

  server.route(ROUTES);

  await startup();
})();

const subscriptionServer = SubscriptionServer.create(
  {
    execute,
    subscribe,
    schema
  },
  {
    server: server.listener,
    path: '/subscriptions',
  }
);