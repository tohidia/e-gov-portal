CREATE TABLE requests (
  id SERIAL PRIMARY KEY,
  citizen_id INT REFERENCES users(id) ON DELETE CASCADE,
  service_id INT REFERENCES services(id) ON DELETE CASCADE,
  status VARCHAR(20) DEFAULT 'submitted',
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);
