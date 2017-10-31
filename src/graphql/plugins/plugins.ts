import * as good from 'good';
import { graphqlHapi, graphiqlHapi } from 'graphql-server-hapi';

import {OPTIONS} from './options';

const plugins = [
  {
    register: good,
    options: OPTIONS.good
  },
  {
    register: graphqlHapi,
    options: OPTIONS.graphqlHapi
  },
  {
    register: graphiqlHapi,
    options: OPTIONS.graphiqlHapi
  }
];

const whitelist = [good, graphqlHapi, graphiqlHapi];

export function getPlugins() {
  return plugins.filter(plugin => whitelist.indexOf(plugin.register) >= 0);
}