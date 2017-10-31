import {bookshelf} from '../../../bookshelf';
import {SubmissionStep} from './SubmissionStep';

export class SubmissionFile extends bookshelf.Model<SubmissionFile> {

  get tableName() { return 'submission_step_files'; }

  submission_step() { return this.belongsTo(SubmissionStep); }
}