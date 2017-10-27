import bookshelf from '../../../bookshelf';
import {Assignment} from './Assignment';
import {Term} from './Term';
import {Student} from './Student';

const Course = bookshelf.Model.extend({
  tableName: 'courses',
  assignments: function () {
    return this.hasMany('Assignment');
  },
  term: function () {
    return this.belongsTo('Term');
  },
  students: function () {
    return this.hasMany('Student');
  }
});

const Courses = bookshelf.Collection.extend({
  model: Course
});

module.exports = {
  Course: bookshelf.model('Course', Course),
  Courses
};