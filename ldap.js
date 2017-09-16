const ldap = require('ldapjs');
const client = ldap.createClient({
    url: process.env.LDAP_HOST
});

module.exports = client;