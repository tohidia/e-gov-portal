// knexfile.cjs
// require('dotenv').config();

// module.exports = {
//   development: {
//     client: 'pg',
//     connection: {
//       host: process.env.DB_HOST || '127.0.0.1',
//       port: process.env.DB_PORT || 5432,
//       user: process.env.DB_USER || 'postgres',
//       password: process.env.DB_PASSWORD || 'TestPass123',
//       database: process.env.DB_NAME || 'egov_portal'
//     },
//     migrations: {
//       directory: './src/migrations'
//     },
//     seeds: {
//       directory: './src/seeds'
//     }
//   }
// };

// // knexfile.cjs
// const path = require('path');

// module.exports = {
//   development: {
//     client: 'pg',
//     connection: {
//       host: '127.0.0.1',
//       port: process.env.DB_PORT || 5433,
//       user: 'egov_user',
//       password: process.env.DB_PASSWORD || 'TestPass123',
//       database: 'egov_db'
//     },
//     migrations: {
//       directory: path.join(__dirname, 'migrations')
//     },
//     seeds: {
//       directory: path.join(__dirname, 'seeds')
//     }
//   }
// };

// require('dotenv').config();
// const path = require('path');

// module.exports = {
//   development: {
//     client: 'pg',
//     connection: {
//       user: process.env.DB_USER || 'egov_user',
//       password: process.env.DB_PASSWORD || 'TestPass123',
//       database: process.env.DB_NAME || 'egov_portal'
//       // host و port حذف شدند → Unix socket محلی
//     },
//     migrations: {
//       directory: path.join(__dirname, 'migrations')
//     },
//     seeds: {
//       directory: path.join(__dirname, 'seeds')
//     }
//   }
// };

// require('dotenv').config();
// const path = require('path');

// module.exports = {
//   development: {
//     client: 'pg',
//     connection: {
//       // استفاده از Unix socket محلی برای egov_user
//       user: process.env.DB_USER || 'egov_user',
//       password: process.env.DB_PASSWORD || 'TestPass123',
//       database: process.env.DB_NAME || 'egov_portal',
//       host: '/var/run/postgresql', // مسیر socket
//       port: 5433
//     },
//     migrations: {
//       directory: path.join(__dirname, 'migrations')
//     },
//     seeds: {
//       directory: path.join(__dirname, 'seeds')
//     }
//   }
// };
// import bcrypt from 'bcryptjs';
// const bcrypt = require('bcryptjs');

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
//     password: passwordHash, // 👈 مطابق migration
//     role: 'admin',
//   });
// }



// src/db/knexfile.cjs
require('dotenv').config({ path: '../../.env' });

const bcrypt = require('bcryptjs');

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST || '127.0.0.1',
      user: process.env.DB_USER || 'faiza',
      password: process.env.DB_PASSWORD || 'test123',
      database: process.env.DB_NAME || 'egov_db',
      port: process.env.DB_PORT || 5433,
    },
    migrations: {
      directory: './migrations',
    },
    seeds: {
      directory: './seeds',
    },
  },
};
