// src/db/migrations/20250911124535_create_users_table.cjs
module.exports = {
  up: async function(knex) {
    const exists = await knex.schema.hasTable('users');
    if (!exists) {
      await knex.schema.createTable('users', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable().unique();
        table.string('password_hash').notNullable();
        table.string('role').defaultTo('citizen');
        table.string('national_id');
        table.date('dob');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        table.integer('department_id')
          .references('id')
          .inTable('departments')
          .onDelete('SET NULL');
      });
    }
  },

  down: async function(knex) {
    await knex.schema.dropTableIfExists('users');
  }
};
