// const knex = require('knex');
// const config = require('./knexfile.cjs');

// const db = knex(config.development);

// db.raw('SELECT 1')
//   .then(() => {
//     console.log('Database connected successfully!');
//     return db.destroy();
//   })
//   .catch(err => {
//     console.error('Database connection failed:', err);
//     return db.destroy();
//   });


// // test_db.js
// import knex from 'knex';
// import config from './knexfile.js';

// const db = knex(config.development);

// try {
//   // Test connection
//   await db.raw('SELECT 1');
//   console.log('Database connected successfully!');

//   // List all tables
//   const tables = await db('pg_tables')
//     .select('schemaname', 'tablename')
//     .where('schemaname', 'public');
//   console.log('Tables in egov_db:');
//   tables.forEach(t => console.log(t.tablename));

// } catch (err) {
//   console.error('Database connection failed:', err);
// } finally {
//   await db.destroy();
// }





// import knex from 'knex';
// import config from './knexfile.js'; // knexfile.js is also ESM

// // Connect to DB using "development" config
// const db = knex(config.development);

// async function main() {
//   try {
//     // 1. Test connection
//     await db.raw('SELECT 1+1 AS result');
//     console.log('Database connected successfully!');

//     // 2. List all tables
//     const tables = await db.raw(
//       "SELECT tablename FROM pg_tables WHERE schemaname='public';"
//     );
//     console.log('Tables in egov_db:');
//     tables.rows.forEach((t) => console.log(t.tablename));

//     // 3. Query data from "services" table
//     const services = await db('services').select('*');
//     console.log('\nAll services:');
//     console.log(services);

//   } catch (err) {
//     console.error('Error:', err);
//   } finally {
//     await db.destroy();
//   }
// }

// main();



import knex from 'knex';
import config from './knexfile.cjs'; // ESM config file

const db = knex(config.development);

async function main() {
  try {
    // 1️⃣ Test connection
    await db.raw('SELECT 1+1 AS result');
    console.log('✅ Database connected successfully!');

    // 2️⃣ List all tables
    const tables = await db.raw(
      "SELECT tablename FROM pg_tables WHERE schemaname='public';"
    );
    console.log('📋 Tables in egov_db:');
    tables.rows.forEach((t) => console.log('-', t.tablename));

    // 3️⃣ Query all services
    const services = await db('services').select('*');
    console.log('\n🧾 All services:');
    console.log(services);

    // 4️⃣ Insert a new service
    await db('services').insert({
      department_id: 1,
      name: "Driver’s License Renewal",
      description: "Renew driver’s license for citizens",
      fee: 75.00,
      created_at: new Date()
    });
    console.log("\n✅ New service inserted successfully!");

    // 5️⃣ Verify inserted service
    const insertedService = await db('services')
      .where({ name: "Driver’s License Renewal" })
      .first();
    console.log('Inserted service:', insertedService);

    // 6️⃣ Update the service
    await db('services')
      .where({ name: "Driver’s License Renewal" })
      .update({
        fee: 85.00,
        description: "Renew driver’s license (updated fee)"
      });
    console.log("\n✏️ Service updated successfully!");

    const updatedService = await db('services')
      .where({ name: "Driver’s License Renewal" })
      .first();
    console.log('Updated service details:', updatedService);

    // 7️⃣ Delete the service
    await db('services')
      .where({ name: "Driver’s License Renewal" })
      .del();
    console.log("\n🗑️ Service deleted successfully!");

    // 8️⃣ Verify deletion
    const remainingServices = await db('services').select('*');
    console.log('Remaining services:', remainingServices);

  } catch (err) {
    console.error('❌ Error:', err);
  } finally {
    await db.destroy();
    console.log('\n🔒 Database connection closed.');
  }
}

main();

