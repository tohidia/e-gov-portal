// /**
//  * @param { import("knex").Knex } knex
//  * @returns { Promise<void> }
//  */
// exports.up = function(knex) {
  
// };

// /**
//  * @param { import("knex").Knex } knex
//  * @returns { Promise<void> }
//  */
// exports.down = function(knex) {
  
// };

exports.up = async function (knex) {
  await knex.schema.createTable("users", (t) => {
    t.increments("id").primary();
    t.string("name").notNullable();
    t.string("email").unique().notNullable();
    t.string("password_hash").notNullable();
    t.string("role").defaultTo("citizen"); // citizen/officer/admin
    t.string("national_id");
    t.date("dob");
    t.timestamps(true, true);
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("users");
};

