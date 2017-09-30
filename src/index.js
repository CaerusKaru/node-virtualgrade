const hapi = require('hapi');
const hapiJwt = require('hapi-auth-cookie-jwt');
const server = new hapi.Server();

import plugins from './graphql/plugins';
import routes from './graphql/routes';

server.connection({
    port: 4000,
    routes: {
        cors: {
            origin: ['http://localhost:4200'],
            credentials: true
        }
    }
});

server.register(hapiJwt, (err) => {
    server.auth.strategy('token', 'jwt-cookie', {
        key: process.env.JWT_SECRET,
        verifyOptions: {
            algorithms: [ 'HS256' ],
        }
    });
    server.register(plugins(), err => {
        if (err) {
            throw err;
        }
        server.route(routes);
        server.start((err) => {
            if (err) {
                throw err;
            }
            console.log(`Server running at: ${server.info.uri}`);
        });
    });
});
