import {bookshelf} from '../../../bookshelf';
import {Assignment} from './Assignment';
import {Term} from './Term';
import {Student} from './Student';

export class Course extends bookshelf.Model<Course> {

  get tableName() { return 'courses'; }

  assignments() { return this.hasMany(Assignment); }

  term() { return this.belongsTo(Term); }

  students() { return this.hasMany(Student); }
}

export class Courses extends bookshelf.Collection<Course> { }
