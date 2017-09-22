import bookshelf from '../../../bookshelf';
import GradingComponent from './GradingComponent';

export default bookshelf.Model.extend({
    tableName: 'grading_component_file',
    grading_component: function () {
        return this.belongsTo(GradingComponent);
    }
});