import * as ldap from 'ldapjs';
const Promise = require('bluebird');

export const client = ldap.createClient({
  url: process.env.LDAP_HOST
});

Promise.promisifyAll(client);