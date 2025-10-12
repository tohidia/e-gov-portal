CREATE TABLE services (
    id SERIAL PRIMARY KEY,
    department_id INT REFERENCES departments(id),
    name VARCHAR(100) NOT NULL,
    fee NUMERIC(10,2) DEFAULT 0
);
