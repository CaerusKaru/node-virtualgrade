import * as ldap from 'ldapjs';

export const client = ldap.createClient({
  url: process.env.LDAP_HOST
});