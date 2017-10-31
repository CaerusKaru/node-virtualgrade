import {bookshelf} from '../../../bookshelf';
import {Assignment} from './Assignment';

export class AssignmentType extends bookshelf.Model<AssignmentType> {

  get tableName() { return 'assignment_types'; }

  assignments() { return this.hasMany(Assignment); }
}