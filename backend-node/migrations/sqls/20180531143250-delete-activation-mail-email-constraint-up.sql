ALTER TABLE activation_mails DROP CONSTRAINT activation_mails_email_key;
ALTER TABLE activation_mails ADD CONSTRAINT activation_mails_fk FOREIGN KEY (email) REFERENCES users (email);
