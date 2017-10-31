import * as Knex from 'knex';

exports.seed = function(knex: Knex, Promise: Promise<any>) {
  return knex('terms').del()
    .then(function () {
      return knex('terms').insert([
        {id: 1, term: '2017f', current: true},
        {id: 2, term: '2017s', current: false},
        {id: 3, term: '2016f', current: false}
      ]);
    });
};
