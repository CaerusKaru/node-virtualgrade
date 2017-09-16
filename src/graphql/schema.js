import { makeExecutableSchema } from 'graphql-tools';
import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';

const bookshelf = require('../../bookshelf');

const Assignment = bookshelf.Model.extend({
    tableName: 'assignments',
    submission_steps: function () {
        return this.hasMany(SubmissionStep);
    }
});

const Assignments = bookshelf.Collection.extend({
    model: Assignment
});

const SubmissionStep = bookshelf.Model.extend({
    tableName: 'submission_steps',
    assignment: function () {
        return this.belongsTo(Assignment, 'assignment_id');
    },
    components: function () {
        return this.hasMany(GradingComponent);
    },
    files: function () {
        return this.hasMany(SubmissionFile);
    },
    exceptions: function () {
        return this.hasMany(SubmissionException);
    }
});

const SubmissionFile = bookshelf.Model.extend({
    tableName: 'submission_step_files',
    submission_step: function () {
        return this.belongsTo(SubmissionStep);
    }
});

const SubmissionException = bookshelf.Model.extend({
    tableName: 'submission_step_exceptions',
    submission_step: function () {
        return this.belongsTo(SubmissionStep);
    }
});

const GradingComponent = bookshelf.Model.extend({
    tableName: 'grading_components',
    submission_step: function () {
        return this.belongsTo(SubmissionStep);
    },
    files: function () {
        return this.hasMany(GradingComponentFile);
    },
    graders: function () {
        return this.hasMany(Grader);
    }
});

const GradingComponentFile = bookshelf.Model.extend({
    tableName: 'grading_component_file',
    grading_component: function () {
        return this.belongsTo(GradingComponent);
    }
});

const Grader = bookshelf.Model.extend({
    tableName: 'graders',
    grading_component: function () {
        return this.belongsTo(GradingComponent);
    }
});

const typeDefs = `
	scalar Date
	enum SubmissionType {
	    STUDENT
	    INSTRUCTOR
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
    type Query {
		assignments: [Assignment]
	}
	type Mutation {
	    addAssignment(assignment: AssignmentInput!): Assignment
	}
`;

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