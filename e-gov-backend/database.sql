-- ===================================
-- 🌐 E-GOV PORTAL DATABASE STRUCTURE
-- ===================================

-- Drop old tables if exist (⚠ optional, only for resetting)
DROP TABLE IF EXISTS requests, services, departments, users CASCADE;

-- ===================
-- USERS TABLE
-- ===================
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role VARCHAR(20) DEFAULT 'citizen',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ===================
-- DEPARTMENTS TABLE
-- ===================
CREATE TABLE departments (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

-- ===================
-- SERVICES TABLE
-- ===================
CREATE TABLE services (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  department_id INT REFERENCES departments(id) ON DELETE CASCADE
);

-- ===================
-- REQUESTS TABLE
-- ===================
CREATE TABLE requests (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  service_id INT REFERENCES services(id) ON DELETE SET NULL,
  documents TEXT,
  fee NUMERIC(10,2),
  status VARCHAR(30) DEFAULT 'Submitted',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ===================
-- SAMPLE DATA (Optional)
-- ===================
INSERT INTO departments (name) VALUES
('Interior'), ('Health'), ('Education');

INSERT INTO services (name, department_id) VALUES
('Passport Renewal', 1),
('Birth Certificate', 2),
('University Diploma', 3);

-- ✅ Example user (password = "12345")
INSERT INTO users (name, email, password, role) VALUES
('John Doe', 'john@example.com', '$2a$10$8oIx6u1awGvqsHoTbnK3auLqOAkQosbnYo/EKh.N3AoxnBpvEqlw6', 'citizen'),
('Admin User', 'admin@example.com', '$2a$10$8oIx6u1awGvqsHoTbnK3auLqOAkQosbnYo/EKh.N3AoxnBpvEqlw6', 'admin');
