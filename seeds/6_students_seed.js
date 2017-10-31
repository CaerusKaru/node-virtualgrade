
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {
          id: 1,
          username: 'ap',
          num_tokens: 3,
          course_id: 1
        },
      ]);
    });
};
