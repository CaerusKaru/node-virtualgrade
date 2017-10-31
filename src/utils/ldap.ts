import {client as ldapClient} from '../../ldap';

export function ldapSearch (username) {
  return new Promise(function (resolve, reject) {
    let groups = [];
    const filter = `(&(cn=*)(memberUid=${username}))`;
    ldapClient.search('dc=eecs,dc=tufts,dc=edu', {
      filter,
      attributes: ['cn'],
      scope: 'sub'
    }, function (err, res) {
      res.on('searchEntry', function (entry) {
        groups.push(entry.object.cn);
      });
      res.on('end', function (result) {
        resolve({
          username,
          groups
        });
      });
    });
  });
}