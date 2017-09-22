import bookshelf from '../../../bookshelf';
import { Assignment } from './Assignment';
import SubmissionFile from './SubmissionFile';
import SubmissionException from './SubmissionException';
import GradingComponent from './GradingComponent';

export default bookshelf.Model.extend({
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