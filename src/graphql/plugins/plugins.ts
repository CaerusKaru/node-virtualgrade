import * as good from 'good';
import { graphqlHapi, graphiqlHapi } from 'graphql-server-hapi';

import {OPTIONS} from './options';

const plugins = [
  {
    plugin: good,
    options: OPTIONS.good
  },
  {
    plugin: graphqlHapi,
    options: OPTIONS.graphqlHapi
  },
  {
    plugin: graphiqlHapi,
    options: OPTIONS.graphiqlHapi
  }
];

const whitelist = [good, graphqlHapi, graphiqlHapi];

export function getPlugins() {
  return plugins.filter(plugin => whitelist.indexOf(plugin.plugin) >= 0);
}