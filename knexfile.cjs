// module.exports = {
//   development: {
//     client: 'pg', // یا 'mysql2' اگر MySQL دارید
//     connection: {
//       host: '127.0.0.1',
//       user: 'your_db_user',
//       password: 'your_db_password',
//       database: 'your_db_name'
//     },
//     migrations: {
//       directory: './migrations'
//     }
//   }
// };



// module.exports = {
//   development: {
//     client: 'pg', // یا 'mysql2' اگر MySQL دارید

//     connection: {
//       host: '127.0.0.1',
//       user: 'real_db_user',       // ← نام کاربری واقعی
//       password: 'real_db_password', // ← رمز عبور واقعی
//       database: 'real_db_name'      // ← نام پایگاه داده واقعی
//     },
//     migrations: {
//       directory: './migrations'
//     }
//   }
// };



// module.exports = {
//   development: {
//     client: 'pg',
//     // connection: {
//     //   host: '127.0.0.1',
//     //   user: 'egov_user',        // ← نام کاربری که ساختید
//     //   password: 'egov_password',// ← رمز عبور
//     //   database: 'egov_db'       // ← نام پایگاه داده
//     // },
//     connection: {
//   host: '127.0.0.1',
//   port: 5433,
//   user: 'egov_user',
//   password: 'TestPass123',
//   database: 'egov_db'
// },

//     migrations: {
//       directory: './migrations'
//     }
//   }
// };

// export DB_PASSWORD='TestPass123'
// export DB_PORT=5433

// module.exports = {
//   development: {
//     client: 'pg',
//     connection: {
//       host: '127.0.0.1',
//       port: 5433,
//       user: 'egov_user',
//       password: 'TestPass123',   // فقط برای تست — بعداً امنش کن
//       database: 'egov_db'
//     },
//     migrations: {
//       directory: './migrations'
//     }
//   }
// };


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
//       directory: './migrations'
//     }
//   }
// };





// // knexfile.js
// export default {
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
//       directory: './migrations'
//     }
//   }
// };

// src/db/knexfile.cjs
// module.exports = {
//   development: {
//     client: 'pg',  // PostgreSQL
//     connection: {
//       host: process.env.DB_HOST || '127.0.0.1',
//       port: process.env.DB_PORT || 5433,
//       user: process.env.DB_USER || 'egov_user',
//       password: process.env.DB_PASSWORD || 'TestPass123',
//       database: process.env.DB_NAME || 'egov_db'
//     },
//     migrations: {
//       directory: './migrations'
//     },
//     seeds: {
//       directory: './seeds'
//     }
//   }
// };


