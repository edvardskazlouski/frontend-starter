ALTER TABLE activation_mails DROP CONSTRAINT activation_mails_fk;
ALTER TABLE activation_mails ADD CONSTRAINT activation_mails_email_key UNIQUE (email);
