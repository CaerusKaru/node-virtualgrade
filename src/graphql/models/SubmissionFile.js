import bookshelf from '../../../bookshelf';
import SubmissionStep from './SubmissionStep';

export default bookshelf.Model.extend({
    tableName: 'submission_step_files',
    submission_step: function () {
        return this.belongsTo(SubmissionStep);
    }
});