-- -- migrations/001_create_schema.sql
-- BEGIN;

-- -- users (اگر از قبل دارید، این دستور ایمن است چون IF NOT EXISTS)
-- CREATE TABLE IF NOT EXISTS users (
--   id SERIAL PRIMARY KEY,
--   name TEXT NOT NULL,
--   email TEXT UNIQUE,
--   national_id VARCHAR(50),
--   dob DATE,
--   phone VARCHAR(30),
--   password_hash TEXT,
--   role VARCHAR(20) NOT NULL DEFAULT 'citizen', -- citizen | officer | dept_head | admin
--   department_id INTEGER, -- برای کارمندان
--   created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
--   updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
-- );

-- -- departments
-- CREATE TABLE IF NOT EXISTS departments (
--   id SERIAL PRIMARY KEY,
--   name TEXT NOT NULL UNIQUE,
--   description TEXT,
--   created_at TIMESTAMPTZ NOT NULL DEFAULT now()
-- );

-- -- services
-- CREATE TABLE IF NOT EXISTS services (
--   id SERIAL PRIMARY KEY,
--   department_id INTEGER NOT NULL REFERENCES departments(id) ON DELETE CASCADE,
--   name TEXT NOT NULL,
--   description TEXT,
--   fee NUMERIC(10,2) NOT NULL DEFAULT 0,
--   created_at TIMESTAMPTZ NOT NULL DEFAULT now()
-- );

-- -- requests (applications)
-- CREATE TABLE IF NOT EXISTS requests (
--   id SERIAL PRIMARY KEY,
--   citizen_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
--   service_id INTEGER NOT NULL REFERENCES services(id) ON DELETE SET NULL,
--   status VARCHAR(30) NOT NULL DEFAULT 'Submitted', -- Submitted, UnderReview, Approved, Rejected
--   note TEXT,
--   created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
--   updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
-- );

-- -- documents uploaded for requests
-- CREATE TABLE IF NOT EXISTS documents (
--   id SERIAL PRIMARY KEY,
--   request_id INTEGER NOT NULL REFERENCES requests(id) ON DELETE CASCADE,
--   filename TEXT NOT NULL,
--   filepath TEXT NOT NULL,
--   mimetype TEXT,
--   uploaded_at TIMESTAMPTZ NOT NULL DEFAULT now()
-- );

-- -- payments (simulated)
-- CREATE TABLE IF NOT EXISTS payments (
--   id SERIAL PRIMARY KEY,
--   request_id INTEGER NOT NULL REFERENCES requests(id) ON DELETE CASCADE,
--   amount NUMERIC(10,2) NOT NULL DEFAULT 0,
--   status VARCHAR(20) NOT NULL DEFAULT 'pending', -- pending, successful, failed
--   transaction_id TEXT,
--   paid_at TIMESTAMPTZ
-- );

-- -- notifications (in-app)
-- CREATE TABLE IF NOT EXISTS notifications (
--   id SERIAL PRIMARY KEY,
--   user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
--   message TEXT NOT NULL,
--   meta JSONB,
--   is_read BOOLEAN NOT NULL DEFAULT false,
--   created_at TIMESTAMPTZ NOT NULL DEFAULT now()
-- );

-- -- useful indexes
-- CREATE INDEX IF NOT EXISTS idx_requests_status ON requests(status);
-- CREATE INDEX IF NOT EXISTS idx_requests_created_at ON requests(created_at);
-- CREATE INDEX IF NOT EXISTS idx_documents_request_id ON documents(request_id);

-- COMMIT;



CREATE TABLE departments (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  code VARCHAR(20) UNIQUE NOT NULL,
  description TEXT
);

CREATE TABLE services (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  department_id INTEGER REFERENCES departments(id) ON DELETE CASCADE,
  description TEXT,
  fee_amount DECIMAL(10,2)
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL,
  national_id VARCHAR(20),
  dob DATE,
  phone VARCHAR(20)
);
