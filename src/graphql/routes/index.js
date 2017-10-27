const ldapClient = require('../../../ldap');
import jwt from 'jsonwebtoken';
import {escapeDN, escapeLDAPSearchFilter} from './ldap-serialize';
import uploadRoute from './upload';

const cookieConfig = {
    isSecure: !process.env.NODE_ENV,
    isSameSite: process.env.NODE_ENV ? false : 'Strict',
    path: '/'
};

export default [
    uploadRoute,
    {
        method: 'GET',
        path: '/',
        handler: (request, reply) => {
            reply({message: 'API online' + ' ' + JSON.stringify(request.auth.credentials)});
        },
        config: {
            auth: 'token'
        },
    },
    {
        method: 'POST',
        path: '/logout',
        handler: (req, reply) => {
            reply({
                error: false,
                message: 'logout successful'
            }).unstate('access_token', cookieConfig);
        }
    },
    {
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
                            }).state('access_token', token, cookieConfig);
                        });
                    });
                }
            });
        }
    }
];
