-- CREATE TABLE departments (
--     id SERIAL PRIMARY KEY,
--     name VARCHAR(100) NOT NULL
-- );

-- //

-- ALTER TABLE departments
-- ADD COLUMN code VARCHAR(50),
-- ADD COLUMN description TEXT,
-- ADD COLUMN created_at TIMESTAMP DEFAULT NOW();


CREATE TABLE IF NOT EXISTS departments (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  code VARCHAR(50),
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
