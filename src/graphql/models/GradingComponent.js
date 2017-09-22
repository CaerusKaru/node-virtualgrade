import bookshelf from '../../../bookshelf';
import SubmissionStep from './SubmissionStep';
import GradingComponentFile from './GradingComponentFile';
import Grader from './Grader';

export default bookshelf.Model.extend({
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