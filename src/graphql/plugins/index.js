import good from 'good';
import { graphqlHapi, graphiqlHapi } from 'graphql-server-hapi';

import options from './options';

const plugins = [
    {
        register: good,
        options: options.good
    },
    {
        register: graphqlHapi,
        options: options.graphqlHapi
    },
    {
        register: graphiqlHapi,
        options: options.graphiqlHapi
    }
];

const whitelist = [good, graphqlHapi, graphiqlHapi];

export default () => {
    return plugins.filter(plugin => whitelist.indexOf(plugin.register) >= 0);
};