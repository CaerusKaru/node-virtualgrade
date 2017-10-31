import * as Knex from 'knex';
import * as _bookshelf from 'bookshelf';
const knexInstance: Knex = Knex(require('./knexfile'));

const bookshelfInstance = _bookshelf(knexInstance);
bookshelfInstance.plugin('registry');

export const bookshelf = bookshelfInstance;
