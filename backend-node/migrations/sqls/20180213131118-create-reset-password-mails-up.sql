CREATE TYPE reset_password_mail_status AS ENUM ('PENDING', 'USED', 'EXPIRED', 'UNUSED');

CREATE TABLE IF NOT EXISTS reset_password_mails (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) NOT NULL,
    creation_date TIMESTAMP DEFAULT NOW(),
    status reset_password_mail_status NOT NULL DEFAULT 'PENDING'
);
