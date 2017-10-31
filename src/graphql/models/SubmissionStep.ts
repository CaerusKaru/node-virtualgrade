import {bookshelf} from '../../../bookshelf';
import {Assignment} from './Assignment';
import {SubmissionFile} from './SubmissionFile';

export class SubmissionStep extends bookshelf.Model<SubmissionStep> {

  get tableName() { return 'submission_steps'; }

  assignment() { return this.belongsTo(Assignment); }

  files() { return this.hasMany(SubmissionFile); }
}