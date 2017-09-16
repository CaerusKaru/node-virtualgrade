
exports.up = function(knex, Promise) {
  return knex.schema
      .createTable('submission_step_files', function (table) {
          table.increments('id').primary();
          table.string('name').notNullable();
          table.integer('submission_step_id').unsigned().notNullable().references('submission_steps.id');
          table.timestamps();
      })
      .createTable('submission_step_exceptions', function (table) {
          table.increments('id').primary();
          table.string('user').notNullable();
          table.string('reason');
          table.timestamp('new_date');
          table.integer('submission_step_id').unsigned().notNullable().references('submission_steps.id');
          table.timestamps();
      })
      .createTable('grading_components', function (table) {
          table.increments('id').primary();
          table.string('name').notNullable();
          table.enum('submission_type', ['student', 'instructor']).notNullable();
          table.float('max_score').notNullable();
          table.boolean('is_extra_credit').notNullable();
          table.timestamps();
      })
      .createTable('grading_component_files', function (table) {
          table.increments('id').primary();
          table.string('name').notNullable();
          table.integer('grading_component_id').unsigned().notNullable().references('grading_components.id');
          table.timestamps();
      })
      .createTable('graders', function (table) {
          table.increments('id').primary();
          table.string('name').notNullable();
          table.timestamps();
      })
      .createTable('grading_components_graders', function (table) {
          table.increments('id').primary();
          table.integer('grading_component_id').unsigned().references('grading_components.id');
          table.integer('grader_id').unsigned().references('graders.id');
          table.timestamps();
      })
};

exports.down = function(knex, Promise) {
    return knex.schema
        .dropTableIfExists('submission_step_files')
        .dropTableIfExists('submission_step_exceptions')
        .dropTableIfExists('grading_components')
        .dropTableIfExists('grading_component_files')
        .dropTableIfExists('grading_components_graders');
};
