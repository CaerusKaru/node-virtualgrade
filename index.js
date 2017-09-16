/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _plugins = __webpack_require__(2);

var _plugins2 = _interopRequireDefault(_plugins);

var _routes = __webpack_require__(13);

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hapi = __webpack_require__(18);
var hapiJwt = __webpack_require__(19);
var server = new hapi.Server();

server.connection({
    host: 'localhost',
    port: 8000
});

server.register(hapiJwt, function (err) {
    server.auth.strategy('token', 'jwt-cookie', {
        key: process.env.JWT_SECRET,
        verifyOptions: {
            algorithms: ['HS256']
        }
    });
    server.register((0, _plugins2.default)(), function (err) {
        if (err) {
            throw err;
        }
        server.route(_routes2.default);
        server.start(function (err) {
            if (err) {
                throw err;
            }
            console.log('Server running at: ' + server.info.uri);
        });
    });
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _good = __webpack_require__(3);

var _good2 = _interopRequireDefault(_good);

var _graphqlServerHapi = __webpack_require__(4);

var _options = __webpack_require__(5);

var _options2 = _interopRequireDefault(_options);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var plugins = [{
    register: _good2.default,
    options: _options2.default.good
}, {
    register: _graphqlServerHapi.graphqlHapi,
    options: _options2.default.graphqlHapi
}, {
    register: _graphqlServerHapi.graphiqlHapi,
    options: _options2.default.graphiqlHapi
}];

var whitelist = [_good2.default, _graphqlServerHapi.graphqlHapi, _graphqlServerHapi.graphiqlHapi];

exports.default = function () {
    return plugins.filter(function (plugin) {
        return whitelist.indexOf(plugin.register) >= 0;
    });
};

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("good");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("graphql-server-hapi");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _schema = __webpack_require__(6);

var _schema2 = _interopRequireDefault(_schema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    good: {
        reporters: {
            myConsoleReporter: [{
                module: 'good-squeeze',
                name: 'Squeeze',
                args: [{ response: '*' }]
            }, {
                module: 'good-console'
            }, 'stdout']
        }
    },
    graphqlHapi: {
        path: '/graphql',
        graphqlOptions: function graphqlOptions(request) {
            return {
                schema: _schema2.default,
                debug: true,
                context: request.auth.credentials
            };
        },
        route: {
            auth: 'token'
        }
    },
    graphiqlHapi: {
        path: '/graphiql',
        graphiqlOptions: { endpointURL: '/graphql' }
    }
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _graphqlTools = __webpack_require__(7);

var _graphql = __webpack_require__(8);

var _language = __webpack_require__(9);

var bookshelf = __webpack_require__(20);

var Assignment = bookshelf.Model.extend({
    tableName: 'assignments',
    submission_steps: function submission_steps() {
        return this.hasMany(SubmissionStep);
    }
});

var Assignments = bookshelf.Collection.extend({
    model: Assignment
});

var SubmissionStep = bookshelf.Model.extend({
    tableName: 'submission_steps',
    assignment: function assignment() {
        return this.belongsTo(Assignment, 'assignment_id');
    },
    components: function components() {
        return this.hasMany(GradingComponent);
    },
    files: function files() {
        return this.hasMany(SubmissionFile);
    },
    exceptions: function exceptions() {
        return this.hasMany(SubmissionException);
    }
});

var SubmissionFile = bookshelf.Model.extend({
    tableName: 'submission_step_files',
    submission_step: function submission_step() {
        return this.belongsTo(SubmissionStep);
    }
});

var SubmissionException = bookshelf.Model.extend({
    tableName: 'submission_step_exceptions',
    submission_step: function submission_step() {
        return this.belongsTo(SubmissionStep);
    }
});

var GradingComponent = bookshelf.Model.extend({
    tableName: 'grading_components',
    submission_step: function submission_step() {
        return this.belongsTo(SubmissionStep);
    },
    files: function files() {
        return this.hasMany(GradingComponentFile);
    },
    graders: function graders() {
        return this.hasMany(Grader);
    }
});

var GradingComponentFile = bookshelf.Model.extend({
    tableName: 'grading_component_file',
    grading_component: function grading_component() {
        return this.belongsTo(GradingComponent);
    }
});

var Grader = bookshelf.Model.extend({
    tableName: 'graders',
    grading_component: function grading_component() {
        return this.belongsTo(GradingComponent);
    }
});

var typeDefs = '\n\tscalar Date\n\tenum SubmissionType {\n\t    STUDENT\n\t    INSTRUCTOR\n\t}\n\ttype Grader {\n\t\tid: ID!\n\t\tname: String!\n\t}\n\ttype SubmissionException {\n\t    id: ID!\n\t    user: String!\n        date: Date!\n        reason: String\n\t}\n\ttype GradingComponent {\n\t    id: ID!\n        name: String!\n        files: [String!]!\n        graders: [Grader!]\n        submission_type: SubmissionType\n        max_score: Float!\n        is_extra_credit: Boolean!\n\t}\n\tinput GradingComponentInput {\n\t    name: String!\n        files: [String!]!\n        grader_ids: [Int!]\n        submission_type: SubmissionType\n        max_score: Float!\n        is_extra_credit: Boolean!\n\t}\n\tinput SubmissionExceptionInput {\n\t    user: String!\n        date: Date!\n        reason: String\n\t}\n\tinput SubmissionStepInput {\n\t    name: String!\n        start_date: Date!\n        end_date: Date!\n        components: [GradingComponentInput!]!\n        files: [String!]!\n        allow_other_files: Boolean!\n        exceptions: [SubmissionExceptionInput!]\n\t}\n\ttype SubmissionStep {\n\t    id: ID!\n        name: String!\n        start_date: Date!\n        end_date: Date!\n        components: [GradingComponent!]!\n        files: [String!]!\n        allow_other_files: Boolean!\n        exceptions: [SubmissionException!]\n\t}\n\tinput AssignmentInput {\n\t    name: String!\n\t    description: String\n\t    steps: [SubmissionStepInput]\n\t}\n\ttype Assignment {\n\t    id: ID!\n        name: String!\n        description: String\n        submission_steps: [SubmissionStep!]!\n    }\n    type Query {\n\t\tassignments: [Assignment]\n\t}\n\ttype Mutation {\n\t    addAssignment(assignment: AssignmentInput!): Assignment\n\t}\n';

var resolvers = {
    Date: new _graphql.GraphQLScalarType({
        name: 'Date',
        description: 'Date custom scalar type',
        parseValue: function parseValue(value) {
            return new Date(value); // value from the client
        },
        serialize: function serialize(value) {
            return value.getTime(); // value sent to the client
        },
        parseLiteral: function parseLiteral(ast) {
            if (ast.kind === _language.Kind.INT) {
                return parseInt(ast.value, 10); // ast value is always in string format
            }
            return null;
        }
    }),
    Query: {
        assignments: function assignments(obj, args, context, info) {
            console.log(context);
            return Assignments.forge().fetch({
                withRelated: ['submission_steps']
            }).then(function (a) {
                return a.toJSON();
            });
        }
    },
    Mutation: {
        addAssignment: function addAssignment(root, _ref) {
            var assignment = _ref.assignment;

            console.log(assignment);
            Assignment.forge(assignment).save()
            // .tap(assignment => Promise.map(assignment.steps, step => assignment.related('submission_steps').create(step)))
            .then(function (assignment) {
                return assignment;
            });
        }
    }
};

exports.default = (0, _graphqlTools.makeExecutableSchema)({
    typeDefs: typeDefs,
    resolvers: resolvers
});

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("graphql-tools");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("graphql");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("graphql/language");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("knex");

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
    migrations: { tableName: 'knex_migrations' },
    client: 'mysql',
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        charset: 'utf8'
    },
    useNullAsDefault: true
};

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("bookshelf");

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jsonwebtoken = __webpack_require__(14);

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _ldapSerialize = __webpack_require__(15);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ldapClient = __webpack_require__(16);
exports.default = [{
    method: 'GET',
    path: '/',
    handler: function handler(request, reply) {
        reply('API online' + ' ' + JSON.stringify(request.auth.credentials));
    },
    config: {
        auth: 'token'
    }
}, {
    method: 'POST',
    path: '/login',
    handler: function handler(req, reply) {
        var _req$payload = req.payload,
            username = _req$payload.username,
            password = _req$payload.password;

        var escapeUn = (0, _ldapSerialize.escapeDN)(username);
        // TODO: move the following string into a config file
        ldapClient.bind('uid=' + escapeUn + ',ou=People,dc=eecs,dc=tufts,dc=edu', password, function (err) {
            if (err) {
                reply({
                    error: true,
                    errMessage: 'incorrect username/password'
                }).code(401);
            } else {
                var groups = [];
                var user = (0, _ldapSerialize.escapeLDAPSearchFilter)(username);
                var filter = '(&(cn=*)(memberUid=' + user + '))';
                ldapClient.search('dc=eecs,dc=tufts,dc=edu', {
                    filter: filter,
                    attributes: ['cn'],
                    scope: 'sub'
                }, function (err, res) {
                    res.on('searchEntry', function (entry) {
                        groups.push(entry.object.cn);
                    });
                    res.on('end', function (result) {
                        var token = _jsonwebtoken2.default.sign({
                            username: username,
                            groups: groups
                        }, process.env.JWT_SECRET, {
                            algorithm: 'HS256',
                            expiresIn: '1h'
                        });
                        reply('login successful').state('access_token', token);
                    });
                });
            }
        });
    }
}];

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// LDAP escape functions courtesy of https://blogs.oracle.com/shankar/entry/what_is_ldap_injection
module.exports = {
    escapeDN: function escapeDN(name) {
        var newString = '';
        if (name.length > 0 && (name.charAt(0) === ' ' || name.charAt(0) === '#')) {
            newString.append('\\\\'); // add the leading backslash if needed
        }
        for (var i = 0; i < name.length; i++) {
            var curChar = name.charAt(i);
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
        if (name.length > 1 && name.charAt(name.length - 1) === ' ') {
            newString += '\\\\'; // add the trailing backslash if needed
        }
        return String(newString);
    },
    escapeLDAPSearchFilter: function escapeLDAPSearchFilter(filter) {
        var newString = '';
        for (var i = 0; i < filter.length; i++) {
            var curChar = filter.charAt(i);
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
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ldap = __webpack_require__(17);
var client = ldap.createClient({
    url: process.env.LDAP_HOST
});

module.exports = client;

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("ldapjs");

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("hapi");

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("hapi-auth-cookie-jwt");

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var knex = __webpack_require__(10)(__webpack_require__(11));
var bookshelf = __webpack_require__(12)(knex);

module.exports = bookshelf;

/***/ })
/******/ ]);