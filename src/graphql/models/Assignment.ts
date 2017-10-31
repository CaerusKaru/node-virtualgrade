import {SubmissionStep} from './SubmissionStep';
import {Course} from './Course';
import {AssignmentType} from './AssignmentType';
import {bookshelf} from '../../../bookshelf';

export class Assignment extends bookshelf.Model<Assignment> {

  get tableName() { return 'assignments'; }

  submission_steps() { return this.hasMany(SubmissionStep); }

  course() { return this.belongsTo(Course); }

  type() { return this.belongsTo(AssignmentType); }
}

export class Assignments extends bookshelf.Collection<Assignment> { }