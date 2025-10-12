CREATE TABLE requests (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    service_id INT REFERENCES services(id),
    status VARCHAR(20) DEFAULT 'Submitted',
    created_at TIMESTAMP DEFAULT NOW(),
    payment_done BOOLEAN DEFAULT FALSE
);
