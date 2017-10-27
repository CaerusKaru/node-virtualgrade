
exports.seed = function(knex, Promise) {
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
