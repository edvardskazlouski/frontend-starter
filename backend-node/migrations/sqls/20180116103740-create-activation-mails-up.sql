CREATE TYPE activation_mail_status AS ENUM ('PENDING', 'USED', 'EXPIRED', 'UNUSED');

CREATE TABLE IF NOT EXISTS activation_mails (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    creation_date TIMESTAMP DEFAULT NOW(),
    status activation_mail_status NOT NULL DEFAULT 'PENDING'
);
