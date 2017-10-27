
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('assignments').del()
    .then(function () {
      // Inserts seed entries
      return knex('assignments').insert([
        {
          id: 1,
          name: 'hw1',
          description: null,
          assignment_type_id: 2,
          course_id: 1
        },
        {
          id: 2,
          name: 'hw2',
          description: null,
          assignment_type_id: 2,
          course_id: 1
        },
        {
          id: 3,
          name: 'hw1',
          description: null,
          assignment_type_id: 2,
          course_id: 2
        },
      ]);
    });
};
