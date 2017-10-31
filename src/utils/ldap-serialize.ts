// LDAP escape functions courtesy of https://blogs.oracle.com/shankar/entry/what_is_ldap_injection
export function escapeDN(name) {
  let newString = '';
  if ((name.length > 0) && ((name.charAt(0) === ' ') || (name.charAt(0) === '#'))) {
    newString += '\\\\'; // add the leading backslash if needed
  }
  for (let i = 0; i < name.length; i++) {
    let curChar = name.charAt(i);
    switch (curChar) {
      case '\\\\':
        newString += '\\\\\\\\';
        break;
      case ',':
        newString += '\\\\,';
        break;
      case '+':
        newString += '\\\\+';
        break;
      case '"':
        newString += '\\\\\\"';
        break;
      case '<':
        newString += '\\\\<';
        break;
      case '>':
        newString += '\\\\>';
        break;
      case ';':
        newString += '\\\\;';
        break;
      default:
        newString += curChar;
    }
  }
  if ((name.length > 1) && (name.charAt(name.length - 1) === ' ')) {
    newString += '\\\\'; // add the trailing backslash if needed
  }
  return String(newString);
}

export function escapeLDAPSearchFilter(filter) {
  let newString = '';
  for (let i = 0; i < filter.length; i++) {
    let curChar = filter.charAt(i);
    switch (curChar) {
      case '\\\\':
        newString += '\\\\5c';
        break;
      case '\*':
        newString += '\\\\2a';
        break;
      case '(':
        newString += '\\\\28';
        break;
      case ')':
        newString += '\\\\29';
        break;
      case '\\u0000':
        newString += '\\\\00';
        break;
      default:
        newString += curChar;
    }
  }
  return String(newString);
}