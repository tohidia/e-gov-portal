// import bcrypt from 'bcryptjs';

// export async function seed(knex) {
//   await knex('services').del();
//   await knex('departments').del();
//   await knex('users').del();

//   const [deptId] = await knex('departments')
//     .insert({
//       name: 'Interior',
//       description: 'Interior department (example)',
//     })
//     .returning('id');

//   await knex('services').insert({
//     department_id: deptId.id || deptId,
//     name: 'Passport Renewal',
//     description: 'Renew or apply for passport',
//     fee: 25.0,
//   });

//   const passwordHash = bcrypt.hashSync('adminpass', 10);
//   await knex('users').insert({
//     username: 'admin',
//     password: passwordHash,
//     role: 'admin',
//   });
// }


// src/db/seeds/01_initial_data.cjs
// src/db/seeds/01_initial_data.cjs
module.exports = {
  seed: async function (knex) {
    await knex('users').del(); // clear table

    await knex('users').insert([
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password_hash: 'hashed_password_here', // use proper hashed password
        role: 'admin',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'John Doe',
        email: 'john@example.com',
        password_hash: 'hashed_password_here',
        role: 'citizen',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  }
};
