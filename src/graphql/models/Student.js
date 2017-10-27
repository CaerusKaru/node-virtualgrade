import bookshelf from '../../../bookshelf';
import {Course} from './Course';

const Student = bookshelf.Model.extend({
  tableName: 'students',
  course: function () {
    return this.belongsTo('Course');
  }
});

const Students = bookshelf.Collection.extend({
  model: Student
});

module.exports = {
  Student: bookshelf.model('Student', Student),
  Students
};