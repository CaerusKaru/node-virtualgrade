
exports.up = function(knex, Promise) {
  return knex.schema.table('submission_steps', function (table) {
      table.boolean('allow_other_files').notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('submission_steps', function (table) {
      table.dropColumn('allow_other_files');
  })
};
