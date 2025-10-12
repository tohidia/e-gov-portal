-- درخواست‌ها به کاربران (citizens) وصل هستند
ALTER TABLE requests
ADD CONSTRAINT fk_requests_user FOREIGN KEY (user_id) REFERENCES users(id);

-- درخواست‌ها به سرویس‌ها وصل هستند
ALTER TABLE requests
ADD CONSTRAINT fk_requests_service FOREIGN KEY (service_id) REFERENCES services(id);

-- اسناد به درخواست‌ها وصل هستند
ALTER TABLE documents
ADD CONSTRAINT fk_documents_request FOREIGN KEY (request_id) REFERENCES requests(id);

-- پرداخت‌ها به درخواست‌ها وصل هستند
ALTER TABLE payments
ADD CONSTRAINT fk_payments_request FOREIGN KEY (request_id) REFERENCES requests(id);

-- نوتیفیکیشن‌ها به کاربران وصل هستند
ALTER TABLE notifications
ADD CONSTRAINT fk_notifications_user FOREIGN KEY (user_id) REFERENCES users(id);
