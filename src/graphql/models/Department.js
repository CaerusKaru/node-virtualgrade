import bookshelf from '../../../bookshelf';
import {Course} from './Course';

const Department = bookshelf.Model.extend({
    tableName: 'departments',
    courses: function () {
        return this.hasMany('Course');
    }
});

const Departments = bookshelf.Collection.extend({
    model: Department
});

module.exports = {
    Department: bookshelf.model('Department', Department),
    Departments
};