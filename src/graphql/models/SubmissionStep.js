import bookshelf from '../../../bookshelf';
import { Assignment } from './Assignment';
import SubmissionFile from './SubmissionFile';

export default bookshelf.model('SubmissionStep', {
    tableName: 'submission_steps',
    assignment: function () {
        return this.belongsTo('Assignment');
    },
    files: function () {
        return this.hasMany('SubmissionFile');
    },
});