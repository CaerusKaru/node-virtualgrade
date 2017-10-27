
exports.up = function(knex, Promise) {
  return knex.schema
    .createTableIfNotExists('terms', function (table) {
      table.increments('id').primary();
      table.string('term').notNullable();
      table.boolean('current').defaultTo(false);
      table.timestamps(true, true);
    })
    .createTableIfNotExists('departments', function (table) {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('manage_group', 128);
      table.timestamps(true, true);
    })
    .createTableIfNotExists('courses', function (table) {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.integer('department_id').unsigned().notNullable().references('departments.id');
      table.integer('term_id').unsigned().notNullable().references('terms.id');
      table.string('grading_group', 128);
      table.string('instr_group', 128);
      table.string('admin_group', 128);
      table.timestamps(true, true);
    })
    .createTableIfNotExists('students', function (table) {
      table.increments('id').primary();
      table.string('username');
      table.integer('course_id').unsigned().notNullable().references('courses.id');
      table.timestamps(true, true);
    })
    .createTableIfNotExists('assignment_types', function (table) {
      table.increments('id').primary();
      table.string('type');
      table.timestamps(true, true);
    })
    .createTableIfNotExists('assignments', function (table) {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('description', 128);
      table.integer('assignment_type_id').unsigned().notNullable().references('assignment_types.id');
      table.integer('course_id').unsigned().notNullable().references('courses.id');
      table.timestamps(true, true);
    })
    .createTableIfNotExists('submission_steps', function (table) {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.integer('assignment_id').unsigned().notNullable().references('assignments.id');
      table.boolean('allow_other_files').defaultTo(false);
      table.boolean('allow_group_subs').defaultTo(false);
      table.boolean('allow_late_subs').defaultTo(false);
      table.integer('late_penalty').defaultTo(0);
      table.integer('late_interval').defaultTo(0);
      table.integer('max_tokens').defaultTo(0);
      table.integer('max_group_size').defaultTo(0);
      table.timestamp('start_date').notNullable().defaultTo(knex.fn.now());
      table.timestamp('end_date').notNullable().defaultTo(knex.fn.now());
      table.timestamp('max_late_date');
      table.timestamps(true, true);
    })
    .createTableIfNotExists('submission_step_files', function (table) {
      table.increments('id').primary();
      table.integer('submission_step_id').unsigned().notNullable().references('submission_steps.id');
      table.string('filename', 128).notNullable();
      table.timestamps(true, true);
    })
    .createTableIfNotExists('submissions', function (table) {
      table.increments('id').primary();
      table.integer('submission_step_id').unsigned().notNullable().references('submission_steps.id');
      table.string('submission_path').notNullable();
      table.integer('submission_number').unsigned().notNullable();
      table.integer('late_penalty').unsigned();
      table.timestamps(true, true);
    })
    .createTableIfNotExists('submission_users', function (table) {
      table.increments('id').primary();
      table.integer('submission_id').unsigned().notNullable().references('submissions.id');
      table.string('username').notNullable();
      table.timestamps(true, true);
    });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('submission_users')
    .dropTableIfExists('submissions')
    .dropTableIfExists('submission_step_files')
    .dropTableIfExists('submission_steps')
    .dropTableIfExists('assignments')
    .dropTableIfExists('assignment_types')
    .dropTableIfExists('students')
    .dropTableIfExists('courses')
    .dropTableIfExists('departments')
    .dropTableIfExists('terms');
};
