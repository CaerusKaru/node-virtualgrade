import {bookshelf} from '../../../bookshelf';
import {Course} from './Course';

export class Department extends bookshelf.Model<Department> {

  get tableName() { return 'departments'; }

  courses() { return this.hasMany(Course); }
}

export class Departments extends bookshelf.Collection<Department> { }
