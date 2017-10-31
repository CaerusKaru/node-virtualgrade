import {bookshelf} from '../../../bookshelf';
import {Course} from './Course';

export class Student extends bookshelf.Model<Student> {

  get tableName() { return 'students' }

  course() { return this.belongsTo(Course); }
}

export class Students extends bookshelf.Collection<Student> { }
