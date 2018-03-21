import {client as ldapClient} from '../../ldap';
import * as jwt from 'jsonwebtoken';
import {COOKIE_CONFIG} from './cookie-config';
import {escapeDN, escapeLDAPSearchFilter} from '../utils/ldap-serialize';

export const LOGIN_ROUTE = {
  method: 'POST',
  path: '/login',
  handler: (req, reply) => {
    const { username, password } = req.payload;
    const escapeUn = escapeDN(username);
    // TODO: move the following string into a config file
    ldapClient.bind(`uid=${escapeUn},ou=People,dc=eecs,dc=tufts,dc=edu`, password, function (err) {
      if (err) {
        reply({
          error: true,
          errMessage: 'incorrect username/password',
        }).code(401);
      } else {
        let groups = [];
        const user = escapeLDAPSearchFilter(username);
        const filter = `(&(cn=*)(memberUid=${user}))`;
        ldapClient.search('dc=eecs,dc=tufts,dc=edu', {
          filter,
          attributes: ['cn'],
          scope: 'sub'
        }, function (err, res) {
          res.on('searchEntry', function (entry) {
            groups.push(entry.object.cn);
          });
          res.on('end', function (result) {
            const token = jwt.sign({
              username,
              groups
            }, process.env.JWT_SECRET, {
              algorithm: 'HS256',
              expiresIn: '7d',
            });
            reply({
              error: false,
              message: 'login successful'
            }).state('access_token', token, COOKIE_CONFIG);
          });
        });
      }
    });
  }
};