import bookshelf from '../../../bookshelf';
import {Course} from './Course';

const Term = bookshelf.Model.extend({
    tableName: 'terms',
    courses: function () {
        return this.hasMany('Course');
    }
});

const Terms = bookshelf.Collection.extend({
    model: Term
});

module.exports = {
    Term: bookshelf.model('Term', Term),
    Terms
};