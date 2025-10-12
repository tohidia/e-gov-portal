
// exports.up = function(knex) {
  
// };

// exports.down = function(knex) {
  
// };

// exports.up = async function (knex) {
//   await knex.schema.createTable("users", (t) => {
//     t.increments("id").primary();
//     t.string("name").notNullable();
//     t.string("email").unique().notNullable();
//     t.string("password_hash").notNullable();
//     t.string("role").defaultTo("citizen"); // citizen/officer/admin
//     t.string("national_id");
//     t.date("dob");
//     t.timestamps(true, true);
//   });

//   await knex.schema.createTable("services", (t) => {
//     t.increments("id").primary();
//     t.string("name").notNullable();
//     t.string("department").notNullable();
//     t.integer("fee").defaultTo(0);
//     t.timestamps(true, true);
//   });

//   await knex.schema.createTable("requests", (t) => {
//     t.increments("id").primary();
//     t.integer("user_id").references("id").inTable("users");
//     t.integer("service_id").references("id").inTable("services");
//     t.string("status").defaultTo("submitted"); // submitted / under_review / approved / rejected
//     t.timestamps(true, true);
//   });
// };

// exports.down = async function (knex) {
//   await knex.schema.dropTableIfExists("requests");
//   await knex.schema.dropTableIfExists("services");
//   await knex.schema.dropTableIfExists("users");
// };


/**
 * @param {import('knex').Knex} knex
 */
exports.up = async function(knex) {
  // جدول departments
  await knex.schema.createTable('departments', table => {
    table.increments('id').primary();
    table.string('name', 150).notNullable();
    table.text('description');
    table.timestamps(true, true); // created_at و updated_at
  });

  // جدول services
  await knex.schema.createTable('services', table => {
    table.increments('id').primary();
    table.integer('department_id').unsigned().notNullable()
      .references('id').inTable('departments').onDelete('CASCADE');
    table.string('name', 150).notNullable();
    table.text('description');
    table.decimal('fee', 10, 2).defaultTo(0);
    table.timestamps(true, true);
  });
};

/**
 * @param {import('knex').Knex} knex
 */
exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('services');
  await knex.schema.dropTableIfExists('departments');
};
