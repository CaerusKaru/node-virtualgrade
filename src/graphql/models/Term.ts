import {bookshelf} from '../../../bookshelf';
import {Course} from './Course';

export class Term extends bookshelf.Model<Term> {

  get tableName() { return 'terms'; }

  courses() { return this.hasMany(Course); }
}

export class Terms extends bookshelf.Collection<Term> { }
