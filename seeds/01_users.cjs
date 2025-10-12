/**
 * seeds/01_users.cjs
 * یک seed ساده برای جدول users
 */
exports.seed = async function(knex) {
  // پاک کردن داده‌های قبلی (اختیاری)
  await knex('users').del();

  // درج یک کاربر تستی (password_hash را با یک هش واقعی جایگزین کن)
  await knex('users').insert([
    {
      name: 'Faeze',
      email: 'faeze@example.com',
      password_hash: '$2a$10$examplehashedpasswordplaceholder', // جایگزین کنید
      role: 'citizen',
      national_id: '1234567890',
      dob: '2000-01-01'
    }
  ]);
};
