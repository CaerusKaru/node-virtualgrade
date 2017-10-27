import bookshelf from '../../../bookshelf';
import {Assignment} from './Assignment';

export default bookshelf.model('AssignmentType', {
    tableName: 'assignment_types',
    assignments: function () {
        return this.hasMany('Assignment');
    }
});