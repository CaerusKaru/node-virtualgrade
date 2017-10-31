import * as Knex from 'knex';

exports.seed = function(knex: Knex, Promise: Promise<any>) {
  return knex('courses').del()
    .then(function () {
      return knex('courses').insert([
        {
          id: 1,
          name: 'COMP 170',
          department_id: 1,
          term_id: 1,
          grading_group: 'grade170',
          instr_group: 'ta170',
          admin_group: 'ta170',
          num_tokens: 3
        },
        {
          id: 2,
          name: 'COMP 00',
          department_id: 1,
          term_id: 1,
          grading_group: 'ta00',
          instr_group: 'ta00',
          admin_group: 'ta00',
          num_tokens: 0
        },
        {
          id: 3,
          name: 'COMP 15',
          department_id: 1,
          term_id: 1,
          grading_group: 'grade15',
          instr_group: 'ta15',
          admin_group: 'ta15',
          num_tokens: 0
        },
        {
          id: 4,
          name: 'COMP 170',
          department_id: 1,
          term_id: 2,
          grading_group: 'grade170',
          instr_group: 'ta170',
          admin_group: 'ta170',
          num_tokens: 0
        },
      ]);
    });
};
