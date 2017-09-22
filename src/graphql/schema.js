import { makeExecutableSchema } from 'graphql-tools';
import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
import { Assignment, Assignments } from './models/Assignment';
const ldapClient = require('../../ldap');

const typeDefs = `
	scalar Date
	enum SubmissionType {
	    STUDENT
	    INSTRUCTOR
	}
	enum Permission {
	    CREATE
	    READ
	    UPDATE
	    DELETE
	}
	type Grader {
		id: ID!
		name: String!
	}
	type SubmissionException {
	    id: ID!
	    user: String!
        date: Date!
        reason: String
	}
	type GradingComponent {
	    id: ID!
        name: String!
        files: [String!]!
        graders: [Grader!]
        submission_type: SubmissionType
        max_score: Float!
        is_extra_credit: Boolean!
	}
	input GradingComponentInput {
	    name: String!
        files: [String!]!
        grader_ids: [Int!]
        submission_type: SubmissionType
        max_score: Float!
        is_extra_credit: Boolean!
	}
	input SubmissionExceptionInput {
	    user: String!
        date: Date!
        reason: String
	}
	input SubmissionStepInput {
	    name: String!
        start_date: Date!
        end_date: Date!
        components: [GradingComponentInput!]!
        files: [String!]!
        allow_other_files: Boolean!
        exceptions: [SubmissionExceptionInput!]
	}
	type SubmissionStep {
	    id: ID!
        name: String!
        start_date: Date!
        end_date: Date!
        components: [GradingComponent!]!
        files: [String!]!
        allow_other_files: Boolean!
        exceptions: [SubmissionException!]
	}
	input AssignmentInput {
	    name: String!
	    description: String
	    steps: [SubmissionStepInput]
	}
	type Assignment {
	    id: ID!
        name: String!
        description: String
        submission_steps: [SubmissionStep!]!
    }
    type Course {
        id: ID!
        name: String
        assigns: [String]
        term: String
    }
    type Department {
        id: ID!
        name: String
        courses: [Course]
        privileges: [Permission]
    }
    type Manage {
        departments: [Department]
        privileges: [Permission]
    }
    type User {
        id: ID
        username: String!
        groups: [String!]
        term: String
        admin: [Course]
        grading: [Course]
        manage: Manage
        courses: [Course]
    }
    type Query {
		assignments: [Assignment],
		user: User
	}
	type Mutation {
	    addAssignment(assignment: AssignmentInput!): Assignment
	}
`;

function ldapSearch (username) {
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

const grading = [
    {
        "id": 1,
        "name": "COMP105",
        "assigns": ["hw1", "hw2"],
        "term": "2017u"
    },
    {
        "id": 2,
        "name": "COMP20",
        "assigns": ["hw1", "hw2"],
        "term": "2017u"
    },
    {
        "id": 3,
        "name": "COMP00",
        "assigns": ["hw1", "hw2"],
        "term": "2017u"
    }
];

const admin = [
    {
        "id": 2,
        "name": "COMP20",
        "assigns": ["hw1", "hw2"],
        "term": "2017u"
    },
    {
        "id": 3,
        "name": "COMP00",
        "assigns": ["hw1", "hw2"],
        "term": "2017u"
    }
];

const courses = [
    {
        "id": 4,
        "name": "COMP11",
        "assigns": ["hw1", "hw2"],
        "term": "2017u"
    },
    {
        "id": 5,
        "name": "COMP15",
        "assigns": ["hw1", "hw2"],
        "term": "2017u"
    },
    {
        "id": 6,
        "name": "COMP40",
        "assigns": ["Final", "Midterm"],
        "term": "2015s"
    }
];

const manage = {
    "departments": [
        {
            "id": 1,
            "name": "COMP",
            "courses": [
                {
                    "id": 5,
                    "name": "COMP15",
                    "assigns": ["hw1", "hw2"],
                    "term": "2017u"
                },
                {
                    "id": 2,
                    "name": "COMP20",
                    "assigns": ["hw1", "hw2"],
                    "term": "2017u"
                }
            ],
            "privileges": ["CREATE", "READ", "UPDATE", "DELETE"]
        },
        {
            "id": 2,
            "name": "MATH",
            "courses": [
                {
                    "id": 7,
                    "name": "MATH71",
                    "assigns": ["ps1"],
                    "term": "2017u"
                },
                {
                    "id": 8,
                    "name": "MATH61",
                    "assigns": ["star1"],
                    "term": "2017s"
                }
            ],
            "privileges": ["CREATE", "READ", "UPDATE", "DELETE"]
        }
    ],
    "privileges": ["CREATE", "READ", "UPDATE", "DELETE"]
};

const term = "2017u";

const resolvers = {
    Date: new GraphQLScalarType({
        name: 'Date',
        description: 'Date custom scalar type',
        parseValue(value) {
            return new Date(value); // value from the client
        },
        serialize(value) {
            return value.getTime(); // value sent to the client
        },
        parseLiteral(ast) {
            if (ast.kind === Kind.INT) {
                return parseInt(ast.value, 10); // ast value is always in string format
            }
            return null;
        },
    }),
    Query: {
        assignments: (obj, args, context, info) => {
            console.log(context);
            return Assignments.forge().fetch({
                withRelated: ['submission_steps']
            }).then(function (a) {
                return a.toJSON();
            });
        },
        user: (obj, args, context, info) => {
            return ldapSearch(context.username).then(function (data) {
                return {
                    username: data.username,
                    groups: data.groups,
                    grading,
                    admin,
                    courses,
                    manage,
                    term
                }
            });
        }
    },
    Mutation: {
        addAssignment: (root, {assignment}) => {
            console.log(assignment);
            Assignment
                .forge(assignment)
                .save()
                // .tap(assignment => Promise.map(assignment.steps, step => assignment.related('submission_steps').create(step)))
                .then(assignment => assignment);
        }
    }
};

export default makeExecutableSchema({
    typeDefs,
    resolvers
});