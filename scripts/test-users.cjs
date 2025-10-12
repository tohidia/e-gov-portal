
require('dotenv').config();
const Users = require('../db/models/users.js');

async function run() {
  try {
    console.log('👤 Creating new user...');

    const newUser = await Users.create({
      name: 'Faiza Ahmad',
      email: 'faiza@example.com',
      password: 'password123',
      national_id: 'AF123456789',
      dob: '2000-05-15',
      role: 'citizen',
    });

    console.log('✅ User created:', newUser);

    console.log('\n📋 All users:');
    const allUsers = await Users.findAll();
    console.table(allUsers);
  } catch (err) {
    console.error('❌ Error:', err.message);
  } finally {
    process.exit(0);
  }
}

run();
