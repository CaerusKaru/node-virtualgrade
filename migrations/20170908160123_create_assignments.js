
exports.up = function(knex, Promise) {
    return knex.schema
        .createTable('assignments', function (table) {
            table.increments('id').primary();
            table.string('name').notNullable();
            table.string('description', 128);
            table.timestamps();
        })
        .createTable('submission_steps', function (table) {
            table.increments('id').primary();
            table.string('name').notNullable();
            table.integer('assignment_id').unsigned().notNullable().references('assignments.id');
            table.timestamp('start_date').notNullable();
            table.timestamp('end_date').notNullable();
        });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('assignments').dropTableIfExists('submission_steps');
};
