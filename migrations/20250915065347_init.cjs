
exports.up = function(knex) {
  
};

exports.down = function(knex) {
  
};


// migrations/20250915065347_init.cjs
// یک migration نمونه که یک جدول ساده users می‌سازد.
// از فرم CommonJS استفاده شده (exports.up / exports.down)
// این توابع یا باید پرومیس برگردونن یا async باشند.

exports.up = async function(knex) {
  // اگر قبلاً جدول وجود داره حذف نکن — این فقط ایجاد می‌کنه اگر نباشه
  const has = await knex.schema.hasTable('users');
  if (!has) {
    return knex.schema.createTable('users', function(table) {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('email').notNullable().unique();
      table.string('password').notNullable();
      table.timestamps(true, true);
    });
  }
  // اگر جدول هست، چیزی برنمی‌گردونیم (می‌تونی return Promise.resolve(); بذاری)
  return Promise.resolve();
};

exports.down = async function(knex) {
  // برای برگشت (undo) مهاجرت، جدول users را حذف می‌کنیم
  const has = await knex.schema.hasTable('users');
  if (has) {
    return knex.schema.dropTable('users');
  }
  return Promise.resolve();
};
