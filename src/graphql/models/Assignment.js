import bookshelf from '../../../bookshelf';
import SubmissionStep from './SubmissionStep';
import {Course} from './Course';
import AssignmentType from './AssignmentType';

const Assignment = bookshelf.Model.extend({
    tableName: 'assignments',
    submission_steps: function () {
        return this.hasMany('SubmissionStep');
    },
    course: function () {
        return this.belongsTo('Course');
    },
    type: function () {
        return this.belongsTo('AssignmentType');
    }
});

const Assignments = bookshelf.Collection.extend({
    model: Assignment
});

module.exports = {
    Assignment: bookshelf.model('Assignment', Assignment),
    Assignments
};