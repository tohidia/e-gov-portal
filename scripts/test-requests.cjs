// require('dotenv').config();
// const Requests = require('../db/models/requests.cjs');

// async function run() {
//   try {
//     console.log('📨 Creating new request...');

//     const newRequest = await Requests.createRequest({
//       citizen_id: 2,        // Faiza Ahmad’s ID
//       service_id: 1,        // Passport Renewal service
//       note: 'Updating my National ID address',
//     });

//     console.log('✅ Request created:', newRequest);

//     console.log('\n📋 All requests for Faiza Ahmad:');
//     const myRequests = await Requests.findAllByCitizen(2);
//     console.table(myRequests);

//     console.log('\n📋 All requests (admin view):');
//     const allRequests = await Requests.findAll();
//     console.table(allRequests);

//   } catch (err) {
//     console.error('❌ Error:', err.message);
//   } finally {
//     process.exit(0);
//   }
// }

// run();


// scripts/test-requests.cjs
require('dotenv').config();
const Requests = require('../db/models/requests.js');

async function run() {
  try {
    console.log('📨 Creating new request...');

    const newRequest = await Requests.createRequest({
      citizen_id: 2,        // Faiza Ahmad
      service_id: 7,        // Passport Renewal
      note: 'Updating my National ID address',
    });

    console.log('✅ Request created:', newRequest);

    console.log('\n📋 All requests for Faiza Ahmad:');
    const myRequests = await Requests.findAllByCitizen(2);
    console.table(myRequests);

    console.log('\n📋 All requests (admin view):');
    const allRequests = await Requests.findAll();
    console.table(allRequests);

  } catch (err) {
    console.error('❌ Error:', err.message);
  } finally {
    process.exit(0);
  }
}

run();

