import * as jwt from 'jsonwebtoken';
import {ResponseToolkit} from 'hapi';

import {client as ldapClient} from '../../ldap';
import {COOKIE_CONFIG} from './cookie-config';
import {escapeDN, escapeLDAPSearchFilter} from '../utils/ldap-serialize';


export const LOGIN_ROUTE = {
  method: 'POST',
  path: '/login',
  options: {
    auth: false,
  },
  handler: async (req, h: ResponseToolkit) => {
    const { username, password } = req.payload;
    const escapeUn = escapeDN(username);
    // TODO: move the following string into a config file
    return new Promise(resolve => {
      ldapClient.bindAsync(`uid=${escapeUn},ou=People,dc=eecs,dc=tufts,dc=edu`, password)
        .then(async () => {
          let groups = [];
          const user = escapeLDAPSearchFilter(username);
          const filter = `(&(cn=*)(memberUid=${user}))`;
          const res = await ldapClient.searchAsync('dc=eecs,dc=tufts,dc=edu', {
            filter,
            attributes: ['cn'],
            scope: 'sub'
          });
          res.on('searchEntry', function (entry) {
            groups.push(entry.object.cn);
          });
          res.on('end', function () {
            const token = jwt.sign({
              username,
              groups
            }, process.env.JWT_SECRET, {
              algorithm: 'HS256',
              expiresIn: '7d',
            });
            resolve(h.response({'message': 'login successful'})
              .state('access_token', token, COOKIE_CONFIG));
          });
        })
        .catch(err => {
          resolve(h.response({'message': 'incorrect username/password'})
            .code(401));
        });
    });
  }
};