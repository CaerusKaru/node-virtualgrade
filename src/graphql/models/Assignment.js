import bookshelf from '../../../bookshelf';
import SubmissionStep from './SubmissionStep';

const Assignment = bookshelf.Model.extend({
    tableName: 'assignments',
    submission_steps: function () {
        return this.hasMany(SubmissionStep);
    }
});

const Assignments = bookshelf.Collection.extend({
    model: Assignment
});

module.exports = {
    Assignment,
    Assignments
};