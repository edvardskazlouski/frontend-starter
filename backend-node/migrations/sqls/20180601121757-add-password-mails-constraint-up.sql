ALTER TABLE reset_password_mails ADD CONSTRAINT password_mails_fk FOREIGN KEY (email) REFERENCES users (email);
