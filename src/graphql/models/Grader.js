import bookshelf from '../../../bookshelf';
import GradingComponent from './GradingComponent';

export default bookshelf.Model.extend({
    tableName: 'graders',
    grading_component: function () {
        return this.belongsTo(GradingComponent);
    }
});