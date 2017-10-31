import * as Knex from 'knex';

exports.seed = function(knex: Knex, Promise: Promise<any>) {
  // Deletes ALL existing entries
  return knex('assignment_types').del()
    .then(function () {
      // Inserts seed entries
      return knex('assignment_types').insert([
        {id: 1, type: 'instructor'},
        {id: 2, type: 'student'}
      ]);
    });
};
