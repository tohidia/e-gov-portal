-- migrations/002_seed_initial_data.sql
BEGIN;

INSERT INTO departments (name, description) 
  VALUES 
    ('Interior', 'Interior / Passport & ID services'),
    ('Commerce', 'Business and commerce services'),
    ('Land', 'Land registration and property');

INSERT INTO services (department_id, name, description, fee)
  SELECT d.id, s.name, s.description, s.fee
  FROM (VALUES
    ('Passport Renewal', 'Renew passport for citizens', 50.00),
    ('National ID Update', 'Update national ID info', 0.00),
    ('Business License', 'Register or renew business license', 100.00),
    ('Land Registration', 'Register property or land', 200.00)
  ) AS s(name, description, fee)
  JOIN departments d ON d.name = CASE
    WHEN s.name = 'Passport Renewal' OR s.name = 'National ID Update' THEN 'Interior'
    WHEN s.name = 'Business License' THEN 'Commerce'
    WHEN s.name = 'Land Registration' THEN 'Land'
    ELSE 'Interior'
  END;

COMMIT;
