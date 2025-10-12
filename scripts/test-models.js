// // scripts/test-models.js
// const db = require('../db/connection.cjs');
// const Users = require('../db/models/users');
// const Departments = require('../db/models/departments');
// const Services = require('../db/models/services');

// async function run() {
//   try {
//     console.log('creating department...');
//     const dept = await Departments.createDepartment({ name: 'Interior', code: 'INT', description: 'Interior Dept' });
//     console.log('dept ->', dept);

//     console.log('creating service...');
//     const srv = await Services.createService({ name: 'Passport Renewal', department_id: dept.id, description: 'Renew passport', fee_amount: 10 });
//     console.log('service ->', srv);

//     console.log('creating user...');
//     const user = await Users.createUser({ name: 'Test User', email: 'test@example.com', password: 'secret123', national_id: '123456789', dob: '1990-01-01', phone: '0777000000' });
//     console.log('user ->', user);
//   } catch (err) {
//     console.error(err);
//   } finally {
//     process.exit(0);
//   }
// }

// run();
